import { test, RequestUtils, ResponseUtils, EndPoints } from '../../fixtures/testSetup'; 
import petData from '../../data/petData.json'; // Import pet data from JSON

test.describe('PUT /owners/{ownerId}/pets/{petId} Tests', () => {
  let responseBody;

  // Test for editing a pet with SUCCESS
  test('Edit a pet @happy @bug', async ({ apiContext, petSchema }) => {
    const { ownerId, pet } = petData.editPetSuccess;

    // Step 1: Log the request and send the PUT request
    await test.step('PUT /owners/{ownerId}/pets/{petId} request', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.PET_BY_PET_ID, pet, { ownerId, petId: pet.id });

      // Step 2: Validate the response status code
      await test.step('Validate the response status code', async () => {
        responseBody = await ResponseUtils.validateResponse(response, 204);
      });

      // Step 3: Validate the response body
      await test.step('Validate the response body content', async () => {
        await ResponseUtils.validatePetResponseBody(responseBody, "", parseInt(pet.id), pet.name, pet.birthDate, parseInt(pet.typeId), "cat");
      });

      // Step 4: Validate the response body schema against pet schema
      await test.step('Validate the response body schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, petSchema);
      });
    });
  });

  // Test for editing a pet without name - BAD REQUEST
  test('Edit a pet without name - BAD REQUEST @bug', async ({ apiContext, errorSchema }) => {
    const { ownerId, pet } = petData.editPetWithoutName;

    // Step 1: Log the request and send the PUT request
    await test.step('PUT /owners/{ownerId}/pets/{petId} request with invalid data', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.PET_BY_PET_ID, pet, { ownerId, petId: pet.id });

      // Step 2: Validate the BAD REQUEST response
      await test.step('Validate the BAD REQUEST response', async () => {
        responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);
      });

      // Step 3: Validate missing fields in response
      await test.step('Validate missing fields in response', async () => {
        await ResponseUtils.validateMissingFieldError(responseBody, 'name');
      });

      // Step 4: Validate the response body schema against error schema
      await test.step('Validate the error response body schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for editing a pet with empty body - SERVER ERROR
  test('Edit a pet with empty body - SERVER ERROR', async ({ apiContext, errorSchema }) => {
    const { ownerId, pet } = petData.editPetEmptyBody;

    // Step 1: Log the request and send the PUT request
    await test.step('PUT /owners/{ownerId}/pets/{petId} request with empty body', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.PET_BY_PET_ID, pet, { ownerId, petId: pet.id });

      // Step 2: Validate the INTERNAL SERVER ERROR response
      await test.step('Validate the SERVER ERROR response', async () => {
        responseBody = await ResponseUtils.validateInternalServerErrorResponse(response, 500);
      });

      // Step 3: Validate the response body schema against error schema
      await test.step('Validate the error response body schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for editing a pet with empty ownerID - NOT FOUND
  test('Edit a pet with empty ownerID - NOT FOUND', async ({ apiContext, errorSchema }) => {
    const { ownerId, pet } = petData.editPetEmptyOwnerID;

    // Step 1: Log the request and send the PUT request
    await test.step('PUT /owners/{ownerId}/pets/{petId} request with empty ownerID', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.PET_BY_PET_ID, pet, { ownerId, petId: pet.id });

      // Step 2: Validate the NOT FOUND response
      await test.step('Validate the NOT FOUND response', async () => {
        responseBody = await ResponseUtils.validateNotFoundResponse(response, 400);
      });

      // Step 3: Validate the response body schema against error schema
      await test.step('Validate the error response body schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for editing a pet with empty petID - Method Not Allowed
  test('Edit a pet with empty petID - Method Not Allowed', async ({ apiContext, errorSchema }) => {
    const { ownerId, pet } = petData.editPetEmptyPetID;

    // Step 1: Log the request and send the PUT request
    await test.step('PUT /owners/{ownerId}/pets/{petId} request with empty petID', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.PET_BY_PET_ID, pet, { ownerId, petId: pet.id });

      // Step 2: Validate the Method Not Allowed response
      await test.step('Validate the Method Not Allowed response', async () => {
        responseBody = await ResponseUtils.validateMethodNotAllowedResponse(response, 405);
      });

      // Step 3: Validate the response body schema against error schema
      await test.step('Validate the error response body schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for editing a pet with NOT FOUND ownerID
  test('Edit a pet with NOT FOUND ownerID - NOT FOUND @bug', async ({ apiContext, errorSchema }) => {
    const { ownerId, pet } = petData.editPetOwnerNotFound;

    // Step 1: Log the request and send the PUT request
    await test.step('PUT /owners/{ownerId}/pets/{petId} request with non-existent ownerID', async () => {
      const response = await RequestUtils.putRequest(apiContext, EndPoints.PET_BY_PET_ID, pet, { ownerId, petId: pet.id });

      // Step 2: Validate the NOT FOUND response
      await test.step('Validate the NOT FOUND response', async () => {
        responseBody = await ResponseUtils.validateNotFoundResponse(response, 404);
      });

      // Step 3: Validate the response body schema against error schema
      await test.step('Validate the error response body schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for editing a pet with NOT FOUND petID
  test('Edit a pet with NOT FOUND petID - NOT FOUND @bug', async ({ apiContext, errorSchema }) => {
    const { ownerId, pet } = petData.editPetPetNotFound;

        // Step 1: Log the request and send the PUT request
        await test.step('PUT /owners/{ownerId}/pets/{petId} request with non-existent petID', async () => {
          const response = await RequestUtils.putRequest(apiContext, EndPoints.PET_BY_PET_ID, pet, { ownerId, petId: pet.id });
    
          // Step 2: Validate the NOT FOUND response
          await test.step('Validate the NOT FOUND response', async () => {
            responseBody = await ResponseUtils.validateNotFoundResponse(response, 404);
          });
    
          // Step 3: Validate the response body schema against error schema
          await test.step('Validate the error response body schema', async () => {
            await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
          });
        });
      });
    });