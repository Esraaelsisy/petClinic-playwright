import {  test , expect} from "../fixtures/my-hooks"
import { PageManager } from "../pages/pageManager"
import{ OwnerTestData , NewOwnerTestData } from "../data/uiTestData.json"

let pm: PageManager

test.describe('Register Owners Tests',  async() =>{
  test('Add a new Owner with valid data', async({page, registerationFixture})=>{ 
    const pm = new PageManager(page)
    await pm.onOwnerInfoPage().registerNewOwner(NewOwnerTestData.firstName, NewOwnerTestData.lastName, NewOwnerTestData.address
      , NewOwnerTestData.city, NewOwnerTestData.telephone)
    await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(NewOwnerTestData.firstName)
    await pm.onOwnerOverviewPage().validateOwnerDetails(NewOwnerTestData.firstName, NewOwnerTestData.lastName, NewOwnerTestData.address
      , NewOwnerTestData.city, NewOwnerTestData.telephone)
})
  test('Add a new owner without First Name', async({page, registerationFixture})=>{
    const pm = new PageManager(page)
    await pm.onOwnerInfoPage().registerNewOwner("", NewOwnerTestData.lastName, NewOwnerTestData.address
      , NewOwnerTestData.city, NewOwnerTestData.telephone)
    //await expect(pm.onOwnerInfoPage().)  
    })
})

test.describe('Edit Owners Tests',  async() =>{
  test('edit Owner First Name', async({page, ownersFixture})=>{ 
    const pm = new PageManager(page)
    await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(OwnerTestData.firstName)
    await pm.onOwnerOverviewPage().gotoOwnerInfoPage() 
    await pm.onOwnerInfoPage().updateOwnerfield("First Name" , OwnerTestData.new_firstName,OwnerTestData.firstName )
    await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText(OwnerTestData.new_firstName)
    //Returning the Owner to his old firstName to keep the correct data
    await pm.onOwnerOverviewPage().gotoOwnerInfoPage() 
    await pm.onOwnerInfoPage().updateOwnerfield("First Name" , OwnerTestData.firstName,OwnerTestData.new_firstName )
    await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText(OwnerTestData.firstName)
})
  test('edit Owner Last Name', async({page, ownersFixture})=>{
    const pm = new PageManager(page)
      await pm.onOwnersPage().selectAnOwnerFromListWithCriteria(OwnerTestData.lastName)
      await pm.onOwnerOverviewPage().gotoOwnerInfoPage()
      await pm.onOwnerInfoPage().updateOwnerfield("Last Name" , OwnerTestData.new_lastName, OwnerTestData.lastName)
      await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText(OwnerTestData.new_lastName)
      //Returning the Owner to his old lastName to keep the correct data
      await pm.onOwnerOverviewPage().gotoOwnerInfoPage()
      await pm.onOwnerInfoPage().updateOwnerfield("Last Name" , OwnerTestData.lastName, OwnerTestData.new_lastName)
      await expect(pm.onOwnerOverviewPage().ownerNameText).toContainText(OwnerTestData.lastName)
    })
})

