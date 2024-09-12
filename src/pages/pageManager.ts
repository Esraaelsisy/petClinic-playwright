import { Page, expect} from '@playwright/test'
import { OwnersPage } from './ownersPage'
import { OwnersOverviewPage } from './ownerOverviewPage'
import { OwnersInfoPage } from './ownerInfoPage'
import { PetsPage } from './petsPage'
import { VisitsPage } from './visitsPage'
import { VetsPage } from './vetsPage'

export class PageManager{

    private readonly page: Page
    private readonly ownersPage: OwnersPage
    private readonly ownersOverviewPage: OwnersOverviewPage
    private readonly ownersInfoPage: OwnersInfoPage
    private readonly petsPage: PetsPage
    private readonly visitsPage: VisitsPage
    private readonly vetsPage: VetsPage

    constructor(page: Page) {
        this.page = page
        this.ownersPage = new OwnersPage(this.page)
        this.ownersOverviewPage = new OwnersOverviewPage(this.page)
        this.ownersInfoPage = new OwnersInfoPage(this.page)
        this.petsPage = new PetsPage(this.page)
        this.visitsPage = new VisitsPage(this.page)
        this.vetsPage = new VetsPage(this.page)
    }
}