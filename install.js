const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define the paths to check
const shopifyThemeDir = path.join(__dirname, '..', 'shopify-theme');

console.log('Starting Shopify extension installation...\n');

// Check if npm is installed
console.log('Checking if npm is installed...');
try {
  execSync('npm --version', { stdio: 'ignore' });
  console.log('✅ npm is installed');
} catch (error) {
  console.error('❌ npm is not installed! Please install Node.js and npm first.');
  process.exit(1);
}

// Check if the shopify-theme directory exists
console.log('\nChecking if shopify-theme directory exists...');
if (fs.existsSync(shopifyThemeDir)) {
  console.log('✅ shopify-theme directory exists');
} else {
  console.error('❌ shopify-theme directory not found!');
  console.error('Please make sure the shopify-theme directory exists at the same level as the shopify-extension directory.');
  process.exit(1);
}

// Install dependencies
console.log('\nInstalling dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies!');
  console.error(error.message);
  process.exit(1);
}

// Build and deploy the extension
console.log('\nBuilding and deploying the extension...');
try {
  execSync('npm run build:shopify', { stdio: 'inherit' });
  console.log('✅ Extension built and deployed successfully');
} catch (error) {
  console.error('❌ Failed to build and deploy the extension!');
  console.error(error.message);
  process.exit(1);
}

// Verify the installation
console.log('\nVerifying the installation...');
try {
  execSync('npm test', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Installation verification failed!');
  console.error(error.message);
  process.exit(1);
}

console.log('\n✅ Shopify extension installation completed successfully!');
console.log('\nNext steps:');
console.log('1. Deploy the theme to your Shopify store');
console.log('2. Navigate to a product page');
console.log('3. Scroll down to see the product features extension');
