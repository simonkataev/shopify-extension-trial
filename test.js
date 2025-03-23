const fs = require('fs');
const path = require('path');

// Define the paths to check
const shopifyAssetsDir = path.join(__dirname, '..', 'shopify-theme', 'assets');
const themeLiquidPath = path.join(__dirname, '..', 'shopify-theme', 'layout', 'theme.liquid');

// Define the files to check
const requiredFiles = [
  'shopify-extension-bundle.js',
  'shopify-extension-inject.js'
];

// Optional files
const optionalFiles = [
  'shopify-extension-styles.css'
];

console.log('Verifying Shopify extension installation...\n');

// Check if the shopify-theme/assets directory exists
if (!fs.existsSync(shopifyAssetsDir)) {
  console.error('❌ Error: shopify-theme/assets directory not found!');
  process.exit(1);
}

// Check if the required files exist
let allRequiredFilesExist = true;
console.log('Checking required files:');
requiredFiles.forEach(file => {
  const filePath = path.join(shopifyAssetsDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.error(`❌ ${file} is missing!`);
    allRequiredFilesExist = false;
  }
});

// Check if the optional files exist
console.log('\nChecking optional files:');
optionalFiles.forEach(file => {
  const filePath = path.join(shopifyAssetsDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`ℹ️ ${file} is missing, but it's optional`);
  }
});

// Check if theme.liquid includes the injection script
console.log('\nChecking theme.liquid:');
if (fs.existsSync(themeLiquidPath)) {
  const themeLiquid = fs.readFileSync(themeLiquidPath, 'utf8');
  if (themeLiquid.includes('shopify-extension-inject.js')) {
    console.log('✅ theme.liquid includes the extension script');
  } else {
    console.error('❌ theme.liquid does not include the extension script!');
    allRequiredFilesExist = false;
  }
} else {
  console.error('❌ theme.liquid not found!');
  allRequiredFilesExist = false;
}

// Print the final result
console.log('\nVerification result:');
if (allRequiredFilesExist) {
  console.log('✅ Shopify extension is correctly installed!');
  console.log('\nTo see the extension in action:');
  console.log('1. Deploy the theme to your Shopify store');
  console.log('2. Navigate to a product page');
  console.log('3. Scroll down to see the product features extension');
} else {
  console.error('❌ Shopify extension installation is incomplete!');
  console.log('\nTo fix the issues:');
  console.log('1. Run `npm run build:shopify` to rebuild and deploy the extension');
  console.log('2. If the issue persists, check the error messages above');
}
