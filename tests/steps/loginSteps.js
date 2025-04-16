const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/LoginPage');
const assert = require('assert');

let loginPage;

Given('User on the SauceDemo login page', async () => {
  loginPage = new LoginPage(global.page);
  await loginPage.navigateTo();
});

When('User log in with {string} and {string}', async (username, password) => {
  await loginPage.login(username, password);
  global.logs.push(`Logged in with username: ${username}`);
});

Then('User should be logged in successfully', async () => {
  const isLoggedIn = await loginPage.isLoggedIn();
  global.logs.push(`Login successful: ${isLoggedIn}`);
  
  assert.strictEqual(isLoggedIn, true, 'Expected login to be successful, but it failed.');
});
