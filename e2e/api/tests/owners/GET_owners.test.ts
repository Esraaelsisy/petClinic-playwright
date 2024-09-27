import { test, RequestUtils, ResponseUtils, EndPoints } from '../../fixtures/testSetup';
import ownerData from '../../data/ownerData.json';  // Import the data from the JSON file

test.describe('GET /owners/{ownerId} Tests', () => {
 let responseBody;
  // Test for getting a pet owner by ID
  test('Get a pet owner by ID @happy', async ({ apiContext, ownerSchema }) => {
    const { ownerId, firstName, lastName, address, city, telephone } = ownerData.getOwnerSuccess;

    await test.step('Send GET /owners/{ownerId} request', async () => {
      // Make the GET request using the request utility
      const response = await RequestUtils.getRequest(apiContext, EndPoints.OWNER_BY_ID, { ownerId });

      await test.step('Validate the response status and body', async () => {
        // Validate response status and content type
        responseBody = await ResponseUtils.validateResponse(response, 200);

        await test.step('Validate the response body data', async () => {
          // Validate owner response fields using data from JSON
          await ResponseUtils.validateOwnerResponseBody(
            responseBody, firstName, lastName, address, city, telephone
          );
        });

        await test.step('Validate the response body against owner schema', async () => {
          // Validate schema
          await ResponseUtils.validateResponseBodyScehma(responseBody, ownerSchema);
        });
      });
    });
  });

  // Test for getting a NOT FOUND pet owner by ID
  test('Get a pet owner by -NOT FOUND- ID @bug', async ({ apiContext, errorSchema }) => {
    const { ownerId } = ownerData.OwnerNotFound;

    await test.step('Send GET /owners/{ownerId} request', async () => {
      // Make the GET request using the request utility
      const response = await RequestUtils.getRequest(apiContext, EndPoints.OWNER_BY_ID, { ownerId });

      await test.step('Validate the response for 404 status and body', async () => {
        // Validate that response status is 404 and get response body
         responseBody = await ResponseUtils.validateNotFoundResponse(response, 404);
      });

      await test.step('Validate the error response body against error schema', async () => {
        // Validate schema for the error response
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for getting a Bad Request pet owner by ID
  test('Get a pet owner by Invalid ID - Bad Request', async ({ apiContext, errorSchema }) => {
    const { ownerId } = ownerData.OwnerInvalidID;

    await test.step('Send GET /owners/{ownerId} request', async () => {
      // Make the GET request using the request utility
      const response = await RequestUtils.getRequest(apiContext, EndPoints.OWNER_BY_ID, { ownerId });

      await test.step('Validate the response for 400 status and body', async () => {
        // Validate that response status is 400 and get response body
         responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);
      });

      await test.step('Validate the error response body against error schema', async () => {
        // Validate schema for the error response
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for getting a Server Error pet owner by Empty ID
  test('Get a pet owner by Empty ID - Bad Request', async ({ apiContext, errorSchema }) => {
    const { ownerId } = ownerData.OwnerEmptyID;

    await test.step('Send GET /owners/{ownerId} request', async () => {
      // Make the GET request using the request utility
      const response = await RequestUtils.getRequest(apiContext, EndPoints.OWNER_BY_ID, { ownerId });

      await test.step('Validate the response for 405 status and body', async () => {
        // Validate that response status is 405 and get response body
         responseBody = await ResponseUtils.validateMethodNotAllowedResponse(response, 405);
      });

      await test.step('Validate the error response body against error schema', async () => {
        // Validate schema for the error response
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });
});