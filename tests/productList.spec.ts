import { test, expect } from '@playwright/test';
import { POManager } from '../pages/POManager';

test('Product List Page Test - Apparel Category', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);
    const apparelPage = poManager.getApparelPage();
    const productPage = poManager.getProductPage();
    
    // Step 1: Go to Apparel Category to display Product List Page
    await apparelPage.navigateToApparelPage();
    await apparelPage.isOnApparelPage();

    // Step 2: Verify that the product added to the cart is for Apparels
    await productPage.addFirstApparelProduct();
    await productPage.addToCart();
    await productPage.addSecondApparelProduct();
    await productPage.addToCart();

    // Step 3a: Automate the Alphabetical Sorting Test
    await apparelPage.navigateToApparelPage();
    await apparelPage.sortProductsByAlphabetical();
    const sortedProductNames = await apparelPage.getProductNames();
    expect(sortedProductNames).toEqual(sortedProductNames.sort());
    
    // Step 3b: Automate the Pricing Sorting Test
    await apparelPage.navigateToApparelPage();
    await apparelPage.sortProductsByPrice();
    const sortedProductPrices = await apparelPage.getProductPrices();
    expect(sortedProductPrices).toEqual(sortedProductPrices.sort());
    
    // Step 4: Click both Icon View and List view and check if the view displays correctly
    await apparelPage.clickIconView();
    await apparelPage.isIconViewDisplayed();

    await apparelPage.clickListView();
    await apparelPage.isListViewDisplayed();
    
    await context.close();
});
