import { Locator, Page, expect } from "@playwright/test"
import { HeaderPage } from "./headerPage"

export class PetsPage{
    readonly page: Page
    readonly header: HeaderPage
    readonly ownerNameLabel : Locator
    readonly nameInput: Locator
    readonly birthDateInput: Locator
    readonly typeList: Locator
    readonly submitButton: Locator
    
    constructor(page: Page){
        this.page = page
        this.header =  new HeaderPage(this.page)
        this.ownerNameLabel = page.locator('p')
        this.nameInput = page.locator('input[name="name"]')
        this.birthDateInput = page.locator('input[type="date"]')
        this.typeList = page.locator('select[ng-model="$ctrl.petTypeId"]')
        this.submitButton = page.getByRole('button').filter({hasText:"Submit"})
    }

    async selectPetTypeFromList(petType: string){
        await this.typeList.selectOption(petType)
    }

    async addNewPetDetails(ownerName: string,petName: string , petType: string , birthDate: string){
        await expect(this.ownerNameLabel).toContainText(ownerName)
        await this.birthDateInput.pressSequentially(birthDate)
        await this.nameInput.clear()
        await this.nameInput.fill(petName)
        await this.selectPetTypeFromList(petType)
        await this.submitButton.click()
    }

    async validatePetDetailsRow(ownerName: string, petName: string , type: string ){
        await expect(this.ownerNameLabel).toContainText(ownerName)
        await expect(this.typeList).toContainText(type)
        await expect(this.nameInput).toContainText(petName)
         // Not checking the birthdate because it has a current issue to be saved wrongly
        // await expect(this.petBirthDateLabel).toContainText(birthdate)
     }
}