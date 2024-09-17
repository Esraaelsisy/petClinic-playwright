# Pet Clinic Testing Repo

## Overview
This repository contains both UI and API test automation for a web application. The UI tests are written in **Playwright with TypeScript**, and the API tests are handled via **Postman collections** with JavaScript test scripts. 

Additionally, the repository includes manual testing documents for further testing and evaluation:
- **Manual Test Cases for 2 Functionalities**
- **Overall Evaluation Report**

### **Technologies Used:**
- **UI Tests:** Playwright, TypeScript
- **API Tests:** Postman, JavaScript
- **Additional Tools:** Docker, Node.js


## Project Structure

```bash
├── e2e/
│   ├── ui/
│   │   ├── data/
│   │   │   └── uiTestData.json          # UI test data
│   │   ├── fixtures/
│   │   │   └── my-hooks.ts              # Playwright hooks
│   │   ├── pages/
│   │   │   ├── headerPage.ts            # Header Page Object
│   │   │   ├── homePage.ts              # Home Page Object
│   │   │   └── ownerInfoPage.ts         # Other Page Objects...
│   │   ├── specs/
│   │   │   ├── ownerInfoTests.spec.ts   # UI test cases
│   │   │   ├── petsTests.spec.ts
│   │   │   └── vetsTests.spec.ts
├── tests/
│   ├── api/
│   │   ├── collections/                 # Postman collections
│   │   ├── data/                        # API test data
│   │   ├── environment/                 # Postman environments
├── .gitignore
├── docker-compose.yml
├── playwright.config.ts                 # Playwright configuration
├── package.json                         # Project dependencies
└── README.md
```

## Prerequisites

### Playwright UI Tests:
- **Node.js** installed
- Install dependencies:
  ```bash
  npm install
  ```
### Postman API Tests:
- **Postman** or **Newman** installed
- Import the Postman collections and environment from the `tests/api` folder.


## Running the Tests

### Running UI Tests (Playwright)

To run the Playwright UI tests, use the following command:
```bash
npx playwright test
```
- **Test results and HTML reports** are generated automatically.

### Toggling Headless/Headed Mode

You can control whether the tests run in headless or headed mode by setting the `HEADLESS` environment variable.

- To run in **headed mode** (with UI visible):
  ```bash
  HEADLESS=false npx playwright test
  ```
  - To run in **headless mode** (default):
  ```bash
  npx playwright test
  ```

### Running API Tests (Postman)

You can run the API tests in Postman by importing the collections and environment files from `tests/api/collections/` and `tests/api/environment/`. Alternatively, run them via Newman using the following command:

```bash
newman run tests/api/collections/ownersCollection.postman_collection.json -e tests/api/environment/Local.postman_environment.json
```

---

## Continuous Integration Setup

### Playwright CI with Docker

In the Playwright CI pipeline:

1. The application is first started using Docker Compose.
2. The pipeline then waits for the app to be fully up and running.
3. It runs Playwright tests in both headless and headed modes using the matrix strategy.
4. Results from the Playwright test runs are saved as HTML reports and uploaded as artifacts.

These reports can be found in the `playwright-report` folder after the tests run.

### Postman API Tests CI

In the Postman API tests CI pipeline:

1. The application is started using Docker Compose.
2. Newman is used to run the Postman collections, using both environment and global variables.
3. The API test results are saved as detailed HTML reports.
4. The reports are stored in the `results/` folder and uploaded as artifacts.

---

## Expected Failures in Postman Collections

Some Postman tests may fail, especially those with titles containing `[BUG]`. These tests are related to known issues in the application, and the failures are expected due to unresolved bugs. It’s important to review the test reports for these failures and cross-check them with the application's issue tracker to ensure that they are indeed related to the known bugs.

- **Test Cases with [BUG]**: These are placeholders for known issues that should be addressed during future development cycles.
- **Action**: These failures should be expected, and no further action is needed unless the related bugs are fixed and the tests still fail.

---

## Manual Testing Documents

The following manual testing documents have been added to the repository under the `manual-testing-documents` folder:

1. **Manual Test Cases for 2 Functionalities**: This document contains detailed manual test cases for two key functionalities of the application.
   - File: `Manual_Test_Cases_for_2_Functionalities.xlsx`

2. **Overall Evaluation Report**: This document provides a comprehensive evaluation report based on the overall testing conducted.
   - File: `Overall Evaluation Report.xlsx`

You can find these files in the `manual-testing-documents/` folder for reference during manual testing.
