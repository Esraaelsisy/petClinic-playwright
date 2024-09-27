import { test, RequestUtils, ResponseUtils, EndPoints } from '../../fixtures/testSetup';
import ownerData from '../../data/ownerData.json';

test.describe('POST /owners Tests', () => {

  // Test for creating a new owner with SUCCESS
  test('Create a new pet owner @happy @bug', async ({ apiContext, ownerSchema }) => {
    const requestBody = ownerData.createOwnerSuccess;

    // Step 1: Log the request and send the POST request
    await test.step('Send POST /owners request', async () => {
      const response = await RequestUtils.postRequest(apiContext, EndPoints.OWNERS, requestBody);

      // Step 2: Validate the response status code and body
      await test.step('Validate the response status code and body', async () => {
        const responseBody = await ResponseUtils.validateResponse(response, 201);

        // Step 3: Validate the response body content against data from the JSON file
        await test.step('Validate the response body data', async () => {
          await ResponseUtils.validateOwnerResponseBody(
            responseBody, 
            requestBody.firstName,  // Fetching firstName from the requestBody JSON
            requestBody.lastName,   // Fetching lastName from the requestBody JSON
            requestBody.address,    // Fetching address from the requestBody JSON
            requestBody.city,       // Fetching city from the requestBody JSON
            requestBody.telephone   // Fetching telephone from the requestBody JSON
          );
        });

        // Step 4: Validate the response body schema
        await test.step('Validate the response body against owner schema', async () => {
          await ResponseUtils.validateResponseBodyScehma(responseBody, ownerSchema);
        });
      });
    });
  });

  // Test for creating a new owner with BAD REQUEST - Missing FirstName
  test('Create a new pet owner without firstName - BAD REQUEST', async ({ apiContext, errorSchema }) => {
    const requestBody = ownerData.createOwnerWithoutFirstName;

    // Step 1: Log the request and send the POST request
    await test.step('Send POST /owners request with invalid data', async () => {
      const response = await RequestUtils.postRequest(apiContext, EndPoints.OWNERS, requestBody);

      // Step 2: Validate the BAD REQUEST response and body
      await test.step('Validate the response for bad request', async () => {
        const responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);

        // Step 3: Additional assertions for missing firstName
        await test.step('Validate missing fields in response', async () => {
          await ResponseUtils.validateMissingFieldError(responseBody, 'firstName');
        });

        // Step 4: Validate the error response body schema against error schema
        await test.step('Validate the error response body schema', async () => {
          await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
        });
      });
    });
  });

  // Test for creating a new owner with BAD REQUEST - Missing LastName
  test('Create a new pet owner without lastName - BAD REQUEST', async ({ apiContext, errorSchema }) => {
    const requestBody = ownerData.createOwnerWithoutLastName;

    // Step 1: Log the request and send the POST request
    await test.step('Send POST /owners request with invalid data', async () => {
      const response = await RequestUtils.postRequest(apiContext, EndPoints.OWNERS, requestBody);

      // Step 2: Validate the BAD REQUEST response and body
      await test.step('Validate the response for bad request', async () => {
        const responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);

        // Step 3: Additional assertions for missing lastName
        await test.step('Validate missing fields in response', async () => {
          await ResponseUtils.validateMissingFieldError(responseBody, 'lastName');
        });

        // Step 4: Validate the error response body schema against error schema
        await test.step('Validate the error response body schema', async () => {
          await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
        });
      });
    });
  });

  // Test for creating a new owner with BAD REQUEST - Missing entire body
  test('Create a new pet owner without body - BAD REQUEST', async ({ apiContext, errorSchema }) => {
    const requestBody = ownerData.createOwnerEmptyBody;

    // Step 1: Log the request and send the POST request
    await test.step('Send POST /owners request with invalid data', async () => {
      const response = await RequestUtils.postRequest(apiContext, EndPoints.OWNERS, requestBody);

      // Step 2: Validate the BAD REQUEST response and body
      await test.step('Validate the response for bad request', async () => {
        const responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);

        // Step 3: Additional assertions for missing fields
        await test.step('Validate missing fields in response', async () => {
          await ResponseUtils.validateMissingFieldError(responseBody, 'firstName');
          await ResponseUtils.validateMissingFieldError(responseBody, 'lastName');
          await ResponseUtils.validateMissingFieldError(responseBody, 'address');
          await ResponseUtils.validateMissingFieldError(responseBody, 'city');
          await ResponseUtils.validateMissingFieldError(responseBody, 'telephone');
        });

        // Step 4: Validate the error response body schema against error schema
        await test.step('Validate the error response body schema', async () => {
          await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
        });
      });
    });
  });
});