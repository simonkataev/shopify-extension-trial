import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Function to initialize our React app
function initializeApp() {
  // Find the container element
  const container = document.getElementById("shopify-product-extension-root");

  console.log("react loaded", container);
  // Only render if the container exists
  if (container) {
    ReactDOM.render(<App />, container);
  }
}

// Check if the DOM is already loaded
if (document.readyState === "loading") {
  // If not loaded yet, wait for the DOMContentLoaded event
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  // If already loaded, initialize immediately
  initializeApp();
}
