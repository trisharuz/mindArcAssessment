import { test } from '@playwright/test';
import { POManager } from '../pages/POManager';
import data from "../utils/testData.json";

test('E2E Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const productPage = poManager.getProductPage();
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();

  //1. Navigating to the website and adding a product to the cart.
  await dashboardPage.navigateTo();
  await dashboardPage.goToShop();

  await productPage.addFirstProduct();
  await productPage.addToCart();
  await productPage.addSecondProduct();
  await productPage.addToCart();

  //2. Verify that the product added to the cart is correct.
  await cartPage.goToCart();
  await cartPage.verifyNormalProductsInCart(
    data.firstNormalProductName,
    data.firstNormalProductPrice,
    data.secondNormalProductName,
    data.secondNormalProductPrice,
  ); 
    
  //3. Verify the amount and item quantity of the product
  await cartPage.goToCart();
  await cartPage.updateQuantity(0, 3);
  await cartPage.getProductDetails();
  await cartPage.verifyCartCountAndCost();
    
  //4. Validate that the checkout process is successful.
  await checkoutPage.proceedToCheckout();
  await checkoutPage.verifyCheckoutPageIsDisplayed();

  await checkoutPage.enterShippingInformation(
    data.shippingFirstName,
    data.shippingLastName,
    data.shippingAddress,
    data.shippingCity,
    data.shippingState,
    data.shippingZipCode
  );

  await checkoutPage.enterPaymentDetails(
    data.cardNumber,
    data.expiryDate,
    data.cvv
  );

  await checkoutPage.enterContactDetails(data.contactEmail);

  await checkoutPage.payNow();

  await checkoutPage.orderBeingProcessed();

  //No success page since we're just using test card

  await context.close();
});
