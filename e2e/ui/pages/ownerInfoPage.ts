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
    

    async updateOwnerfield(field: string, value: string, oldvalue: string) {
    
        let inputElement;
        // Determine the input element based on the field name
        switch (field) {
            case "First Name":
                inputElement = this.firstNameInput;
                break
            case "Last Name":
                inputElement = this.lastNameInput;
                break
            case "Address":
                inputElement = this.addressInput;
                break
            case "City":
                inputElement = this.cityInput;
                break
            case "Telephone":
                inputElement = this.telephoneInput
                break
            default:
                throw new Error('Unknown field: '+field)
        }
        // Wait for the entire page to be fully loaded
        await this.page.waitForTimeout(5000); 

        // Clear the field and fill with the new value
        await inputElement.fill(value);
    
        // Click the submit button
        await this.submitButton.click();
    }   
}