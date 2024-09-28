import { test, RequestUtils, ResponseUtils, EndPoints } from '../../fixtures/testSetup';
import petData from '../../data/petData.json';  // Import the JSON data

test.describe('POST /owners/{ownerId}/pets API Tests', () => {
  let responseBody;

  // Test for creating a new pet with SUCCESS
  test('Create a new pet @happy @bug', async ({ apiContext, petSchema }) => {
    const { ownerId, pet } = petData.createPetSuccess;  // Use data from JSON

    // Step 1: Log the request and send the POST request
    await test.step('POST /owners/{ownerId}/pets request', async () => {
      const response = await RequestUtils.postRequest(apiContext, EndPoints.PET_BY_OWNER_ID, pet, { ownerId });

      // Step 2: Validate the response status code
      await test.step('Validate the response status code', async () => {
        responseBody = await ResponseUtils.validateResponse(response, 204);
      });

      // Step 3: Validate the response body content
      await test.step('Validate the response body content', async () => {
        await ResponseUtils.validatePetResponseBody(responseBody, "", 2, "leooo", "2010-09-07", 1, "cat");
      });

      // Step 4: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, petSchema);
      });
    });
  });

  // Test for creating a new pet without name - BAD REQUEST
  test('Create a new pet without name - BAD REQUEST @bug', async ({ apiContext, errorSchema }) => {
    const { ownerId, pet } = petData.createPetWithoutName;  // Use data from JSON

    // Step 1: Log the request and send the POST request
    await test.step('POST /owners/{ownerId}/pets request with invalid data', async () => {
      const response = await RequestUtils.postRequest(apiContext, EndPoints.PET_BY_OWNER_ID, pet, { ownerId });

      // Step 2: Validate the BAD REQUEST response
      await test.step('Validate the response for bad request', async () => {
        responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);
      });

      // Step 3: Validate missing name field in the response
      await test.step('Validate missing fields in response', async () => {
        await ResponseUtils.validateMissingFieldError(responseBody, 'name');
      });

      // Step 4: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for creating a pet with empty body request - Server Error
  test('Create a new pet with empty body request - Server Error', async ({ apiContext, errorSchema }) => {
    const { ownerId } = petData.createPetEmptyBody;  // Use data from JSON

    // Step 1: Log the request and send the POST request
    await test.step('POST /owners/{ownerId}/pets request with empty body', async () => {
      const response = await RequestUtils.postRequest(apiContext, EndPoints.PET_BY_OWNER_ID, {}, { ownerId });

      // Step 2: Validate the Server Error response
      await test.step('Validate the response for server error', async () => {
        responseBody = await ResponseUtils.validateInternalServerErrorResponse(response, 500);
      });

      // Step 3: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for creating a pet for NOT FOUND ownerID
  test('Create a new pet for NOT FOUND ownerID @bug', async ({ apiContext, errorSchema }) => {
    const { ownerId, pet } = petData.createPetOwnerNotFound;  // Use data from JSON

    // Step 1: Log the request and send the POST request
    await test.step('POST /owners/{ownerId}/pets request with invalid data', async () => {
      const response = await RequestUtils.postRequest(apiContext, EndPoints.PET_BY_OWNER_ID, pet, { ownerId });

      // Step 2: Validate the NOT FOUND response
      await test.step('Validate the response for not found', async () => {
        responseBody = await ResponseUtils.validateNotFoundResponse(response, 404);
      });

      // Step 3: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for creating a pet for Invalid ownerID - BAD REQUEST
  test('Create a new pet for Invalid ownerID - BAD REQUEST', async ({ apiContext, errorSchema }) => {
    const { ownerId, pet } = petData.createPetInvalidOwnerID;  // Use data from JSON

    // Step 1: Log the request and send the POST request
    await test.step('POST /owners/{ownerId}/pets request with invalid data', async () => {
      const response = await RequestUtils.postRequest(apiContext, EndPoints.PET_BY_OWNER_ID, pet, { ownerId });

      // Step 2: Validate the BAD REQUEST response
      await test.step('Validate the response for bad request', async () => {
        responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);
      });

      // Step 3: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for creating a pet for Empty ownerID - Method Not Allowed
  test('Create a new pet for Empty ownerID - Method Not Allowed', async ({ apiContext, errorSchema }) => {
    const { ownerId, pet } = petData.createPetEmptyOwnerID;  // Use data from JSON

    // Step 1: Log the request and send the POST request
    await test.step('POST /owners/{ownerId}/pets request with invalid data', async () => {
      const response = await RequestUtils.postRequest(apiContext, EndPoints.PET_BY_OWNER_ID, pet, { ownerId });

      // Step 2: Validate the Method Not Allowed response
      await test.step('Validate the response for method not allowed', async () => {
        responseBody = await ResponseUtils.validateMethodNotAllowedResponse(response, 405);
      });

      // Step 3: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });
});