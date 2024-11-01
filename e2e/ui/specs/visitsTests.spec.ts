import { test } from "../fixtures/my-hooks"
import { PageManager } from "../pages/pageManager"
import { VisitsTestData } from "../data/uiTestData.json"

let pm: PageManager

// Describes the test suite for adding pet visits
test.describe('Add Pet Visits Tests', async () => {

  // Test to add a new visit for a pet with valid data
  test('add Pet Visit with valid data @happy', async ({ page, ownersFixture }) => {
    const pm = new PageManager(page)

    await test.step('Select an owner from the list', async () => {
      // Select the owner from the list using a hardcoded name ('George' in this case)
      await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(VisitsTestData.ownerName)
    })

    await test.step('Navigate to the Visits page', async () => {
      // Navigate to the Visits page
      await pm.onOwnerOverviewPage().gotoVisitsPageWithPetName(VisitsTestData.petName)
    })

    await test.step('Add new visit details for the pet', async () => {
      // Add new visit details using a description from VisitsTestData
      await pm.onVisitsPage().addNewVisitDetails(VisitsTestData.description, VisitsTestData.date)
    })

    await test.step('Verify the visit details by navigating to the Visits page', async () => {
      // Navigate back to the Visits page to verify the new visit was added correctly
      await pm.onOwnerOverviewPage().gotoVisitsPageWithPetName(VisitsTestData.petName)

      // Add the appropriate expectation here to validate the visit details
     await pm.onVisitsPage().validateVisitDetailsRow(VisitsTestData.description)
    })
  })
})