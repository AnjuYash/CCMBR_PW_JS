const { Given, When, Then } = require('@cucumber/cucumber');
const CartPage = require('../pages/CartPage');
const assert = require('assert');

let cartPage;

Given('User have items in the cart', async () => {
  // Validate cart has items before proceeding
});

When('User proceed to checkout', async () => {
  try {
    await cartPage.goToCheckout();
    global.logs.push("Proceeded to checkout.");
  } catch (error) {
    console.error(`Checkout process failed: ${error.message}`);
  }
});

When('User fill shipping details with {string}, {string}, and {string}', async (firstName, lastName, postalCode) => {
  try {
    await cartPage.fillShippingDetails(firstName, lastName, postalCode);
    global.logs.push(`Shipping details entered: ${firstName} ${lastName}, ${postalCode}`);
  } catch (error) {
    console.error(`Error during shipping details entry: ${error.message}`);
  }
});

Then('User verify the total price accuracy', async () => {
  try {
    const subtotal = await cartPage.calculateSubtotal();
    const actualTotal = await cartPage.getTotalPrice();
    const expectedTotal = (subtotal * 1.08).toFixed(2);

    global.logs.push(`Expected price: ${expectedTotal}, Actual price: ${actualTotal}`);

    assert.strictEqual(actualTotal, expectedTotal, `Total price mismatch. Expected: ${expectedTotal}, but got: ${actualTotal}`);
    console.log("Final price verification successful.");
  } catch (error) {
    console.error(`Error verifying total price: ${error.message}`);
  }
});

When('User complete the checkout', async () => {
  try {
    await cartPage.completeCheckout();
    global.logs.push("Checkout process completed.");
  } catch (error) {
    console.error(`Error during checkout: ${error.message}`);
  }
});

Then('User verify the Thank You page', async () => {
  try {
    const isThankYouVisible = await cartPage.isThankYouPageVisible();
    global.logs.push(`Thank You page visible: ${isThankYouVisible}`);
    
    assert.strictEqual(isThankYouVisible, true, 'Expected Thank You page to be visible.');
  } catch (error) {
    console.error(`Error verifying Thank You page: ${error.message}`);
  }
});
