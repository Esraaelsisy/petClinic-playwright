import { test as baseTest, expect, APIRequestContext } from '@playwright/test';
import { RequestUtils } from '../utils/requestUtils';  
import { ResponseUtils } from '../utils/responseUtils';  
import { EndPoints } from '../utils/endpoints';  
import ownerSchema from '../schemas/ownerSchema';  
import petSchema from '../schemas/petSchema';  
import restErrorSchema from '../schemas/restErrorSchema';  

type TestFixtures = {
  apiContext: APIRequestContext;
  ownerSchema: any;
  petSchema: any;
  errorSchema: any;
};

// Extend Playwright's baseTest to include our fixtures
export const test = baseTest.extend<TestFixtures>({
  // API Context Fixture
  apiContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext();
    await use(apiContext);  // Pass the context to tests
  },

  // Owner Schema Fixture
  ownerSchema: async ({}, use) => {
    await use(ownerSchema);  // Pass the owner schema to tests
  },

  // Pet Schema Fixture
  petSchema: async ({}, use) => {
    await use(petSchema);  // Pass the pet schema to tests
  },

  // Error Schema Fixture
  errorSchema: async ({}, use) => {
    await use(restErrorSchema);  // Pass the error schema to tests
  },
});

export { expect, RequestUtils, ResponseUtils, EndPoints };