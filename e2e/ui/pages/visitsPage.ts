import { Locator, Page } from "@playwright/test"
import { HeaderPage } from "./headerPage"

export class VisitsPage{

    readonly page: Page
    readonly header: HeaderPage
    readonly descriptionInput: Locator
    readonly addNewVisitButton: Locator
    
    constructor(page: Page){
        this.page = page
        this.header =  new HeaderPage(this.page)
        this.descriptionInput = page.locator('textarea[ng-model="$ctrl.desc"]')
        this.addNewVisitButton = page.getByRole('button').filter({hasText: "Add New Visit"})
    }

    async addNewVisitDetails(description: string){
        await this.descriptionInput.fill(description)
        await this.addNewVisitButton.click()

    }
}