const { Before, After, AfterStep, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { ensureDirectoryExists, captureScreenshot, closeBrowser } = require('../../utility/helper'); // Adjust the relative path to helper.js
const { chromium, firefox, webkit } = require('playwright'); // Import all Playwright browsers
const fs = require('fs');
const path = require('path');

// Global directories for logs and screenshots
const screenshotsDir = path.resolve(__dirname, '../../screenshots'); // Screenshots directory at project root
const logsDir = path.resolve(__dirname, '../../logs'); // Logs directory at project root

ensureDirectoryExists(screenshotsDir);
ensureDirectoryExists(logsDir);

let browser, context, page;

// Launch browser only ONCE before all scenarios
BeforeAll({ timeout: 20000},async () => {
  console.log(`🔄 Starting test suite...`);

  // Get the browser name from an environment variable (default is chromium)
  const browserName = process.env.BROWSER || 'chromium';

  // Switch statement for selecting browser
  switch (browserName.toLowerCase()) {
    case 'firefox':
      console.log(` Launching Firefox browser...`);
      browser = await firefox.launch({ headless: false, slowMo: 300 });
      break;
    case 'webkit':
      console.log(` Launching WebKit browser...`);
      browser = await webkit.launch({ headless: false, slowMo: 300 });
      break;
    case 'chromium':
    default:
      console.log(`Launching Chromium browser...`);
      browser = await chromium.launch({ headless: true, slowMo: 300 });
      break;
  }

  // Create context and page
  context = await browser.newContext();
  context.setDefaultTimeout(15000); // Set default timeout
  page = await context.newPage();

  // Set global variables
  global.page = page;
  global.context = context;
  global.browser = browser;
  global.logs = [];
  global.logs.push(` Test suite started with browser: ${browserName}`);
});

// Reset page before each test scenario
Before(async (scenario) => {
  console.log(`🔹 Starting scenario: ${scenario.pickle.name}`);
  global.logs.push(`🟢 Scenario started: ${scenario.pickle.name}`);
});

// Capture screenshots for every step
AfterStep(async function (step) {
  if (page && !page.isClosed()) {
    const stepName = step.pickleStep.text.replace(/[^a-zA-Z0-9-_]/g, '_');
    const screenshotPath = await captureScreenshot(page, stepName, 'step', screenshotsDir);

    // Attach the screenshot to the report
    try {
      const screenshotData = fs.readFileSync(screenshotPath);
      this.attach(screenshotData, 'image/png');
    } catch (error) {
      console.error(`Failed to attach step screenshot: ${error.message}`);
    }
  }
});

// Run cleanup after EACH scenario and capture final screenshots for scenario status
After(async (scenario) => {
  console.log(`Completing scenario: ${scenario.pickle.name}`);
  const sanitizedScenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9-_]/g, '_');

  const status = scenario.result.status || 'unknown'; // Scenario status: passed/failed
  console.log(`🔍 Scenario Status: ${status}`);

  if (page && !page.isClosed()) {
    const screenshotPath = await captureScreenshot(page, sanitizedScenarioName, status, screenshotsDir);

    if (status === 'failed') {
      // Save logs for failed scenarios
      try {
        const logPath = path.resolve(logsDir, `${sanitizedScenarioName}.log`);
        fs.writeFileSync(logPath, global.logs.join('\n'), 'utf-8');
        console.log(`Logs saved at: ${logPath}`);
      } catch (error) {
        console.error(`Failed to save logs: ${error.message}`);
      }

      global.logs.push(`Test failed: ${scenario.pickle.name}`);
      global.logs.push(`Screenshot saved at ${screenshotPath}`);
    } else if (status === 'passed') {
      global.logs.push(`Test passed: ${scenario.pickle.name}`);
      global.logs.push(`Screenshot saved at ${screenshotPath}`);
    }
  }
});

// Close browser ONLY after all scenarios are done
AfterAll(async () => {
  console.log(`Completing test suite...`);
  try {
    if (global.browser) await global.browser.close(); // Ensure the browser closes directly
    console.log(`Browser closed.`);
  } catch (error) {
    console.error(`Error closing browser: ${error.message}`);
  }
});


