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
    readonly petdetailsRow: Locator
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
        this.petdetailsRow =  page.locator('table.table.table-striped').nth(1).locator('tr').first()
        this.petNameLabel= this.petdetailsRow.getByRole('link').first()
        this.petBirthDateLabel = this.petdetailsRow.locator('dd').nth(1)
        this.petTypeLabel = this.petdetailsRow.locator('dd').nth(2)
        this.editPetLink = this.petdetailsRow.locator('a').nth(1)
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
}