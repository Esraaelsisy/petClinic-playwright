import { test, expect, RequestUtils, ResponseUtils, EndPoints } from '../../fixtures/testSetup';  // Import shared setup
import ownerData from '../../data/ownerData.json'; // Import the JSON data

test.describe('PUT /owners/{ownerId} Tests', () => {

  // Test for editing an existing owner with SUCCESS
  test('Edit an owner @happy', async ({ apiContext, ownerSchema }) => {
    const requestBody = ownerData.editOwnerSuccess;  // Use data from JSON

    // Step 1: Make PUT request to edit the owner
    await test.step('Send PUT /owners/{ownerId} request', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.OWNER_BY_ID, requestBody, { ownerId: requestBody.ownerId });

      // Step 2: Validate the response status code
      await test.step('Validate the response status code and body', async () => {
        const responseBody = await ResponseUtils.validateResponse(response, 200);

        // Step 3: Validate the response body data
        await test.step('Validate the response body data', async () => {
          await ResponseUtils.validateOwnerResponseBody(
            responseBody, requestBody.firstName, requestBody.lastName, requestBody.address, requestBody.city, requestBody.telephone
          );
        });

        // Step 4: Validate the response body schema against owner schema
        await test.step('Validate the response body schema', async () => {
          await ResponseUtils.validateResponseBodyScehma(responseBody, ownerSchema);
        });
      });
    });
  });

  // Test for editing an existing owner with BAD REQUEST (Missing FirstName)
  test('Edit an owner without firstName -  BAD REQUEST', async ({ apiContext, errorSchema }) => {
    const requestBody = ownerData.editOwnerMissingFirstName;  // Use data from JSON

    // Step 1: Make PUT request to edit the owner with invalid data (missing fields)
    await test.step('Send PUT /owners/{ownerId} request with invalid data', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.OWNER_BY_ID, requestBody, { ownerId: requestBody.ownerId });

      // Step 2: Validate the BAD REQUEST response and body
      await test.step('Validate the response for bad request', async () => {
        const responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);

        // Step 3: Additional assertions for missing firstname and lastname
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

  // Test for editing an existing owner with BAD REQUEST (Missing LastName)
  test('Edit an owner without lastName -  BAD REQUEST', async ({ apiContext, errorSchema }) => {
    const requestBody = ownerData.editOwnerMissingLastName;  // Use data from JSON

    // Step 1: Make PUT request to edit the owner with invalid data (missing fields)
    await test.step('Send PUT /owners/{ownerId} request with invalid data', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.OWNER_BY_ID, requestBody, { ownerId: requestBody.ownerId });

      // Step 2: Validate the BAD REQUEST response and body
      await test.step('Validate the response for bad request', async () => {
        const responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);

        // Step 3: Additional assertions for missing firstname and lastname
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

  // Test for editing an owner with Empty Body - BAD REQUEST
  test('Edit an owner with Empty Body - BAD REQUEST', async ({ apiContext, errorSchema }) => {
    const ownerId = ownerData.OwnerForEdit.ownerId;  // Use data from JSON

    // Step 1: Make PUT request to edit the owner with an empty body
    await test.step('Send PUT /owners/{ownerId} request with invalid data', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.OWNER_BY_ID, {}, { ownerId });

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

  // Test for editing a non-existing owner with - Not Found
  test('Edit an owner with -Not Found- Owner ID @bug', async ({ apiContext, errorSchema }) => {
    const requestBody = ownerData.editOwnerSuccess;  // Use the success body but with a not found ID
    const ownerId = ownerData.OwnerNotFound.ownerId;

    // Step 1: Make PUT request with not found ID
    await test.step('Send PUT /owners/{ownerId} request with Not Found ID', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.OWNER_BY_ID, requestBody, { ownerId });

      // Step 2: Validate the NOT FOUND response and body
      await test.step('Validate the response for not found', async () => {
        const responseBody = await ResponseUtils.validateNotFoundResponse(response, 404);

        // Step 4: Validate the error response body schema against error schema
        await test.step('Validate the error response body schema', async () => {
          await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
        });
      });
    });
  });

  // Test for editing an owner with Invalid ID - BAD REQUEST
  test('Edit an owner with Invalid Owner ID - BAD REQUEST', async ({ apiContext, errorSchema }) => {
    const requestBody = ownerData.editOwnerSuccess;  // Use the success body
    const ownerId = ownerData.OwnerInvalidID.ownerId;  // Use invalid ID from JSON

    // Step 1: Make PUT request to edit the owner with invalid ID
    await test.step('Send PUT /owners/{ownerId} request with Invalid ID', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.OWNER_BY_ID, requestBody, { ownerId });

      // Step 2: Validate the BAD REQUEST response and body
      await test.step('Validate the response for bad request', async () => {
        const responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);

        // Step 4: Validate the error response body schema against error schema
        await test.step('Validate the error response body schema', async () => {
          await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
        });
      });
    });
  });

  // Test for editing an owner with Empty Owner ID - BAD REQUEST
  test('Edit an owner with Empty Owner ID - BAD REQUEST', async ({ apiContext, errorSchema }) => {
    const requestBody = ownerData.editOwnerSuccess;  // Use the success body
    const ownerId = ownerData.OwnerEmptyID.ownerId;  // Use empty ID from JSON

    // Step 1: Make PUT request to edit the owner with empty ID
    await test.step('Send PUT /owners/{ownerId} request with Empty ID', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.OWNER_BY_ID, requestBody, { ownerId });

      // Step 2: Validate the BAD REQUEST response and body
      await test.step('Validate the response for bad request', async () => {
        const responseBody = await ResponseUtils.validateMethodNotAllowedResponse(response, 405);

        // Step 4: Validate the error response body schema against error schema
        await test.step('Validate the error response body schema', async () => {
          await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
        });
      });
    });
  });
});