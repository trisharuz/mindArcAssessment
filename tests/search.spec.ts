import { expect, test} from '@playwright/test';
import { POManager } from '../pages/POManager';
import data from "../utils/testData.json";

test('Search Function and Display', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);

    const dashboardPage = poManager.getDashboardPage();
    const searchPage = poManager.getSearchPage();

    await dashboardPage.navigateTo();
    
    await searchPage.searchForTerm(data.searchInput);

    await expect(searchPage.isSearchResultsVisible()).toBeTruthy();

    const displayedSearchTerm = await searchPage.getDisplayedSearchTerm();
    await expect(displayedSearchTerm).toContain(data.searchInput);

    await context.close();
});
