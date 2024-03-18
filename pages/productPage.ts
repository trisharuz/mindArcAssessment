import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  private page: Page;
  firstNormalProduct: Locator;
  secondNormalProduct: Locator;
  firstApparelProduct: Locator;
  secondApparelProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNormalProduct = page.getByRole("link", {name: "Scrimshaw Knife Kit"});
    this.secondNormalProduct = page.getByRole("link", {name: "Stag Safety Matches"});
    this.firstApparelProduct = page.getByRole("link", {name: "Arrowhead Canoe T-Shirt"});
    this.secondApparelProduct = page.getByRole("link", {name: "CCC Legacy Bandana Dungarees Blue"});
  }

  async addFirstProduct() {
    await this.firstNormalProduct.first().click();
  }

  async addSecondProduct() {
    await this.secondNormalProduct.first().click();
  }

  async addFirstApparelProduct() {
    await this.firstApparelProduct.first().click();
  }

  async addSecondApparelProduct() {
    await this.secondApparelProduct.first().click();
  }

  async addToCart() {
    await this.page.click('text="Add to Cart"');
    expect(this.page.url()).toBe('https://www.mollyjogger.com/cart');
    await this.page.goBack();
    await this.page.goBack();
  }
}
