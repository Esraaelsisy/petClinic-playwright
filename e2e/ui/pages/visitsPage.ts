import { Locator, Page, expect } from "@playwright/test"
import { HeaderPage } from "./headerPage"

export class VisitsPage{
    readonly page: Page
    readonly header: HeaderPage
    readonly descriptionInput: Locator
    readonly dateInput: Locator
    readonly addNewVisitButton: Locator
    readonly visitDetailsRow: Locator
    readonly visitDescriptionText: Locator
    readonly visitDateText: Locator

    constructor(page: Page){
        this.page = page
        this.header =  new HeaderPage(this.page)
        this.descriptionInput = page.locator('textarea[ng-model="$ctrl.desc"]')
        this.dateInput = page.locator('input[type="date"]')
        this.addNewVisitButton = page.getByRole('button').filter({hasText: "Add New Visit"})
        this.visitDescriptionText = page.getByRole("table").getByRole("row").first().getByRole("cell").nth(1)
        this.visitDateText = page.getByRole("table").getByRole("row").first().getByRole("cell").first()
    }

    async addNewVisitDetails(description: string, date: string){
        await this.descriptionInput.fill(description)
        await this.dateInput.pressSequentially(date)
        await this.addNewVisitButton.click()
    }

    async validateVisitDetailsRow(visitDescripton: string){
        await expect(this.visitDescriptionText).toContainText(visitDescripton)
    }
}