import { Page, expect } from "@playwright/test";

export class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto('https://www.mollyjogger.com/');
  }

  async goToShop() {
    await this.page.getByText("Shop");
  }

  async openAppMenu() {
    await this.page.click('.mobile-menu');
  }

  async isAppMenuVisible() {
    return await this.page.locator("[id='menu']").isVisible();
  }

  async hoverOverMenuItem() {
    const listItem = await this.page.locator(".site-nav ").getByRole("link", { name: "About" }).first();
    await listItem.hover();
  }

  async isMenuItemHighlighted() {
    await this.page.waitForTimeout(3000);
    const listItem = await this.page.locator(".site-nav ").getByRole("link", { name: "About" }).first();

    const backgroundColor = await listItem.evaluate(element => {
      const styles = window.getComputedStyle(element);
      return styles.color;
    });

    const targetColor = 'rgb(0, 117, 128)';

    await expect(backgroundColor).toBe(targetColor);
  }

  async openShopAccordion() {
    await this.page.locator(".site-nav").locator("text=Shop").nth(2).click();
  }

  async isShopAccordionVisible() {
    return await this.page.locator('[style="display: block;"]').isVisible();
  }

  async shopAccordionList() {
    await this.page.locator("[role='menuitem']").locator("text=Knife Kits").nth(1).click();
  }
  
  async verifyNavigation() {
    await this.page.waitForTimeout(1000);
    expect(this.page.url()).toBe('https://www.mollyjogger.com/collections/inventory/knife');
  }
}
