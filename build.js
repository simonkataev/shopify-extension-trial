const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Define the output directories
const distDir = path.join(__dirname, "dist");
const shopifyAssetsDir = path.join(__dirname, "..", "shopify-theme", "assets");

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Check if the shopify-theme/assets directory exists
if (!fs.existsSync(shopifyAssetsDir)) {
  console.error("Error: shopify-theme/assets directory not found!");
  process.exit(1);
}

// Run webpack build
console.log("Building React app...");
try {
  execSync("npx webpack --mode production", { stdio: "inherit" });
  console.log("React app built successfully!");
} catch (error) {
  console.error("Error building React app:", error);
  process.exit(1);
}

// Copy and process the shopify-inject.js file
console.log("Processing injection script...");
try {
  const injectScriptPath = path.join(__dirname, "src", "shopify-inject.js");
  const injectScriptDest = path.join(distDir, "shopify-inject.js");

  let injectScript = fs.readFileSync(injectScriptPath, "utf8");

  // Update the URLs to point to the correct location
  // In a real scenario, you would replace these with your actual CDN URLs
  injectScript = injectScript.replace(
    "https://cdn.example.com/shopify-extension/bundle.js",
    "./bundle.js"
  );

  injectScript = injectScript.replace(
    "https://cdn.example.com/shopify-extension/styles.css",
    "./styles.css"
  );

  fs.writeFileSync(injectScriptDest, injectScript);
  console.log("Injection script processed successfully!");
} catch (error) {
  console.error("Error processing injection script:", error);
  process.exit(1);
}

// Extract CSS from the bundle and save it as a separate file
console.log("Extracting CSS...");
try {
  const bundlePath = path.join(distDir, "bundle.js");
  const cssPath = path.join(distDir, "styles.css");

  // This is a simplified approach - in a real scenario, you would use a proper CSS extraction plugin
  const bundle = fs.readFileSync(bundlePath, "utf8");
  const cssRegex = /\/\*\s*CSS\s*\*\/\s*"([^"]+)"/g;
  const cssMatches = bundle.match(cssRegex);

  if (cssMatches && cssMatches.length > 0) {
    const css = cssMatches
      .map((match) => {
        const cssContent = match.match(/\/\*\s*CSS\s*\*\/\s*"([^"]+)"/)[1];
        return cssContent.replace(/\\n/g, "\n").replace(/\\"/g, '"');
      })
      .join("\n");

    fs.writeFileSync(cssPath, css);
    console.log("CSS extracted successfully!");
  } else {
    console.log("No CSS found to extract.");
  }
} catch (error) {
  console.error("Error extracting CSS:", error);
  // Don't exit on CSS extraction failure
}

// Copy files to Shopify theme assets directory
console.log("Copying files to Shopify theme assets directory...");
try {
  // Copy bundle.js
  const bundlePath = path.join(distDir, "bundle.js");
  const bundleDest = path.join(shopifyAssetsDir, "shopify-extension-bundle.js");
  fs.copyFileSync(bundlePath, bundleDest);
  console.log(
    "- bundle.js copied to shopify-theme/assets/shopify-extension-bundle.js"
  );

  // Copy styles.css if it exists
  const cssPath = path.join(distDir, "styles.css");
  if (fs.existsSync(cssPath)) {
    const cssDest = path.join(shopifyAssetsDir, "shopify-extension-styles.css");
    fs.copyFileSync(cssPath, cssDest);
    console.log(
      "- styles.css copied to shopify-theme/assets/shopify-extension-styles.css"
    );
  }

  // Create and save the injection script directly to Shopify assets
  const injectScriptPath = path.join(__dirname, "src", "shopify-inject.js");
  const injectScriptDest = path.join(
    shopifyAssetsDir,
    "shopify-extension-inject.js"
  );

  let injectScript = fs.readFileSync(injectScriptPath, "utf8");

  // Update the URLs to use the current script's path for asset URLs
  injectScript = injectScript.replace(
    /script\.src\s*=\s*['"]https:\/\/cdn\.example\.com\/shopify-extension\/bundle\.js['"];/,
    `script.src = basePath + 'shopify-extension-bundle.js?v=' + Date.now();`
  );
  
  injectScript = injectScript.replace(
    /link\.href\s*=\s*['"]https:\/\/cdn\.example\.com\/shopify-extension\/styles\.css['"];/,
    `link.href = basePath + 'shopify-extension-styles.css?v=' + Date.now();`
  );

  fs.writeFileSync(injectScriptDest, injectScript);
  console.log(
    "- shopify-inject.js processed and saved to shopify-theme/assets/shopify-extension-inject.js"
  );

  console.log("All files copied successfully!");
} catch (error) {
  console.error("Error copying files to Shopify theme assets:", error);
  process.exit(1);
}

// Check if theme.liquid exists and update it
console.log("Checking theme.liquid file...");
const themeLiquidPath = path.join(
  __dirname,
  "..",
  "shopify-theme",
  "layout",
  "theme.liquid"
);

if (fs.existsSync(themeLiquidPath)) {
  try {
    let themeLiquid = fs.readFileSync(themeLiquidPath, "utf8");

    // Check if our script is already included
    if (!themeLiquid.includes("shopify-extension-inject.js")) {
      // Find the closing body tag
      const bodyCloseIndex = themeLiquid.lastIndexOf("</body>");

      if (bodyCloseIndex !== -1) {
        // Insert our script tag before the closing body tag
        const scriptTag =
          "\n  {{ 'shopify-extension-inject.js' | asset_url | script_tag }}\n";
        themeLiquid =
          themeLiquid.slice(0, bodyCloseIndex) +
          scriptTag +
          themeLiquid.slice(bodyCloseIndex);

        // Write the updated theme.liquid file
        fs.writeFileSync(themeLiquidPath, themeLiquid);
        console.log("theme.liquid updated to include the extension script!");
      } else {
        console.warn("Warning: Could not find </body> tag in theme.liquid");
        console.log(
          "Please manually add the following line before the closing body tag:"
        );
        console.log(
          "{{ 'shopify-extension-inject.js' | asset_url | script_tag }}"
        );
      }
    } else {
      console.log("Extension script is already included in theme.liquid");
    }
  } catch (error) {
    console.error("Error updating theme.liquid:", error);
    console.log(
      "Please manually add the following line before the closing body tag:"
    );
    console.log("{{ 'shopify-extension-inject.js' | asset_url | script_tag }}");
  }
} else {
  console.warn("Warning: theme.liquid not found at expected location");
  console.log(
    "Please manually add the following line before the closing body tag in your theme.liquid file:"
  );
  console.log("{{ 'shopify-extension-inject.js' | asset_url | script_tag }}");
}

console.log("\nBuild and deployment completed successfully!");
console.log("\nTo deploy to your Shopify store:");
console.log("1. Commit and push the changes to your theme repository");
console.log(
  "2. Deploy the theme to your Shopify store using the Shopify CLI or the Shopify admin panel"
);
