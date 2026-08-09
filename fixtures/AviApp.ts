import { Page, APIRequestContext } from '@playwright/test';
import { ChatPage } from '../pages/ChatPage';
import { ChatFlow } from '../flows/ChatFlow';
import { AskApiService } from '../services/AskApiService';
import { ServiceRequestComponent } from '../components/ServiceRequestComponent';

export class AviApp {
  readonly chat: ChatPage;
  readonly chatFlow: ChatFlow;
  readonly askApi: AskApiService;
  readonly serviceRequest: ServiceRequestComponent;

  constructor(
    page: Page,
    request: APIRequestContext
  ) {
    this.chat = new ChatPage(page);
    this.chatFlow = new ChatFlow(this.chat);
    this.askApi = new AskApiService(request);
    this.serviceRequest = new ServiceRequestComponent(page);
  }
}