const { click, sendKeys } = require('../../utility/helper'); // Import helper functions

class ProductsPage {
    constructor(page) {
        this.page = page;
    }

    async sortByPriceLowToHigh() {
        await this.page.selectOption('.product_sort_container', 'lohi');
    }

    async sortByAlphabeticalOrder() {
        await this.page.selectOption('.product_sort_container', 'az');
    }

    async addToCart(productName) {
        try {
            if (this.page.isClosed()) {
                throw new Error("Page context is closed before adding items.");
            }

            const productLocator = this.convertProductNameToLocator(productName);
            await this.page.waitForSelector(productLocator, { timeout: 15000 }); // Extended timeout for reliability
            await click(this.page, productLocator); // Using helper function

            console.log(`Added item to cart: ${productName}`);
        } catch (error) {
            console.error(`Error adding item to cart: ${error.message}`);
        }
    }

    async getCartItems() {
        try {
            await this.page.waitForSelector('.cart_item', { timeout: 15000 }); // Extended timeout
            const cartItemElements = await this.page.$$('.cart_item');

            const cartItems = await Promise.all(
                cartItemElements.map(async (item) => await item.innerText())
            );

            console.log(`Cart Items: ${cartItems}`);
            return cartItems;
        } catch (error) {
            console.error(`Error retrieving cart items: ${error.message}`);
            return [];
        }
    }

    async getLeastExpensiveItemName() {
        await this.page.waitForSelector('.inventory_item_name', { timeout: 15000 }); 
        const leastExpensiveItem = await this.page.$('.inventory_item_name');
        return await leastExpensiveItem.innerText();
    }

    async getFirstAlphabeticalItemName() {
        await this.page.waitForSelector('.inventory_item_name', { timeout: 15000 });
        const firstAlphabeticalItem = await this.page.$('.inventory_item_name');
        return await firstAlphabeticalItem.innerText();
    }

    convertProductNameToLocator(productName) {
        return `[data-test=add-to-cart-${productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}]`;
    }
}

module.exports = ProductsPage;
