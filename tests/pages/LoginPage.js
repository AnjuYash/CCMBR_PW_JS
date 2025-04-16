const { webURL } = require('../../utility/constants');
const { click, sendKeys } = require('../../utility/helper'); // Import helper functions

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(webURL);
    await this.page.waitForLoadState('networkidle'); // Ensure all requests complete
    console.log("Navigated to login page.");
  }

  async login(username, password) {
    try {
      await sendKeys(this.page, '#user-name', username);
      await sendKeys(this.page, '#password', password);
      await click(this.page, '#login-button');
      
      await this.page.waitForSelector('.inventory_container', { timeout: 15000 });
      console.log("Login successful.");
    } catch (error) {
      console.error(`Login failed: ${error.message}`);
    }
  }

  async isLoggedIn() {
    try {
      await this.page.waitForSelector('.inventory_container', { timeout: 15000 }); // Extended timeout
      const pageTitle = await this.page.title();
      const url = await this.page.url();
  
      const loggedIn = pageTitle.includes("Products") || url.includes("inventory.html");
      console.log(`Login status: ${loggedIn ? "Logged in" : "Not logged in"}`);
      return loggedIn;
    } catch (error) {
      console.error("Login verification failed:", error);
      return false;
    }
  }
}

module.exports = LoginPage;
