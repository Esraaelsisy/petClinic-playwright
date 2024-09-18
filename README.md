# Pet Clinic Testing Repo

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
  - [Playwright UI Tests](#playwright-ui-tests)
  - [Postman API Tests](#postman-api-tests)
- [Running the Tests](#running-the-tests)
  - [Running UI Tests (Playwright)](#running-ui-tests-playwright)
  - [Toggling Headless/Headed Mode](#toggling-headlessheaded-mode)
  - [Running API Tests (Postman)](#running-api-tests-postman)
- [Architectural Decisions](#architectural-decisions)
  - [Page Object Model (POM)](#page-object-model-pom)
  - [User Interface Locators](#user-interface-locators)
  - [Data-Driven Testing](#data-driven-testing)
- [Continuous Integration Setup](#continuous-integration-setup)
  - [Playwright CI with Docker](#playwright-ci-with-docker)
  - [Postman API Tests CI](#postman-api-tests-ci)
- [Expected Failures in Postman Collections](#expected-failures-in-postman-collections)
  - [Tests To Be Failing](#tests-to-be-failing)
- [Manual Testing Documents](#manual-testing-documents)

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
│   │   │   └── my-hooks.ts              # Playwright hooks Fixture
│   │   ├── pages/
│   │   │   ├── headerPage.ts            # Header Page Object
│   │   │   ├── pageManager.ts           # Page Manager Objects for all pages
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

## Architectural Decisions

### Page Object Model (POM)

The **Page Object Model (POM)** is applied as a design pattern in the UI tests to enhance maintainability and reusability. By creating separate classes for each page or component, the interaction logic with the UI is abstracted away from the test cases. Additionally, handling all the page instances in a **Page Manager** file centralizes the page object management, improving scalability. This ensures that changes to the UI can be managed in one location without impacting multiple tests, allowing for easier maintenance and more organized test code. The pattern also promotes cleaner and more readable test scripts by keeping the test logic separate from the page structure.

### User Interface Locators

To ensure the functionality and usability of the application, user interface locators are used to interact with and validate the various elements on the web pages. These locators are well-defined within the Page Object classes, ensuring a clear separation of concerns between test logic and UI interactions.

### Data-Driven Testing

Testing with external data files enables the automation scripts to fetch test inputs from structured files, making the tests adaptable and more comprehensive. This practice reduces hardcoding of values in tests and allows quick updates to data scenarios without altering the test scripts, improving flexibility and efficiency.

## Continuous Integration Setup

### Playwright CI with Docker

In the Playwright CI pipeline:

1. The application is first started using Docker Compose.
2. The pipeline then waits for the app to be fully up and running.
3. It runs Playwright tests for every .spec.ts file.
4. Results from the Playwright test runs are saved as HTML reports and uploaded as artifacts.

These reports can be found in the `playwright-report` folder after the tests run.

### Postman API Tests CI

In the Postman API tests CI pipeline:

1. The application is started using Docker Compose.
2. Newman is used to run the Postman collections, using both environment and global variables.
3. The API test results are saved as detailed HTML reports.
4. The reports are stored in the `results/` folder and uploaded as artifacts.

## Expected Failures in Postman Collections

Some Postman tests may fail, especially those with titles containing `[BUG]`. These tests are related to known issues in the application, and the failures are expected due to unresolved bugs. It’s important to review the test reports for these failures and cross-check them with the application's issue tracker to ensure that they are indeed related to the known bugs.

- **Test Cases with [BUG]**: These are placeholders for known issues that should be addressed during future development cycles.
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
