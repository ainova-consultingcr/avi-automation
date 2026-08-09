import { Page, expect } from '@playwright/test';
import { OpenOptions } from '../config/OpenOptions';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async abrir(options: OpenOptions = {}): Promise<void> {
    const params = new URLSearchParams();

    if (options.language) {
      params.set('lang', options.language);
    }

    if (options.roomId) {
      params.set('room', options.roomId);
    }

    if (options.propertyId) {
      params.set('property', options.propertyId);
    }

    const query = params.toString();

   await this.page.goto(
  query ? `?${query}` : './'
);
  }

  async validarTitulo(titulo: RegExp | string): Promise<void> {
    await expect(this.page).toHaveTitle(titulo);
  }

  async tomarCaptura(nombre: string): Promise<void> {
    await this.page.screenshot({
      path: `test-results/${nombre}.png`,
      fullPage: true,
    });
  }
}