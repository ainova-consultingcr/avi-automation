import {
  Page,
  Locator,
  Response,
  expect,
} from '@playwright/test';
import { BasePage } from './BasePage';

export class ChatPage extends BasePage {
  //readonly page: Page;
  readonly questionInput: Locator;
  readonly sendButton: Locator;
  readonly responseText: Locator;

  constructor(page: Page) {
    //this.page = page;
    super(page);
    this.questionInput = page.locator('#questionInput');
    this.sendButton = page.locator('#sendBtn');
    this.responseText = page.locator('#responseText');
  }

 async preguntar(texto: string): Promise<Response> {
  const responsePromise = this.page.waitForResponse(
    response =>
      response.url().includes('/ask') &&
      response.request().method() === 'POST'
  );

  await this.questionInput.fill(texto);
  await this.sendButton.click();

  const response = await responsePromise;

  if (!response.ok()) {
    throw new Error(
      `POST /ask failed with status ${response.status()}`
    );
  }

  return response;
}
async esperarRespuestaTexto(texto: string): Promise<void> {
  await expect(this.responseText).toHaveText(texto);
}

async obtenerRespuestaActualizada(
  textoAnterior: string
): Promise<string> {
  await this.page.waitForFunction(
    ({ selector, previous }) => {
      const element = document.querySelector(selector);

      if (!element) {
        return false;
      }

      const current =
        element.textContent?.trim() ?? '';

      return current !== '' && current !== previous;
    },
    {
      selector: '#responseText',
      previous: textoAnterior,
    }
  );

  return (await this.responseText.innerText()).trim();
}
async obtenerRespuestaActual(): Promise<string> {
  return (await this.responseText.innerText()).trim();
}

  /*async validarRespuestaVisible(texto: string) {
    await expect(this.page.getByText(texto, { exact: true })).toBeVisible();
  }*/
 async esperarRespuesta() {
  await this.responseText.waitFor({
    state: 'visible'
  });
}

async obtenerUltimaRespuesta(): Promise<string> {
  await this.esperarRespuesta();

  return (await this.responseText.innerText()).trim();
}
}