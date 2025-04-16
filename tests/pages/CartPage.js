const { click, sendKeys } = require('../../utility/helper'); // Import helper functions

class CartPage {
    constructor(page) {
        this.page = page;
    }

    async goToCart() {
        await click(this.page, '.shopping_cart_link'); // Using helper function
    }

    async getAddedItemsDetails() {
        const addedItems = await this.page.$$eval('.cart_item', (items) => {
            return items.map((item) => {
                const name = item.querySelector('.inventory_item_name').innerText;
                const price = item.querySelector('.inventory_item_price').innerText;
                return { name, price };
            });
        });
        return addedItems;
    }

    async calculateSubtotal() {
        const itemPrices = await this.page.$$('.inventory_item_price');
        const prices = await Promise.all(
            itemPrices.map(async (element) => {
                const text = await element.textContent();
                return parseFloat(text.replace('$', ''));
            })
        );
        return prices.reduce((acc, price) => acc + price, 0);
    }

    async proceedToCheckout() {
        try {
            await this.page.waitForSelector('[data-test=checkout]', { timeout: 10000 }); // Extended timeout for stability
            await click(this.page, '[data-test=checkout]'); // Using helper function
            
            await this.page.waitForSelector('.checkout_summary_container', { timeout: 10000 });
            console.log("Checkout process proceeded successfully.");
        } catch (error) {
            console.error(`Error proceeding to checkout: ${error.message}`);
        }
    }

    async fillShippingDetails(firstName, lastName, postalCode) {
        try {
            await sendKeys(this.page, '#first-name', firstName); // Using helper function
            await sendKeys(this.page, '#last-name', lastName);
            await sendKeys(this.page, '#postal-code', postalCode);
            
            await click(this.page, '#continue'); // Using helper function

            await this.page.waitForSelector('.checkout_summary_container', { timeout: 10000 });
        } catch (error) {
            console.error(`Error filling shipping details: ${error.message}`);
        }
    }

    async getTotalPrice() {
        const totalPriceOnCheckoutElement = await this.page.$('.summary_total_label');
        if (!totalPriceOnCheckoutElement) {
            throw new Error('Total price element not found on checkout page');
        }

        const totalPriceText = await totalPriceOnCheckoutElement.innerText();
        const totalPriceMatch = totalPriceText.match(/\d+\.\d+/);

        if (!totalPriceMatch) {
            throw new Error('Total price not found or invalid format');
        }

        return parseFloat(totalPriceMatch[0]).toFixed(2);
    }

    async completeCheckout() {
        await click(this.page, '[data-test=finish]'); //Using helper function
    }

    async verifyThankYouPage() {
        await this.page.waitForSelector('.complete-header');
        const thankYouMessage = await this.page.textContent('.complete-header');
        return thankYouMessage;
    }
}

module.exports = CartPage;
