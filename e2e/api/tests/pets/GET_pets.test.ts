import { test, RequestUtils, ResponseUtils, EndPoints } from '../../fixtures/testSetup';
import petData from '../../data/petData.json'; // Import the pet data from the JSON file

test.describe('GET /owners/{ownerId}/pets/{petId} API Tests', () => {
  let responseBody;

  // Test for getting a pet by Owner ID
  test('Get a pet by Owner ID @happy', async ({ apiContext, petSchema }) => {
    const expectedData = petData.getPetSuccess1; // Get data for this test from JSON

    // Step 1: Make GET request for a pet by owner ID
    await test.step('Send GET /owners/{ownerId}/pets/{petId} request', async () => {
      const response = await RequestUtils.getRequest(apiContext, EndPoints.PET_BY_PET_ID, {
        ownerId: expectedData.ownerId,
        petId: expectedData.pet.id,
      });

      // Step 2: Validate the response status code
      await test.step('Validate the response status code', async () => {
        responseBody = await ResponseUtils.validateResponse(response, 200);
      });

      // Step 3: Validate the response body content
      await test.step('Validate the response body content', async () => {
        await ResponseUtils.validatePetResponseBody(
          responseBody,
          expectedData.ownerName,           // Fetching owner name from JSON
          parseInt(expectedData.pet.id),    // Fetching pet id from JSON
          expectedData.pet.name,            // Fetching pet name from JSON
          expectedData.pet.birthDate,       // Fetching pet birthDate from JSON
          parseInt(expectedData.pet.typeId), // Fetching type id from JSON
          expectedData.pet.typeName         // Fetching type name from JSON
        );
      });

      // Step 4: Validate the response body schema against pet schema
      await test.step('Validate the response body schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, petSchema);
      });
    });
  });

  // Test for getting a different pet by Pet ID for the same owner
  test('Get a different pet by Pet ID for the same owner @happy @bug', async ({ apiContext, petSchema }) => {
    const expectedData = petData.getPetSuccess2; // Get data for this test from JSON

    // Step 1: Make GET request for a pet by owner ID
    await test.step('Send GET /owners/{ownerId}/pets/{petId} request', async () => {
      const response = await RequestUtils.getRequest(apiContext, EndPoints.PET_BY_PET_ID, {
        ownerId: expectedData.ownerId,
        petId: expectedData.pet.id,
      });

      // Step 2: Validate the response status code
      await test.step('Validate the response status code', async () => {
        responseBody = await ResponseUtils.validateResponse(response, 200);
      });

      // Step 3: Validate the response body content
      await test.step('Validate the response body content', async () => {
        await ResponseUtils.validatePetResponseBody(
          responseBody,
          expectedData.ownerName,           // Fetching owner name from JSON
          parseInt(expectedData.pet.id),    // Fetching pet id from JSON
          expectedData.pet.name,            // Fetching pet name from JSON
          expectedData.pet.birthDate,       // Fetching pet birthDate from JSON
          parseInt(expectedData.pet.typeId), // Fetching type id from JSON
          expectedData.pet.typeName         // Fetching type name from JSON
        );
      });

      // Step 4: Validate the response body schema against pet schema
      await test.step('Validate the response body schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, petSchema);
      });
    });
  });

  // Test for getting a pet with NOT FOUND Owner ID
  test('Get a pet with NOT FOUND Owner ID @bug', async ({ apiContext, errorSchema }) => {
    const { ownerId, petId } = petData.petOwnerNotFound;  // Use data from JSON

    // Step 1: Make GET request for a pet by non-existent owner ID
    await test.step('Send GET /owners/{ownerId}/pets/{petId} request with non-existent owner ID', async () => {
      const response = await RequestUtils.getRequest(apiContext, EndPoints.PET_BY_PET_ID, { ownerId, petId });

      // Step 2: Validate the NOT FOUND response
      await test.step('Validate the NOT FOUND response', async () => {
        responseBody = await ResponseUtils.validateNotFoundResponse(response, 404);
      });

      // Step 3: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for getting a pet with NOT FOUND Pet ID
  test('Get a pet with NOT FOUND Pet ID @bug', async ({ apiContext, errorSchema }) => {
    const { ownerId, petId } = petData.petNotFound;  // Use data from JSON

    // Step 1: Make GET request for a pet by non-existent pet ID
    await test.step('Send GET /owners/{ownerId}/pets/{petId} request with non-existent pet ID', async () => {
      const response = await RequestUtils.getRequest(apiContext, EndPoints.PET_BY_PET_ID, { ownerId, petId });

      // Step 2: Validate the NOT FOUND response
      await test.step('Validate the NOT FOUND response', async () => {
        responseBody = await ResponseUtils.validateNotFoundResponse(response, 404);
      });

      // Step 3: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for getting a pet with Invalid Owner ID
  test('Get a pet by Invalid Owner ID - BAD REQUEST @bug', async ({ apiContext, errorSchema }) => {
    const { ownerId, petId } = petData.invalidOwnerID;  // Use data from JSON

    // Step 1: Make GET request for a pet by invalid owner ID
    await test.step('Send GET /owners/{ownerId}/pets/{petId} request with invalid owner ID', async () => {
      const response = await RequestUtils.getRequest(apiContext, EndPoints.PET_BY_PET_ID, { ownerId, petId });

      // Step 2: Validate the BAD REQUEST response
      await test.step('Validate the BAD REQUEST response', async () => {
        responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);
      });

      // Step 3: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for getting a pet with Invalid Pet ID
  test('Get a pet by Invalid Pet ID - BAD REQUEST', async ({ apiContext, errorSchema }) => {
    const { ownerId, petId } = petData.invalidPetID;  // Use data from JSON

    // Step 1: Make GET request for a pet by invalid pet ID
    await test.step('Send GET /owners/{ownerId}/pets/{petId} request with invalid pet ID', async () => {
      const response = await RequestUtils.getRequest(apiContext, EndPoints.PET_BY_PET_ID, { ownerId, petId });

      // Step 2: Validate the BAD REQUEST response
      await test.step('Validate the BAD REQUEST response', async () => {
        responseBody = await ResponseUtils.validateBadRequestResponse(response, 400);
      });

      // Step 3: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });

  // Test for getting a pet with Empty Owner ID
  test('Get a pet by Empty Owner ID - NOT FOUND', async ({ apiContext, errorSchema }) => {
    const { ownerId, petId } = petData.emptyOwnerID;  // Use data from JSON

    // Step 1: Make GET request for a pet by empty owner ID
    await test.step('Send GET /owners/{ownerId}/pets/{petId} request with empty owner ID', async () => {
      const response = await RequestUtils.getRequest(apiContext, EndPoints.PET_BY_PET_ID, { ownerId, petId });

      // Step 2: Validate the NOT FOUND response
      await test.step('Validate the NOT FOUND response', async () => {
        responseBody = await ResponseUtils.validateNotFoundResponse(response, 404);
      });

      // Step 3: Validate the response schema
      await test.step('Validate the response schema', async () => {
        await ResponseUtils.validateResponseBodyScehma(responseBody, errorSchema);
      });
    });
  });
});