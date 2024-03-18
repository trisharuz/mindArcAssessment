# Mind Arc Assessment

This repository contains the automated tests for the MindArc Assessment project.

## Overview

This project consists of end-to-end tests using Playwright for the following scenarios:

1. **E2E Test** - Automates the process of navigating to the website, adding a product to the cart, verifying the product, and validating the checkout process.

2. **Product List Page Test** - Tests the functionality related to the product list page, including verifying products, sorting, and view display.

3. **App Menu Test** - Verifies the functionality of the app menu, including opening, highlighting items on hover, and navigating through menu options.

4. **Search Test** - Tests the search functionality and display.

## Setup

To run the tests locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/trisharuz/mindArcAssessment.git
   ```
   
2. Install dependencies:

   ```bash
   npm install
   ```
   
3. Run the test:

   ```bash
   npx playwright test
   ```
   
## Folder Structure
- /pages: Contains all the the page objects with methods and locators for different pages of the application.
- /tests: Contains all the automated test scripts.
- /utils: Contains utility functions and helper scripts.
