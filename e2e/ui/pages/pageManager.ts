import { Page, test } from '@playwright/test';
import { OwnersPage } from './ownersPage';
import { OwnerOverviewPage } from './ownerOverviewPage';
import { OwnerInfoPage } from './ownerInfoPage';
import { PetsPage } from './petsPage';
import { VisitsPage } from './visitsPage';
import { VetsPage } from './vetsPage';
import { HomePage } from './homePage';
import { HeaderPage } from './headerPage';

export class PageManager {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly headerPage: HeaderPage;
  readonly ownersPage: OwnersPage;
  readonly ownerOverviewPage: OwnerOverviewPage;
  readonly ownerInfoPage: OwnerInfoPage;
  readonly petsPage: PetsPage;
  readonly visitsPage: VisitsPage;
  readonly vetsPage: VetsPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.headerPage = new HeaderPage(this.page);
    this.ownersPage = new OwnersPage(this.page);
    this.ownerOverviewPage = new OwnerOverviewPage(this.page);
    this.ownerInfoPage = new OwnerInfoPage(this.page);
    this.petsPage = new PetsPage(this.page);
    this.visitsPage = new VisitsPage(this.page);
    this.vetsPage = new VetsPage(this.page);
  }

  onHomePage() {
    return this.homePage;
  }

  onHeaderPage() {
    return this.headerPage;
  }

  onOwnersPage() {
    return this.ownersPage;
  }

  onOwnerOverviewPage() {
    return this.ownerOverviewPage;
  }

  onOwnerInfoPage() {
    return this.ownerInfoPage;
  }

  onPetsPage() {
    return this.petsPage;
  }

  onVisitsPage() {
    return this.visitsPage;
  }

  onVetsPage() {
    return this.vetsPage;
  }

  getTodayDateinCertianFormat(){
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0') // Ensure day is two digits
    const month = String(today.getMonth() + 1).padStart(2, '0') // Ensure month is two digits (Months are 0-based)
    const year = today.getFullYear()
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
  }
}