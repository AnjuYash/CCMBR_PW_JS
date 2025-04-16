Playwright with CucumberJS(JavaScript) E2E Test Framework

This repository contains automated tests for the SauceDemo e-commerce website using Playwright and Cucumber-JS. These tests cover various scenarios, including user login, product management, and checkout processes. 

## Project Structure
```bash
├── .github/                # GitHub workflows (CI/CD)
├── feature/                # Feature files in Gherkin format
│   ├── cart.feature
│   ├── login.feature
│   └── product.feature     
├── html-report/            # Generated HTML test reports
├── node_modules/           # Dependencies
├── screenshots/            # Captured screenshots (on failure and success)
├── tests/                  # Main test logic
│   ├── pages/              # Page Object Models
│   │   ├── CartPage.js
│   │   ├── LoginPage.js
│   │   └── ProductPage.js   
│   ├── steps/              # Step definitions for Cucumber
│   │   ├── cartSteps.js
│   │   ├── loginSteps.js
│   │   ├── productSteps.js  
│   │   └── hooks.js         # Lifecycle hooks (before/after)
│   └── utility/            # Utilities like helper functions
│       ├── constants.js
│       └── helper.js
├── .gitignore              # Ignored files and folders
├── cucumber.json           # Cucumber configuration
├── package-lock.json
├── package.json            # Project metadata and scripts
└── playwright.config.js    # Playwright configuration
```

## Getting Started

 To run the automated tests locally, follow these steps:

 Prerequisites
 Node.js >= 14.x
 npm >= 6.x
  
## Install project dependencies:
 npm install

## Run the tests:

 npm test/npm test run - To run all feature scenarios
   
 Running with Tags:
 npx cucumber-js --tags "@login"
 
 Generate HTML Report using:
 npm run generate-report


## Scenarios

 - Login and authentication tests

 - Product management and shopping cart tests

 - Checkout process tests

 - Cross-browser testing (Chromium, Firefox, WebKit)

 - Data-driven testing

## Technologies Used
Playwright ,
JavaScript,
Node.js ,
cucumber-js,
cucumber-html-reporter
 
## Writing Tests
 Feature Files: Located in the feature/ folder. Written in Gherkin syntax to define the test scenarios.
 Steps: Implemented in the tests/steps/ folder to link Gherkin steps with code.
 Page Objects: Reusable selectors and methods are defined in the tests/pages/ folder for modular test organization.
 
 
## Hooks
 Use hooks.js to define setup and teardown operations such as:
 - Launching the browser
 - Capturing screenshots on failure and passed
 - Closing the browser
 
## Utilities
 Common helper functions and constants are stored in the /utility/ directory. These are used across multiple test files for consistency and reusability.

## Supported Browsers
 - chromium
 - firefox
 - webkit

Specify the browser to use via the BROWSER environment variable:
 'BROWSER=firefox npx cucumber-js'

Troubleshooting
 ### Issue: Tests failing with browser launch error
 - Ensure the correct version of Playwright is installed: `npm install playwright`.
 - Check that the required browser binaries are installed: `npx playwright install`.

 ### Issue: No report generated
 - Ensure the `generate-report` script is configured in `package.json`.
 - Verify that the required reporting library is installed: `npm install cucumber-html-reporter`



### Customizing Configuration
 Edit the `cucumber.json` file to adjust format, paths, and tags.
 Example:
 ```json
{
  "default": {
    "format": ["progress-bar", "html:html-report/cucumber-report.html"],
    "paths": ["feature/*.feature"],
    "require": ["tests/steps/*.js", "hooks/*.js"],
    "tags": "@login"
  }
 }


 
