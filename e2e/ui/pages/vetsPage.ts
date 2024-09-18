import { Page } from "@playwright/test"
import { HeaderPage } from "./headerPage"

export class VetsPage{
    readonly page: Page
    readonly header: HeaderPage
    
    constructor(page: Page){
        this.page = page
        this.header =  new HeaderPage(this.page)

    }
}