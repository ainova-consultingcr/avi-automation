import { test, expect } from '../../fixtures/avi.fixtures';
import { ChatScenarioFactory } from '../../factories/ChatScenarioFactory';

test.describe('@smoke @e2e AVI Hotel - Chat E2E', () => {
    for (const dato of ChatScenarioFactory.smoke()) {
    test(`[${dato.id}] ${dato.description}`, async ({ avi }) => {
     const respuesta = await avi.chatFlow.consultar(
  dato.question,
  {
    language: dato.language,
    roomId: dato.roomId ?? undefined,
  }
);
    
    });
  }
});