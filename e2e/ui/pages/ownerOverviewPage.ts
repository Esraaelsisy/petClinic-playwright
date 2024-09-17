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
        this.addNewPetButton = page.getByRole('link').filter({hasText: "Add New Pe"})
        this.petdetailsRaw = page.locator('tr[ng-repeat="pet in $ctrl.owner.pets track by pet.id"]')
        //this.petNameLabel = page.locator('a[ui-sref="petEdit({ownerId: $ctrl.owner.id, petId: pet.id})"]').last()
        //this.petNameLabel = page.locator('tr').filter({hasText: "Type"}).last().locator('a')
        //this.petNameLabel = page.getByText('Name').last()
        //this.petNameLabel = page.locator('.//tr[contains(@ng-repeat, "owner.pets")]').locator('a').last()
        //this.petNameLabel = page.locator('a[class="ng-binding"]')
        this.petBirthDateLabel = page.getByRole('row').last().locator('a[class="ng-binding"]')
        this.petTypeLabel = page.locator('tr[contains(@ng-repeat, "$ctrl.owner.pets")]').locator('dd').nth(3)   
    }

    async gotoOwnerInfoPage()
    {
        await this.editOwnerButton.click()
    }

    async gotoaddNewPetPage()
    {
        await expect(this.ownerNameText).toContainText("George")
        await this.addNewPetButton.click()
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

    async validatePetDetailsRaw(ownerName: string, petName: string , type: string , birthdate: string){
        await expect(this.ownerNameText).toContainText(ownerName)
        await expect(this.petNameLabel).toContainText(petName)
        await expect(this.petTypeLabel).toContainText(type)
        await expect(this.petBirthDateLabel).toContainText(birthdate)
    }    
}