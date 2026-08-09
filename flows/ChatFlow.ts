import { ChatPage } from '../pages/ChatPage';
import { OpenOptions } from '../config/OpenOptions';
import { Response } from '@playwright/test';

export interface ChatFlowResult {
  visibleResponse: string;
  apiResponse: Response;
}

export class ChatFlow {
  constructor(
    private readonly chatPage: ChatPage
  ) {}

  async consultar(
    pregunta: string,
    options: OpenOptions = {}
  ): Promise<string> {
    try {
      await this.chatPage.abrir(options);
      await this.chatPage.preguntar(pregunta);

      const respuesta =
        await this.chatPage.obtenerUltimaRespuesta();

      if (!respuesta) {
        throw new Error(
          `AVI returned an empty response for question: "${pregunta}"`
        );
      }

      return respuesta;
    } catch (error) {
      try {
        await this.chatPage.tomarCaptura(
          `chat-flow-error-${Date.now()}`
        );
      } catch {
        // La página puede haberse cerrado por timeout.
        throw error;
      }

      throw error;
    }
  }
 async consultarConDetalle(
  pregunta: string,
  options: OpenOptions = {}
): Promise<ChatFlowResult> {
  await this.chatPage.abrir(options);

  const apiResponse =
    await this.chatPage.preguntar(pregunta);

  const body = await apiResponse.json();

  if (!body.answer) {
    throw new Error(
      `POST /ask returned no answer for question: "${pregunta}"`
    );
  }

  // Las solicitudes de servicio se renderizan
  // en ServiceRequestComponent, no en #responseText.
  if (body.service_request) {
    return {
      visibleResponse: '',
      apiResponse,
    };
  }

  // FAQs y respuestas normales sí se renderizan
  // dentro de #responseText.
  await this.chatPage.esperarRespuestaTexto(
    body.answer
  );

  const visibleResponse =
    await this.chatPage.obtenerUltimaRespuesta();

  return {
    visibleResponse,
    apiResponse,
  };
}
}