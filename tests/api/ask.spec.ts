import { test, expect } from '../../fixtures/avi.fixtures';

test.describe('@contract @smoke AVI API - /ask', () => {
  test('responde correctamente a una consulta válida', async ({ avi }) => {
    test.setTimeout(90_000);
    const response = await avi.askApi.preguntar('wifi');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.answer).toBeTruthy();
    expect(typeof body.answer).toBe('string');
  });
});