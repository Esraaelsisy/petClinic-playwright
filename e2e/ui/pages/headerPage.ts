import { Locator, Page } from "@playwright/test"

export class HeaderPage{

    readonly page: Page
    
    constructor(page: Page){
        this.page = page
    }

    async gotoHomePage(){
       await this.page.getByText('Home').click()
    }

    async gotoAllOwnersPage(){
       await this.page.getByText('Owners').click()
       await this.page.getByText(' All').click()
    }

    async gotoRegisterOwnersPage(){
        await this.page.getByText('Owners').click()
        await this.page.getByText(' Register').click()
    }

    async gotoVetsPage(){
        await this.page.getByText('Veterinarians').click()
    }
}