import { test, expect } from "../fixtures/my-hooks"
import { PageManager } from "../pages/pageManager"
import { PetTestData } from "../data/uiTestData.json"

let pm: PageManager

// Describes the test suite for adding new pets
test.describe('Add Pets Tests', async () => {

  // Test to add a new pet for an existing owner
  test('add a new Pet', async ({ page, ownersFixture }) => {
    const pm = new PageManager(page)

    await test.step('Select an owner from the list based on criteria', async () => {
      // Select the owner from the list using the owner name from PetTestData
      await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(PetTestData.ownerName)
    })

    await test.step('Navigate to the Add New Pet page', async () => {
      // Navigate to the Add New Pet page
      await pm.onOwnerOverviewPage().gotoAddNewPetPage()
    })

    await test.step('Add new pet details', async () => {
      // Add new pet details using PetTestData (name, type, birthdate)
      await pm.onPetsPage().addNewPetDetails(PetTestData.ownerName,PetTestData.name, PetTestData.type, pm.getTodayDateinCertianFormat())
    })

    await test.step('Validate the pet details after addition', async () => {
      // Validate the pet details on the Owner Overview page
      await expect(pm.onOwnerOverviewPage().validatePetDetailsRow(
        PetTestData.ownerName,
        PetTestData.name,
        PetTestData.type
      ))
    })
  })
})

// Describes the test suite for editing new pets
test.describe('Edit Pets Tests', async () => {

  // Test to add a new pet for an existing owner
  test('edit a Pet', async ({ page, ownersFixture }) => {
    const pm = new PageManager(page)

    await test.step('Select an owner from the list based on criteria', async () => {
      // Select the owner from the list using the owner name from PetTestData
      await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(PetTestData.ownerName)
    })

    await test.step('Navigate to the Add New Pet page', async () => {
      // Navigate to the Add New Pet page
      await pm.onOwnerOverviewPage().gotoEditNewPetPage()
    })

    await test.step('Add new pet details', async () => {
      // Add new pet details using PetTestData (name, type, birthdate)
      await pm.onPetsPage().addNewPetDetails(PetTestData.ownerName,PetTestData.name, PetTestData.type, pm.getTodayDateinCertianFormat())
    })

    await test.step('Validate the pet details after addition', async () => {
      // Validate the pet details on the Owner Overview page
      await expect(pm.onOwnerOverviewPage().validatePetDetailsRow(
        PetTestData.ownerName,
        PetTestData.name,
        PetTestData.type
      ))
    })
  })
})

