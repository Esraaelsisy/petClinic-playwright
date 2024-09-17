import { Locator, Page , expect } from "@playwright/test"
import { HeaderPage } from "./headerPage"

export class OwnerInfoPage{

    readonly page: Page
    readonly header: HeaderPage
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly addressInput: Locator
    readonly cityInput: Locator
    readonly telephoneInput: Locator
    readonly submitButton: Locator

    constructor(page: Page){
        this.page = page
        this.header =  new HeaderPage(this.page)
        this.firstNameInput = page.locator('input[name="firstName"]')
        this.lastNameInput = page.locator('input[name="lastName"]')
        this.addressInput = page.locator('input[name="address"]')
        this.cityInput = page.locator('input[name="city"]')
        this.telephoneInput = page.locator('input[name="telephone"]')
        this.submitButton = page.getByRole('button').filter({hasText:"Submit"})
    }

    async registerNewOwner(firstName: string,lastName: string, address: string, city: string, telephone: string){
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.addressInput.fill(address)
        await this.cityInput.fill(city)
        await this.telephoneInput.fill(telephone)
        await this.submitButton.click()
    }
    

    async updateOwnerfield(field:string, value: string){
        if(field == "First Name") await this.firstNameInput.fill(value)
        else if(field == "Last Name") await this.lastNameInput.fill(value)
        else if(field == "Address") await this.addressInput.fill(value)
        else if(field == "City") await this.cityInput.fill(value)
        else if(field == "Telephone")await this.telephoneInput.fill(value)
        await this.submitButton.click()
    }

    async updateOwnerFirstName(firstName: string){
        await this.firstNameInput.clear()
        await this.firstNameInput.fill(firstName)
        await this.submitButton.click()
    }




   
}