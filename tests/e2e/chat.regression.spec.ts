import { test, expect } from '../../fixtures/avi.fixtures';
import { ChatScenarioFactory } from '../../factories/ChatScenarioFactory';

test.describe('@regression @e2e AVI Hotel - Chat Regression', () => {
  const scenarios = ChatScenarioFactory.regression()
    .filter(scenario => scenario.expected !== undefined);

  for (const dato of scenarios) {
    test(
      `[${dato.id}] ${dato.description}`,
      async ({ avi }) => {
       const respuesta = await avi.chatFlow.consultar(
    dato.question,
    {
    language: dato.language,
    roomId: dato.roomId ?? undefined,
   }
  );
      }
    );
  }
});