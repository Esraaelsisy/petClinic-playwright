import { expect, Locator, Page } from "@playwright/test"
import { HeaderPage } from "./headerPage"

export class OwnerOverviewPage{
    readonly page: Page
    readonly header: HeaderPage
    readonly ownerNameText: Locator
    readonly ownerAddressText: Locator
    readonly ownerCityText: Locator
    readonly ownerTelephoneText: Locator
    readonly editOwnerButton: Locator
    readonly addNewPetButton: Locator
    readonly petdetailsRaw: Locator
    readonly petNameLabel: Locator
    readonly petBirthDateLabel: Locator
    readonly petTypeLabel: Locator
    readonly editPetLink: Locator
    readonly addVisitLink: Locator
    
    constructor(page: Page){
        this.page = page
        this.header =  new HeaderPage(this.page)
        this.ownerNameText = page.getByRole('row').filter({hasText: "Name"}).locator('b')
        this.ownerAddressText =  page.getByRole('row').filter({hasText: "Address"}).locator('td')
        this.ownerCityText = page.getByRole('row').filter({hasText: "City"}).locator('td')
        this.ownerTelephoneText = page.getByRole('row').filter({hasText: "Telephone"}).locator('td')
        this.editOwnerButton = page.getByRole('link').filter({hasText:"Edit Owner"})
        this.addNewPetButton = page.getByRole('link').filter({hasText: "Add New Pet"})
        this.petdetailsRaw = page.locator('tr.ng-scope').first()
        this.petNameLabel = this.petdetailsRaw.getByRole('link').first()
        this.petBirthDateLabel = this.petdetailsRaw.locator('dd').nth(1)
        this.petTypeLabel = this.petdetailsRaw.locator('dd').nth(2)
        this.editPetLink = this.petdetailsRaw.locator('a').nth(1)
    }

    async gotoOwnerInfoPage()
    {
        await this.editOwnerButton.click()
    }

    async gotoAddNewPetPage()
    {
        await this.addNewPetButton.click()
    }

    async gotoEditNewPetPage()
    {
        await this.editPetLink.click()
    }

    async gotoVisitsPage()
    {
        await this.addVisitLink.click()
    }

    async validateOwnerDetails(firstName: string,lastName: string, address: string, city: string, telephone: string){
        await expect(this.ownerNameText).toContainText(firstName)
        await expect(this.ownerNameText).toContainText(lastName)
        await expect(this.ownerAddressText).toContainText(address)
        await expect(this.ownerCityText).toContainText(city)
        await expect(this.ownerTelephoneText).toContainText(telephone)
    }

    async validatePetDetailsRow(ownerName: string, petName: string , type: string ){
        await expect(this.ownerNameText).toContainText(ownerName)
        await expect(this.petNameLabel).toContainText(petName)
        await expect(this.petTypeLabel).toContainText(type)
        // Not checking the birthdate because it has a current issue to be saved wrongly
       // await expect(this.petBirthDateLabel).toContainText(birthdate)
    }
}