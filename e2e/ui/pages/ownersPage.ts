import { Locator, Page } from "@playwright/test"
import { HeaderPage } from "./headerPage"

export class OwnersPage{

    readonly page: Page
    readonly header: HeaderPage
    readonly searchTextBox: Locator 
    readonly ownersList: Locator
    
    constructor(page: Page){
        this.page = page
        this.header =  new HeaderPage(this.page)
        this.searchTextBox = page.getByPlaceholder('Search Filter')
    }

    async searchForAnOwner(searchWord: string){
        await this.searchTextBox.fill(searchWord) 
    }

    async selectAnOwnerFromListWithCriteria(searchWord: string){
        await this.searchForAnOwner(searchWord)
        await this.page.locator('a:has-text("'+searchWord+'")').first().click()
    }

}