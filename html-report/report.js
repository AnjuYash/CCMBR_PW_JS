const report = require("multiple-cucumber-html-reporter");
 
report.generate({
  jsonDir: "html-report",
  reportPath: "./html-report",
  screenshotsDirectory: './html-report',
  reportName:"POC for Playwright",
  pageTitle:"Test Report",
  displayDuration:true,
  metadata: {
    browser: {
      name: "chrome",
      version: "60",
    },
    device: "Local test machine",
    platform: {
      name: "Windows",
      version: "16.04",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Playwright project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" },
      {label: 'Test Execution Start Time', value: new Date().toLocaleString()}
    ],
  },
});