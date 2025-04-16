const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Global variables for browser lifecycle
let browser;
let context;
let page;

// Function to ensure that a directory exists
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Function to capture and save a screenshot
const captureScreenshot = async (page, stepOrScenarioName, status, screenshotsDir) => {
  const outcomeDir = path.resolve(
    screenshotsDir,
    status === 'failed' ? 'Failed' : 'Passed' // Separate folders for Passed and Failed
  );

  ensureDirectoryExists(outcomeDir); // Make sure the directory exists

  const sanitizedName = stepOrScenarioName.replace(/[^a-zA-Z0-9-_]/g, '_');
  const timestamp = new Date().toISOString().replace(/:/g, '-'); // Add timestamp for uniqueness
  const screenshotPath = path.resolve(outcomeDir, `${sanitizedName}_${status}_${timestamp}.png`);

  try {
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved at: ${screenshotPath}`);
  } catch (error) {
    console.error(`Failed to capture screenshot: ${error.message}`);
  }

  return screenshotPath;
};

// Function to launch the browser
const launchBrowser = async (headless = true, slowMo = 0, timeout = 15000) => {
  try {
    browser = await chromium.launch({ headless, slowMo }); // Launch browser with options
    context = await browser.newContext(); // Create a new browser context
    context.setDefaultTimeout(timeout); // Set default timeout for the context
    page = await context.newPage(); // Create a new page
    console.log(`Browser launched successfully`);
    return { browser, context, page }; // Return browser, context, and page for reuse
  } catch (error) {
    console.error(`Failed to launch browser: ${error.message}`);
    throw error;
  }
};

// Function to close the browser
const closeBrowser = async () => {
  try {
    if (page && !page.isClosed()) {
      await page.close();
      console.log(`Page closed.`);
    }
    if (context) {
      await context.close();
      console.log(`Context closed.`);
    }
    if (browser) {
      await browser.close();
      console.log(`Browser closed.`);
    }
  } catch (error) {
    console.error(`Failed to close browser: ${error.message}`);
    throw error;
  }
};

// Function for clicking an element
const click = async (page, selector) => {
  try {
    await page.waitForSelector(selector, { timeout: 10000 });
    await page.click(selector);
    console.log(`Clicked element: ${selector}`);
  } catch (error) {
    console.error(`Failed to click: ${selector}. Error: ${error.message}`);
  }
};

// Function for entering text into an input field
const sendKeys = async (page, selector, value) => {
  try {
    await page.waitForSelector(selector, { timeout: 10000 });
    await page.fill(selector, value);
    console.log(`Entered value in ${selector}: ${value}`);
  } catch (error) {
    console.error(`Failed to enter value: ${value} in ${selector}. Error: ${error.message}`);
  }
};

module.exports = {
  ensureDirectoryExists,
  captureScreenshot,
  launchBrowser,
  closeBrowser,
  click,       // Added click function
  sendKeys,    // Added sendKeys function
};
