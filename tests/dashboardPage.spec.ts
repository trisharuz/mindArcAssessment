import { test } from '@playwright/test';
import { POManager } from '../pages/POManager';

test('App Menu', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize({ width: 958, height: 686 });

    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();

    //1. Clicking the hamburger menu should open the app menu.
    await dashboardPage.navigateTo();
    await dashboardPage.openAppMenu();

    //2. Verify that the App Menu is currently visible
    await dashboardPage.isAppMenuVisible();

    //3. Verify that upon hover, items in the App Menu is highlighted
    await dashboardPage.hoverOverMenuItem();
    await dashboardPage.isMenuItemHighlighted();

    //4. Click the Shop and Verify that the Shop Accordion is shown and that clicking it again closes the Accordion list
    await dashboardPage.openShopAccordion();
    await dashboardPage.isShopAccordionVisible();

    //5. Click on any of the Shop Accordion list and verify that the navigation is successful
    await dashboardPage.shopAccordionList();
    await dashboardPage.verifyNavigation();

    await context.close();
});
