import {  test , expect} from "../fixtures/my-hooks"
import { PageManager } from "../pages/pageManager"
import{ OwnerTestData } from "../data/uiTestData.json"

let pm: PageManager

test.describe('Edit Owners Tests',  async() =>{
  test('edit Owner Last Name', async({page, ownersFixture})=>{ 
    const pm = new PageManager(page)
    await pm.onOwnersPage().selectAnOwnerFromListWithCriteria('Franklin')
    await pm.onOwnerOverviewPage().gotoOwnerInfoPage() 
    await pm.onOwnerInfoPage().updateOwnerfield("First Name" , OwnerTestData.firstName)
    await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText(OwnerTestData.firstName)
})
  test('edit Owner First Name', async({page, ownersFixture})=>{
    const pm = new PageManager(page)
      await pm.onOwnersPage().selectAnOwnerFromListWithCriteria('George')
      await pm.onOwnerOverviewPage().gotoOwnerInfoPage()
      await pm.onOwnerInfoPage().updateOwnerfield("Last Name" , OwnerTestData.lastName)
      await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText(OwnerTestData.lastName)
    })
})

test.describe('Register Owners Tests',  async() =>{
  test('Add a new Owner with valid data', async({page, registerationFixture})=>{ 
    const pm = new PageManager(page)
    await pm.onOwnerInfoPage().registerNewOwner(OwnerTestData.firstName, OwnerTestData.lastName, OwnerTestData.address
      , OwnerTestData.city, OwnerTestData.telephone)
    await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(OwnerTestData.firstName)
    await pm.onOwnerOverviewPage().validateOwnerDetails(OwnerTestData.firstName, OwnerTestData.lastName, 
      OwnerTestData.address, OwnerTestData.city, OwnerTestData.telephone)
})
  test('Add a new owner without First Name', async({page, registerationFixture})=>{
    const pm = new PageManager(page)
    await pm.onOwnerInfoPage().registerNewOwner("",OwnerTestData.lastName, OwnerTestData.address
      , OwnerTestData.city, OwnerTestData.telephone)
    /*await pm.onOwnersPage().selectAnOwnerFromListWithCriteria('')
    await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText("Esraa")*/
    })
})

