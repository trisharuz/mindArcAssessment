import { test, expect, PlaywrightTestConfig, Page } from '@playwright/test';

export class SearchPage {
    private page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    async searchForTerm(searchTerm: string) {
        await this.page.goto("https://www.mollyjogger.com/search");
        const searchEnter = await this.page.locator("input[name='q']").nth(1)
        searchEnter.fill(searchTerm);
        searchEnter.press("Enter");
    }

    async isSearchResultsVisible() {
        return await this.page.locator('.search-results').isVisible();
    }

    async getDisplayedSearchTerm() {
        const searchResultHeader = await this.page.locator('h1:has-text("Your search for")');
        const searchResultHeaderText = await searchResultHeader.textContent();
        return searchResultHeaderText?.trim();
    }

}