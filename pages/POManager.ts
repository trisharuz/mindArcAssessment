import { ApparelPage } from '../pages/apparelPage';
import { DashboardPage } from '../pages/dashboardPage';
import { CartPage } from '../pages/cartPage';
import { ProductPage } from '../pages/productPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { SearchPage } from '../pages/searchPage'
import { Page } from "@playwright/test";

export class POManager {
    page: Page;
    apparelPage: ApparelPage;
    dashboardPage: DashboardPage;
    productPage: ProductPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    searchPage: SearchPage;
  
    constructor(page) {
      this.page = page;
      this.apparelPage = new ApparelPage(page);
      this.dashboardPage = new DashboardPage(page);
      this.productPage = new ProductPage(page);
      this.cartPage = new CartPage(page);
      this.checkoutPage = new CheckoutPage(page);
      this.searchPage = new SearchPage(page);
    }

    getApparelPage() {
      return this.apparelPage;
    }
  
    getDashboardPage() {
      return this.dashboardPage;
    }
  
    getProductPage() {
      return this.productPage;
    }
  
    getCartPage() {
      return this.cartPage;
    }
  
    getCheckoutPage() {
      return this.checkoutPage;
    }
  

    getSearchPage() {
      return this.searchPage;
    }
  }