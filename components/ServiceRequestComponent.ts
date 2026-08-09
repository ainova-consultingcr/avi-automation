import { expect, Locator, Page } from '@playwright/test';

export class ServiceRequestComponent {
  readonly card: Locator;
  readonly title: Locator;
  readonly description: Locator;
  readonly status: Locator;
  readonly actions: Locator;

  constructor(private readonly page: Page) {
    this.card = page.locator('#serviceRequestCard');
    this.title = page.locator('#serviceRequestTitle');
    this.description = page.locator('#serviceRequestDescription');
    this.status = page.locator('#serviceRequestStatus');
    this.actions = page.locator('#serviceRequestActions');
  }

  async esperarVisible(): Promise<void> {
    await expect(this.card).toBeVisible();
  }

  async obtenerTitulo(): Promise<string> {
    return (await this.title.innerText()).trim();
  }

  async obtenerDescripcion(): Promise<string> {
    return (await this.description.innerText()).trim();
  }

  async obtenerEstado(): Promise<string> {
    return (await this.status.innerText()).trim();
  }
}