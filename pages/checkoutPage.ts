import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  private page: Page;
  checkoutButton: Locator;
  checkoutPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator("[name='checkout']")
    this.checkoutPage = page.locator("[id='checkout-main']");
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async verifyCheckoutPageIsDisplayed() {
    await expect(this.checkoutPage).toBeVisible();
  }

  async enterContactDetails(contactEmail: string) {
    await this.page.fill('[id="email"]', contactEmail);
  }

  async enterShippingInformation(
    shippingFirstName: string,
    shippingLastName: string, 
    shippingAddress: string, 
    shippingCity: string, 
    shippingState: string,
    shippingZipCode:string 
    ){

    await this.page.locator("[name='firstName']").first().fill(shippingFirstName);
    await this.page.locator("[name='lastName']").first().fill(shippingLastName);
    await this.page.locator("[name='address1']").first().fill(shippingAddress);
    await this.page.locator("[name='city']").first().fill(shippingCity);
    await this.page.locator("[name='zone']").first().selectOption(shippingState);
    await this.page.locator("[name='postalCode']").first().fill(shippingZipCode);
  }

  async enterPaymentDetails(
    cardNumber: string,
    expiryDate: string,
    cvv: string
  ){
    const iframeSelector = 'iframe.card-fields-iframe';
    const iframeElement = await this.page.waitForSelector(iframeSelector);
    const iframe = await iframeElement.contentFrame();

    const cardNumberInput = await iframe?.locator("//*[@id='number']").first();
    await cardNumberInput?.fill(cardNumber);

    const expiryDateInput = await iframe?.locator("[id='expiry']").first();
    await expiryDateInput?.fill(expiryDate);

    const cvvInput = await iframe?.locator("[id='verification_value']").first();
    await cvvInput?.fill(cvv);
  }

  async payNow() {
    await this.page.locator("text=Pay now").click();
  }

  async orderBeingProcessed() {
    await this.page.locator("text=Your order is being processed.").isVisible();
  }
}
