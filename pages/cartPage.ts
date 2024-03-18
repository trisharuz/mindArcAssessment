import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  page: Page;
  cartButton: Locator;
  cartPage: Locator;

  constructor(page) {
    this.page = page;
    this.cartPage = page.locator('h1:has-text("Shopping Cart")');
  }

  async goToCart() {
    await this.page.locator("#CartButton").click();
    await expect(this.cartPage).toBeVisible();
  }

  async verifyNormalProductsInCart(
    firstNormalProductName: string,
    firstNormalProductPrice: string,
    secondNormalProductName: string,
    secondNormalProductPrice: string
  ){
    const firstProductLocator = await this.page.getByRole("link", {
      name: `${firstNormalProductName}` })
      .nth(1);

    const firstProductPriceLocator = await this.page
      .getByText(firstNormalProductPrice)
      .nth(1);;

    const secondProductLocator = await this.page.getByRole("link", {
      name: `${secondNormalProductName}` })
      .nth(1);

    const secondProductPriceLocator = await this.page
      .getByText(secondNormalProductPrice )
      .nth(1);

      await expect(firstProductLocator).toBeVisible();
      await expect(secondProductLocator).toBeVisible();
      await expect(firstProductPriceLocator).toBeVisible();
      await expect(secondProductPriceLocator).toBeVisible();
  }

  async updateQuantity(productIndex: number, newQuantity: number) {
    const productDetails = await this.page.$$('.cart-item'); 
    if (productIndex >= 0 && productIndex < productDetails.length) {
      const quantityInput = await productDetails[productIndex].$('.quantity');
      if (quantityInput) {
        await quantityInput.fill(String(newQuantity));
        await this.page.locator('[name="update"]').click();
        await this.page.waitForTimeout(3000);
      } else {
        console.error('Quantity input not found for product at index', productIndex);
      }
    } else {
      console.error('Invalid product index:', productIndex);
    }
  }

  async getProductDetails(): Promise<{ totalQuantity: number; totalPrice: number }> {
    const productDetails = await this.page.$$('.cart-item');
    let totalQuantity = 0;
    let totalPrice = 0;
  
    for (const product of productDetails) {
      const quantityElement = await product.$('.quantity'); 
      const quantityText = await quantityElement?.getAttribute('value');
      const quantityValue = parseInt(quantityText || '0');

      const priceText = await product.$eval('.cart-item-price', el => el?.textContent?.trim());
      const price = parseFloat((priceText || '').replace(/[^\d.]/g, '') || '0');
  
      totalQuantity += quantityValue;
      totalPrice += quantityValue * price;
    }
  
    return { totalQuantity, totalPrice };
  }

  async getCartCount(): Promise<number> {
    const cartCountElement = await this.page.$('#CartButton [id="CartCount"]');
    const cartCountText = await cartCountElement?.textContent();
    return parseInt(cartCountText || '0') || 0;
  }

  async getCartCost(): Promise<number> {
    const cartCostElement = await this.page.$('#CartButton .money');
    const cartCostText = await cartCostElement?.textContent();
    return parseFloat(cartCostText?.replace(/[^\d.]/g, '') || '0') || 0;
  }

  async verifyCartCountAndCost() {
    const { totalQuantity, totalPrice } = await this.getProductDetails();

    const cartCount = await this.getCartCount();
    const cartCost = await this.getCartCost();
  
    expect(cartCount).toBe(totalQuantity);
    expect(cartCost).toBe(totalPrice);
  }


  async verifyApparelProductsWereAdded(
    firstApparelProductName: string,
    firstApparelProductPrice: string,
    secondApparelProductName: string,
    secondApparelProductPrice: string
  ){
    const firstApparelProductLocator = await this.page.getByRole("link", {
      name: `${firstApparelProductName}`, })
      .nth(1);

    const firstApparelProductPriceLocator = await this.page
      .getByText(firstApparelProductPrice)
      .nth(1);

    const secondApparelProductLocator = await this.page.getByRole("link", {
      name: `${secondApparelProductName}`})
      .nth(1);

    const secondApparelProductPriceLocator = await this.page
      .getByText(secondApparelProductPrice)
      .nth(1);

      await expect(firstApparelProductLocator).toBeVisible();
      await expect(secondApparelProductLocator).toBeVisible();
      await expect(firstApparelProductPriceLocator).toBeVisible();
      await expect(secondApparelProductPriceLocator).toBeVisible();
  }
}
