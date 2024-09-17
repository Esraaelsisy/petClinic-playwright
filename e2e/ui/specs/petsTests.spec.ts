import {  test , expect} from "../fixtures/my-hooks"
import { PageManager } from "../pages/pageManager"
import {PetTestData} from "../data/uiTestData.json"

let pm: PageManager

test.describe('Add Pets Tests', async()=>{
  test('add a new Pet', async({page, ownersFixture})=>{
    const pm = new PageManager(page)
    await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(PetTestData.ownerName)
    await pm.onOwnerOverviewPage().gotoaddNewPetPage()
    await pm.onPetsPage().addNewPetDetails(PetTestData.name, PetTestData.type, PetTestData.birthdate)
    await expect(pm.onOwnerOverviewPage().validatePetDetailsRaw(PetTestData.ownerName,PetTestData.name, 
      PetTestData.type, PetTestData.birthdate))
})
})

