import { test , expect} from "../fixtures/my-hooks"
import { PageManager } from "../pages/pageManager"
import {VisitsTestData} from "../data/uiTestData.json"

let pm: PageManager

test.describe('Add Pet Visits Tests', async()=> {
  test('add Pet Visit with valid data', async({page , ownersFixture})=>{
  const pm = new PageManager(page)
  await pm.onOwnersPage().selectAnOwnerFromListWithCriteria('George')
  await pm.onOwnerOverviewPage().gotoVisitsPage()
  await pm.onVisitsPage().addNewVisitDetails('new visit for today')
  await pm.onOwnerOverviewPage().gotoVisitsPage()
//  await expect(pm.onVisitsPage().
})
})

