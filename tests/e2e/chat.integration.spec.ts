import { test, expect } from '../../fixtures/avi.fixtures';

test.describe('@integration @e2e AVI Chat Integration', () => {
  test(
    '[room-context] envía la habitación al backend',
    async ({ avi }) => {
      const result =
        await avi.chatFlow.consultarConDetalle(
          'Necesito una toalla extra',
          {
            language: 'es',
            roomId: '101',
          }
        );
console.log(
  await result.apiResponse.json()
);

console.log(
  result.visibleResponse
);
      expect(result.apiResponse.status()).toBe(200);

      const requestBody =
        result.apiResponse.request().postDataJSON();

      expect(requestBody.room_id).toBe('101');

    
expect(
  (await avi.serviceRequest.obtenerDescripcion()).toLowerCase()
).toContain('toalla');

expect(
  await avi.serviceRequest.obtenerEstado()
).toBe('Pendiente');
    }
  );
});