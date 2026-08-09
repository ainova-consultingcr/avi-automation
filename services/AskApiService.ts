import { APIRequestContext } from '@playwright/test';
import { appConfig } from '../config/AppConfig';

export class AskApiService {
  constructor(
    private readonly request: APIRequestContext
  ) {}

  async preguntar(
    question: string,
    roomId: string | null = null
  ) {
    const response = await this.request.post('/ask', {
      data: {
        property_id: appConfig.propertyId,
        question,
        language: appConfig.defaultLanguage,
        conversation_context: {},
        room_id: roomId,
        guest_session_id: 'automation-test-session',
      },
    });

    return response;
  }
}