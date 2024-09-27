# Pet Clinic Testing Repo

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
  - [Playwright UI Tests](#playwright-ui-tests)
  - [Playwright API Tests](#playwright-api-tests)
- [Running the Tests](#running-the-tests)
  - [Running UI Tests (Playwright)](#running-ui-tests-playwright)
  - [Running API Tests (Playwright)](#running-api-tests-playwright)
  - [Toggling Headless/Headed Mode For UI Tests](#toggling-headlessheaded-mode)
- [Architectural Decisions](#architectural-decisions)
  - [Page Object Model (POM)](#page-object-model-pom)
  - [User Interface Locators](#user-interface-locators)
  - [Data-Driven Testing](#data-driven-testing)
- [Continuous Integration Setup](#continuous-integration-setup)
  - [Playwright API Tests CI](#playwright-api-tests-ci)
  - [Playwright UI Tests CI](#playwright-ui-tests-ci)
- [Expected Failures in API Tests](#expected-failures-in-api-tests)
  - [Tests To Be Failing](#tests-to-be-failing)
- [Manual Testing Documents](#manual-testing-documents)

## Overview

This repository contains both UI and API test automation for a web application. The tests are written in **Playwright with TypeScript**, using data-driven approaches and JSON schemas for validation.

Additionally, the repository includes manual testing documents for further evaluation:

- **Manual Test Cases for 2 Functionalities**
- **Overall Evaluation Report**

### **Technologies Used:**

- **UI Tests:** Playwright, TypeScript
- **API Tests:** Playwright, TypeScript
- **Additional Tools:** Docker, Node.js

## Project Structure

```bash
├── e2e/
│   ├── ui/
│   │   ├── data/
│   │   │   └── uiTestData.json          # UI test data
│   │   ├── fixtures/
│   │   │   └── my-hooks.ts              # Playwright hooks Fixture
│   │   ├── pages/
│   │   │   ├── headerPage.ts            # Header Page Object
│   │   │   ├── homePage.ts              # Home Page Object
│   │   │   ├── ownerOverviewPage.ts     # Owner Overview Page Object
│   │   │   ├── ownersPage.ts            # Owners Page Object
│   │   │   ├── ownerInfoPage.ts         # Owner Info Page Object
│   │   │   ├── petsPage.ts              # Pets Page Object
│   │   │   ├── vetsPage.ts              # Vets Page Object
│   │   │   ├── visitsPage.ts            # Visits Page Object
│   │   │   └── pageManager.ts           # Page Manager for handling all Page Objects
│   │   ├── specs/
│   │   │   ├── ownerInfoTests.spec.ts   # UI test cases
│   │   │   ├── petsTests.spec.ts
│   │   │   ├── vetsTests.spec.ts
│   │   │   └── visitsTests.spec.ts
│
│   ├── api/
│   │   ├── data/
│   │   │   ├── ownerData.json           # Owner-related API test data
│   │   │   └── petData.json             # Pet-related API test data
│   │   ├── fixtures/
│   │   │   ├── schemaSetup.ts           # JSON Schema setup for API tests
│   │   │   └── testSetup.ts             # API test setup
│   │   ├── schemas/
│   │   │   ├── ownerSchema.ts           # Owner API response schema
│   │   │   ├── petSchema.ts             # Pet API response schema
│   │   │   └── restErrorSchema.ts       # Error response schema
│   │   ├── tests/
│   │   │   ├── owners/
│   │   │   │   ├── GET_owners.test.ts   # Get Owner API test cases
│   │   │   │   ├── POST_owners.test.ts  # Create Owner API test cases
│   │   │   │   └── PUT_owners.test.ts   # Edit Owner API test cases
│   │   │   ├── pets/
│   │   │   │   ├── GET_pets.test.ts     # Get Pet API test cases
│   │   │   │   ├── POST_pets.test.ts    # Create Pet API test cases
│   │   │   │   └── PUT_pets.test.ts     # Edit Pet API test cases
│   │   │   └── utils/
│   │   │       ├── endpoints.ts         # API Endpoints definitions
│   │   │       ├── requestUtils.ts      # Utility functions for API requests
│   │   │       ├── responseUtils.ts     # Utility functions for API responses
│   │   │       └── schemaValidator.ts   # JSON Schema validator utility
│
├── .gitignore
├── docker-compose.yml
├── playwright.config.ts                 # Playwright configuration
├── package.json                         # Project dependencies
├── README.md
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

### Running API Tests (Playwright)

To run the Playwright API tests, use the following command:

```bash
npx playwright test --project=api
```

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

## Architectural Decisions

### Page Object Model (POM)

The **Page Object Model (POM)** is applied as a design pattern in the UI tests to enhance maintainability and reusability. By creating separate classes for each page or component, the interaction logic with the UI is abstracted away from the test cases. Additionally, handling all the page instances in a **Page Manager** file centralizes the page object management, improving scalability. This ensures that changes to the UI can be managed in one location without impacting multiple tests, allowing for easier maintenance and more organized test code. The pattern also promotes cleaner and more readable test scripts by keeping the test logic separate from the page structure.

### User Interface Locators

To ensure the functionality and usability of the application, user interface locators are used to interact with and validate the various elements on the web pages. These locators are well-defined within the Page Object classes, ensuring a clear separation of concerns between test logic and UI interactions.

### Data-Driven Testing

Testing with external data files enables the automation scripts to fetch test inputs from structured files, making the tests adaptable and more comprehensive. This practice reduces hardcoding of values in tests and allows quick updates to data scenarios without altering the test scripts, improving flexibility and efficiency.

## Continuous Integration Setup with Github Actions

### Playwright API Tests CI

In the Playwright API tests CI pipeline:

1. The application is started using Docker Compose.
2. The pipeline waits for the app to be fully up and running.
3. It runs API test suites for the **Owners** and **Pets** endpoints.
4. Playwright generates and uploads the test reports as artifacts.

This setup ensures that API tests are triggered on every push or pull request to the `main` branch, verifying the functionality of the API endpoints automatically.

### Playwright UI Tests CI

In the Playwright UI tests CI pipeline:

1. The application is started using Docker Compose.
2. The pipeline waits for the app to be fully up and running.
3. It runs UI test suites, including tests for **Owners**, **Pets** and **Visits**.
4. Playwright generates and uploads the test reports as artifacts.

Similar to the API tests, the UI tests are automatically executed on every push or pull request to the `main` branch, ensuring the application's UI behaves as expected across different test cases.

## Expected Failures in API Tests

Some Playwright API tests may fail, especially those with titles containing `@bug`. These tests are related to known issues in the application, and the failures are expected due to unresolved bugs. It’s important to review the test reports for these failures and cross-check them with the application's issue tracker to ensure that they are indeed related to the known bugs.

- **Test Cases with `@bug`**: These are placeholders for known issues that should be addressed during future development cycles.
- **Action**: These failures should be expected, and no further action is needed unless the related bugs are fixed and the tests still fail.

### Tests To Be Failing

1. **POST /owners**:
   - **Issue**: The API does not return the expected response body upon successful creation.
2. **GET /owners/{ownerId}**:

   - **Issue**: The API does not return the correct response status code or response body when the owner is not found (`NOT_FOUND`).

3. **PUT /owners/{ownerId}**:

   - **Issue**: The API does not return the correct response status code or response body when the owner is not found (`NOT_FOUND`).

4. **DELETE /owners/{ownerId}**:

   - **Issue**: The DELETE endpoint is not implemented, even though the assignment instructions indicate that it should be.

5. **POST /owners/{ownerId}/pets**:

   - **Issue**: The documentation contains an incorrect payload.
   - **Issue**: The API does not return the expected response status code or body when sending the correct payload.
   - **Issue**: The API does not return the expected response status code or body when the owner is not found (`NOT_FOUND`).

6. **PUT /owners/{ownerId}/pets/{petId}**:

   - **Issue**: The documentation contains an incorrect payload.
   - **Issue**: The API does not return the expected response status code or body when the owner or pet is not found (`NOT_FOUND`).

7. **GET /vets/{vetId}**:

   - **Issue**: The API does not return the expected response status code or body upon a successful request.

8. **POST /owners/{ownerId}/pets/{petId}/visits**:

   - **Issue**: The API does not return the correct response status code or body when the visit description is missing (`BAD_REQUEST`).
   - **Issue**: The API does not return the correct response status code or body when the pet is not found (`NOT_FOUND`).

9. **GET /owners/{ownerId}/pets/{petId}/visits**:
   - **Issue**: The API does not return the correct response status code or body when the pet is not found (`NOT_FOUND`).

## Manual Testing Documents

The following manual testing documents have been added to the repository under the `manual-testing-documents` folder:

1. **Manual Test Cases for 2 Functionalities**: This document contains detailed manual test cases for two key functionalities of the application.

   - File: `Manual_Test_Cases_for_2_Functionalities.xlsx`

2. **Overall Evaluation Report**: This document provides a comprehensive evaluation report based on the overall testing conducted.
   - File: `Overall_Evaluation_Report.xlsx`

You can find these files in the `manual-testing-documents/` folder for reference during manual testing.
