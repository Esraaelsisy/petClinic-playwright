import { test, expect } from "../fixtures/my-hooks"
import { PageManager } from "../pages/pageManager"
import { OwnerTestData, NewOwnerTestData } from "../data/uiTestData.json"

let pm: PageManager

// Describes the test suite for registering new owners
test.describe('Register Owners Tests', async () => {

  // Test to add a new owner with valid data
  test('Add a new Owner with valid data', async ({ page, registerationFixture }) => {
    const pm = new PageManager(page)

    await test.step('Register a new owner with valid data', async () => {
      // Register a new owner using valid data from NewOwnerTestData
      await pm.onOwnerInfoPage().registerNewOwner(
        NewOwnerTestData.firstName,
        NewOwnerTestData.lastName,
        NewOwnerTestData.address,
        NewOwnerTestData.city,
        NewOwnerTestData.telephone
      )
    })

    await test.step('Select the newly created owner from the list', async () => {
      // Select the newly created owner from the list based on first name
      await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(NewOwnerTestData.firstName)
    })

    await test.step('Validate owner details after registration', async () => {
      // Validate that the owner details match the data entered
      await pm.onOwnerOverviewPage().validateOwnerDetails(
        NewOwnerTestData.firstName,
        NewOwnerTestData.lastName,
        NewOwnerTestData.address,
        NewOwnerTestData.city,
        NewOwnerTestData.telephone
      )
    })
  })

  // Test to add a new owner without providing the First Name
  test('Add a new owner without First Name', async ({ page, registerationFixture }) => {
    const pm = new PageManager(page)

    await test.step('Attempt to register a new owner without a first name', async () => {
      // Attempt to register a new owner without the first name
      await pm.onOwnerInfoPage().registerNewOwner(
        "", // Empty first name to test validation
        NewOwnerTestData.lastName,
        NewOwnerTestData.address,
        NewOwnerTestData.city,
        NewOwnerTestData.telephone
      )
    })

    // Add a step to validate the error message (if required)
    await test.step('Validate error message for missing first name', async () => {
      await expect(pm.onOwnerInfoPage().firstNameInput).toHaveAttribute('required', '');
    })
  })
})

// Describes the test suite for editing owner details
test.describe('Edit Owners Tests', async () => {

  // Test to edit the first name of an existing owner
  test('edit Owner First Name', async ({ page, ownersFixture }) => {
    const pm = new PageManager(page)

    await test.step('Select the owner by first name', async () => {
      // Select the owner based on the current first name from OwnerTestData
      await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(OwnerTestData.firstName)
    })

    await test.step('Navigate to the Owner Info page', async () => {
      // Navigate to the Owner Info page to edit the owner's details
      await pm.onOwnerOverviewPage().gotoOwnerInfoPage()
    })

    await test.step('Update the first name of the owner', async () => {
      // Update the first name field with the new name from OwnerTestData
      await pm.onOwnerInfoPage().updateOwnerfield("First Name", OwnerTestData.new_firstName, OwnerTestData.firstName)
    })

    await test.step('Validate the new first name is displayed', async () => {
      // Validate that the new first name is correctly displayed
      await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText(OwnerTestData.new_firstName)
    })

    await test.step('Revert the first name to the original name', async () => {
      // Revert the first name to its original value to maintain data integrity
      await pm.onOwnerOverviewPage().gotoOwnerInfoPage()
      await pm.onOwnerInfoPage().updateOwnerfield("First Name", OwnerTestData.firstName, OwnerTestData.new_firstName)
      await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText(OwnerTestData.firstName)
    })
  })

  // Test to edit the last name of an existing owner
  test('edit Owner Last Name', async ({ page, ownersFixture }) => {
    const pm = new PageManager(page)

    await test.step('Select the owner by last name', async () => {
      // Select the owner based on the current last name from OwnerTestData
      await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(OwnerTestData.lastName)
    })

    await test.step('Navigate to the Owner Info page', async () => {
      // Navigate to the Owner Info page to edit the owner's details
      await pm.onOwnerOverviewPage().gotoOwnerInfoPage()
    })

    await test.step('Update the last name of the owner', async () => {
      // Update the last name field with the new name from OwnerTestData
      await pm.onOwnerInfoPage().updateOwnerfield("Last Name", OwnerTestData.new_lastName, OwnerTestData.lastName)
    })

    await test.step('Validate the new last name is displayed', async () => {
      // Validate that the new last name is correctly displayed
      await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText(OwnerTestData.new_lastName)
    })

    await test.step('Revert the last name to the original name', async () => {
      // Revert the last name to its original value to maintain data integrity
      await pm.onOwnerOverviewPage().gotoOwnerInfoPage()
      await pm.onOwnerInfoPage().updateOwnerfield("Last Name", OwnerTestData.lastName, OwnerTestData.new_lastName)
      await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText(OwnerTestData.lastName)
    })
  })
})