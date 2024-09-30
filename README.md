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
  - [Tests Expected to Fail](#tests-expected-to-fail)
  - [Additional Notes](#additional-notes)
- [Manual Testing Documents](#manual-testing-documents)
- [Deliverables](#deliverables)

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
│   ├── ui/                              # UI tests
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
│   ├── api/                             # API tests
│   │   ├── data/
│   │   │   ├── ownerData.json           # Owner API test data
│   │   │   └── petData.json             # Pet API test data
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

- **Install Playwright**

```bash
npm init playwright@latest
```

## Running the Tests

### Running UI Tests (Playwright)

- **To run the Playwright UI tests,** use the following command:

```bash
npm run test:ui-chromium
```

- **To run Owners UI tests only:**

```bash
npm run test:owners-ui
```

- **To run Pets UI tests only:**

```bash
npm run test:pets-ui
```

- **To run Visits UI tests only:**

```bash
npm run test:visits-ui
```

- **Test results and HTML reports** are generated automatically. Latest version are uploaded under `playwright-reports/`

### Running API Tests (Playwright)

- **To run the Playwright API tests,** use the following command:

```bash
npm run test:api
```

- **To run Owners API tests only:**

```bash
npm run test:owners-api
```

- **To run Pets API tests only:**

```bash
npm run test:pets-api
```

- **To run all tests (UI and API):**

```bash
npm run test:all
```

- **Test results and HTML reports** are generated automatically. Latest version are uploaded under `playwright-reports/`

### Toggling Headless/Headed Mode

You can control whether the tests run in headless or headed mode by setting the `HEADLESS` environment variable.

- To run in **headed mode** (with UI visible):

```bash
HEADLESS=false npm run test:ui-chromium
```

- To run in **headless mode** (default):

```bash
npm run test:ui-chromium
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

### Tests Expected to Fail

1. **GET /owners/{ownerId}/pets/{petId} API Tests**:

   - **Test**: Get a different pet by Pet ID for the same owner `@happy @bug`
   - **Issue**: Incorrect response for getting a different pet by Pet ID.

2. **GET /owners/{ownerId}/pets/{petId} API Tests**:

   - **Test**: Get a pet with NOT FOUND Owner ID `@bug`
   - **Issue**: The API does not return the correct response when the owner ID is not found.

3. **GET /owners/{ownerId}/pets/{petId} API Tests**:

   - **Test**: Get a pet with NOT FOUND Pet ID `@bug`
   - **Issue**: The API does not return the correct response when the pet ID is not found.

4. **GET /owners/{ownerId}/pets/{petId} API Tests**:

   - **Test**: Get a pet by Invalid Owner ID - BAD REQUEST `@bug`
   - **Issue**: The API does not handle invalid owner ID requests correctly.

5. **PUT /owners/{ownerId}/pets/{petId} API Tests**:

   - **Test**: Edit a pet `@happy @bug`
   - **Issue**: Incorrect response when editing a pet.

6. **PUT /owners/{ownerId}/pets/{petId} API Tests**:

   - **Test**: Edit a pet without name - BAD REQUEST `@bug`
   - **Issue**: The API does not return the correct BAD REQUEST response when the pet name is missing.

7. **PUT /owners/{ownerId}/pets/{petId} API Tests**:

   - **Test**: Edit a pet with NOT FOUND Owner ID - NOT FOUND `@bug`
   - **Issue**: The API does not return the correct response when the owner ID is not found.

8. **PUT /owners/{ownerId}/pets/{petId} API Tests**:

   - **Test**: Edit a pet with NOT FOUND Pet ID - NOT FOUND `@bug`
   - **Issue**: The API does not return the correct response when the pet ID is not found.

9. **POST /owners/{ownerId}/pets API Tests**:

   - **Test**: Create a new pet `@happy @bug`
   - **Issue**: The API does not return the correct response when creating a new pet.

10. **POST /owners/{ownerId}/pets API Tests**:

    - **Test**: Create a new pet without name - BAD REQUEST `@bug`
    - **Issue**: The API does not return the correct BAD REQUEST response when the pet name is missing.

11. **POST /owners/{ownerId}/pets API Tests**:

    - **Test**: Create a new pet for NOT FOUND Owner ID `@bug`
    - **Issue**: The API does not return the correct response when the owner ID is not found.

12. **GET /owners/{ownerId} API Tests**:

    - **Test**: Get a pet owner by NOT FOUND - ID `@bug`
    - **Issue**: The API does not return the correct response when the owner ID is not found.

13. **POST /owners API Tests**:

    - **Test**: Create a new pet owner `@happy @bug`
    - **Issue**: The API does not return the correct response when creating a new owner.

14. **PUT /owners/{ownerId} API Tests**:
    - **Test**: Edit an owner with NOT FOUND Owner ID `@bug`
    - **Issue**: The API does not return the correct response when the owner ID is not found.

### Additional Notes

The tests marked as `@bug` in the test titles correspond to known issues documented in the project. These tests are expected to fail until the respective bugs are fixed.

## Manual Testing Documents

The following manual testing documents have been added to the repository under the `manual-testing-documents` folder:

1. **Manual Test Cases for 2 Functionalities**: This document contains detailed manual test cases for two key functionalities of the application.

   - File: `Manual_Test_Cases_for_2_Functionalities.xlsx`

2. **Overall Evaluation Report**: This document provides a comprehensive evaluation report based on the overall testing conducted.
   - File: `Overall_Evaluation_Report.xlsx`

You can find these files in the `manual-testing-documents/` folder for reference during manual testing.

## Deliverables

This project includes the following key deliverables for the assignment:

1. **Manual Test Cases Document:**

   - A comprehensive set of manual test cases is provided, covering two critical functionalities of the application:
     - Adding a new pet.
     - Adding a new pet visit.

2. **Overall Evaluation Report:**

   - The evaluation report details the issues discovered during testing, the reasoning behind the chosen test cases, and insights into the overall testing approach.
   - The report includes:
     - Found Issues in APIs and UI.
     - A summary of test cases selected for automation.
     - Recommendations for improvement.
     - Risks identified during testing.
     - Approach identifying testing methodology, including manual and automated testing strategies.
     - Business improvement suggestions (noted under the "Business Improvements" tab).

3. **Automated Tests:**

   - **API Automation Tests:**
   - Developed using Playwright with TypeScript for API testing.
   - Tests cover Owner and Pet API endpoints with positive, negative, and edge case scenarios.
   - Uses JSON schemas for response validation.
   - Uses JSON data file to drive the tests.
   - Includes `@bug` tags for tests associated with known application issues.
   - **UI Tests:**
     - 8 automated web test scripts developed using Playwright, covering various functionalities:
       - `ownersTests.spec.ts`: 5 completed tests.
       - `petsTests.spec.ts`: 2 tests, some may fail.
       - `visitsTests.spec.ts`: 1 test, with potential failures.
       - A placeholder for `vetsTests.spec.ts` is included to showcase the framework structure.
     - The extra incomplete tests are added to demonstrate the testing approach.

4. **Test Reports:**

   - An automatic test report is generated after each test run, which includes detailed execution results.
   - Instructions on how to access and interpret these reports are provided in the README file.
   - Latest versions from these HTML reports can be found under `playwright-reports/`

5. **README:**

   - The README includes clear and concise instructions on:
     - How to run both the API and UI tests.
     - How to access and review the generated test reports.
     - Detailed explanations for using the codebase without needing prior knowledge of TypeScript or JavaScript.
     - Instructions for toggling headless execution for front-end tests.

6. **Continuous Integration (CI) Setup:**

   - **GitHub Actions** pipelines are configured for both API and UI tests:
     - `apiTests-postman.yml`: Executes the Postman API tests (now updated to Playwright API tests).
     - `webTests-playwright.yml`: Executes the Playwright UI tests.
   - These pipelines handle the test execution and report generation automatically upon code changes.
   - Instructions for running tests via CI/CD are included in the README file.

7. **Docker Integration:**

   - Docker Compose is used to manage the application environment.
   - CI pipelines ensure the application is ready before running the tests.

8. **Additional Details:**
   - Expected failing tests are explicitly mentioned in both the **Evaluation Report** and the **README** file.
   - A toggle for headless execution of UI tests is provided, with usage instructions included in the README.
   - Suggestions for future improvements and potential business benefits are provided in the evaluation report.
   - Extra tests beyond the mandatory ones have been included to showcase the automation testing approach.
