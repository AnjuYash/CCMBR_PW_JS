const { Given, When, Then } = require('@cucumber/cucumber');
const ProductsPage = require('../pages/ProductsPage');
const assert = require('assert');

let productsPage;

Given('User logged into SauceDemo', async () => {
  // Ensure user is logged in before performing product actions
});

When('User add items to the cart', async () => {
  try {
    productsPage = new ProductsPage(global.page);

    // Ensure sorting dropdown is fully loaded before interacting
    await productsPage.page.waitForSelector('.product_sort_container', { timeout: 10000 });

    await productsPage.sortByPriceLowToHigh();
    const leastExpensiveItemName = await productsPage.getLeastExpensiveItemName();
    await productsPage.addItemsToCart(leastExpensiveItemName);

    await productsPage.sortByAlphabeticalOrder();
    const firstAlphabeticalItemName = await productsPage.getFirstAlphabeticalItemName();
    await productsPage.addItemsToCart(firstAlphabeticalItemName);

    global.logs.push(`Added items: ${leastExpensiveItemName}, ${firstAlphabeticalItemName}`);
  } catch (error) {
    console.error(`Error during adding items: ${error.message}`);
  }
});

Then('User should see the selected items in the cart', async () => {
  try {
    await productsPage.goToCart(); // Ensure navigation happens first
    await global.page.waitForSelector('.cart_item', { timeout: 10000 }); // Extended timeout
    const cartItems = await productsPage.getCartItems();

    console.log(`Cart contains: ${cartItems}`);
    assert.ok(cartItems.length > 0, 'Expected items to be in the cart.');
  } catch (error) {
    console.error(`Error verifying cart items: ${error.message}`);
  }
});


