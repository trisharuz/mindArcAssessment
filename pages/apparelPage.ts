import { Page, expect } from '@playwright/test';

export class ApparelPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToApparelPage() {
    await this.page.goto('https://www.mollyjogger.com/collections/inventory/clothing-accessories');
  }

  async isOnApparelPage() {
    const title = await this.page.title();
    return title.includes('clothing & accessories');
  }

  async sortProductsByAlphabetical() {
    await this.page.locator("[id='SortBy']").selectOption('title-ascending');
    await this.page.waitForLoadState('networkidle');
  }

  async sortProductsByPrice() {
    await this.page.locator("[id='SortBy']").selectOption('price-ascending');
    await this.page.waitForLoadState('networkidle');
  }

  async clickIconView() {
    await this.page.locator("button[title='Grid view']").click();
  }

  async clickListView() {
    await this.page.locator("button[title='List view']").click();
  }

  async isIconViewDisplayed() {
    const url = this.page.url();
    if (url.includes('view=grid')) {
      expect(true).toBeTruthy(); 
    } else {
      expect(false).toBeTruthy(); 
    }
  }

  async isListViewDisplayed() {
    const url = this.page.url();
    if (url.includes('view=list')) {
      expect(true).toBeTruthy(); 
    } else {
      expect(false).toBeTruthy(); 
    }
  }

  async getProductNames() {
    const productTitles = await this.page.$$('.product-title');
    const currentUrl = this.page.url();
    const isSortedAlphabetically = currentUrl.includes("sort_by=title-ascending");
    expect(isSortedAlphabetically).toBeTruthy();
    return await Promise.all(productTitles.map(async (el) => {
      const text = await el.textContent();
      return text ? text.trim() : '';
    }));
  }

  async getProductPrices() {
    const productPrices = await this.page.$$('.price');
    const currentUrl = this.page.url();
    const isSortedByPrice = currentUrl.includes("sort_by=price-ascending");
    expect(isSortedByPrice).toBeTruthy();
    return await Promise.all(productPrices.map(async (el) => {
      const text = await el.textContent();
      return text ? parseFloat(text.replace('$', '')) : 0;
    }));
  }
}
