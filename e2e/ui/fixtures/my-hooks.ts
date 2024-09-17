import {test as base } from '@playwright/test'
import { PageManager } from '../pages/pageManager'

type myHooks= {
    ownersFixture: any
    registerationFixture: any
    vetsFixture: any
}
export const test = base.extend<myHooks>({
ownersFixture: async({page}, use)=>{
    const ownersFixture = undefined
    const pm = new PageManager(page)
    await page.goto('/')  
    await pm.onHomePage().header.gotoAllOwnersPage()
    await use(ownersFixture)
},
registerationFixture: async({page}, use)=>{
    const registerationFixture = undefined
    const pm = new PageManager(page)
    await page.goto('/')  
    await pm.onHomePage().header.gotoRegisterOwnersPage()
    await use(registerationFixture)
},
vetsFixture: async({page}, use)=>{
    const vetsFixture = undefined
    const pm = new PageManager(page)
    await page.goto('/')  
    await pm.onHomePage().header.gotoVetsPage()
    await use(vetsFixture)
}
}) 
export { expect } from '@playwright/test'