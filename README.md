# AVI Automation Framework

Framework de automatización desarrollado con **Playwright + TypeScript** para validar AVI, una aplicación SaaS modular con múltiples experiencias de negocio.

El framework cubre pruebas **E2E, API e Integration**, soporta múltiples ambientes y ejecuta pruebas automáticamente mediante **GitHub Actions**.

---

## Objetivos

- Proteger funcionalidades críticas de AVI frente a regresiones.
- Ejecutar pruebas contra ambientes Local y Production.
- Separar responsabilidades mediante una arquitectura mantenible.
- Permitir crecimiento hacia nuevos dominios de negocio.
- Generar evidencia automática ante fallos.
- Integrar automatización dentro del pipeline CI/CD.

---

## Tech Stack

- TypeScript
- Playwright
- Node.js
- GitHub Actions
- GitHub Pages
- Render
- FastAPI

---

## Arquitectura

```text
                    Tests
                      |
             +--------+--------+
             |                 |
           E2E/API         Integration
             |                 |
             +--------+--------+
                      |
                    AviApp
                      |
       +--------------+--------------+
       |              |              |
     Flows         Services      Components
       |              |              |
     Pages            API             UI
       |
   Playwright
```

### Estructura

```text
avi-automation/
|
├── components/
│   └── ServiceRequestComponent.ts
|
├── config/
│   ├── AppConfig.ts
│   ├── OpenOptions.ts
│   └── environments/
│       ├── local.ts
│       └── production.ts
|
├── data/
│   └── chatCoverage.ts
|
├── factories/
│   └── ChatScenarioFactory.ts
|
├── fixtures/
│   ├── AviApp.ts
│   └── avi.fixture.ts
|
├── flows/
│   └── ChatFlow.ts
|
├── pages/
│   ├── BasePage.ts
│   └── ChatPage.ts
|
├── services/
│   └── AskApiService.ts
|
├── tests/
│   ├── api/
│   └── e2e/
|
├── .github/workflows/
│   └── playwright.yml
|
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Principios de diseño

### Page Objects

Encapsulan interacción técnica con la interfaz:

```ts
await chatPage.preguntar('wifi');
```

Los Page Objects conocen selectores y acciones de UI, pero no procesos de negocio.

### Business Flows

Representan casos de uso:

```ts
const respuesta =
  await avi.chatFlow.consultar('wifi');
```

Los tests expresan intención de negocio y delegan los detalles al Flow.

### Services

Encapsulan comunicación con APIs:

```ts
const response =
  await avi.askApi.preguntar('wifi');
```

Esto evita duplicar contratos HTTP dentro de los tests.

### Components

Representan elementos funcionales independientes de la UI.

Ejemplo:

```ts
await avi.serviceRequest.esperarVisible();

expect(
  await avi.serviceRequest.obtenerEstado()
).toBe('Pendiente');
```

### Factories

Centralizan la creación y selección de escenarios:

```ts
ChatScenarioFactory.smoke();
ChatScenarioFactory.regression();
```

### Context Objects

AVI puede recibir contexto mediante URL:

```ts
await avi.chatFlow.consultar(
  'Necesito una toalla extra',
  {
    language: 'es',
    roomId: '101'
  }
);
```

Esto evita firmas con múltiples parámetros independientes.

---

## Estrategia de Testing

El framework clasifica escenarios mediante tags.

### Smoke

Validaciones críticas ejecutadas frecuentemente:

```bash
npm run test:smoke
```

### Regression

Cobertura funcional más amplia:

```bash
npm run test:regression
```

### API

Pruebas directas contra el backend:

```bash
npm run test:api
```

### Integration

Validaciones de comunicación entre frontend y backend:

```bash
npm run test:integration
```

---

## Multi-Environment

El mismo framework puede ejecutarse sin modificar los tests contra diferentes ambientes.

### Local

```text
Frontend → http://localhost:5500
Backend  → http://localhost:8000
```

### Production

```text
Frontend → GitHub Pages
Backend  → Render
```

La selección se realiza mediante:

```text
TEST_ENV
```

Ejemplo en Windows CMD:

```cmd
set TEST_ENV=production
npx playwright test --project=chromium --grep "@smoke"
```

---

## Evidencia automática

Cuando un test falla, Playwright conserva:

- Screenshot
- Video
- Trace
- Error context
- HTML Report
- JUnit Report

Esto permite investigar fallos sin necesidad de reproducirlos inmediatamente.

---

## CI/CD

GitHub Actions ejecuta automáticamente:

```text
Push / Pull Request
        |
        v
Install Dependencies
        |
        v
TypeScript Typecheck
        |
        v
API Tests
        |
        v
Production Smoke Tests
        |
        v
Playwright Report
```

El pipeline utiliza:

```text
TEST_ENV=production
```

para validar AVI desplegado en GitHub Pages y Render.

---

## Ejemplos

### E2E

```ts
const respuesta =
  await avi.chatFlow.consultar('wifi');

expect(
  respuesta.toLowerCase()
).toContain('wifi');
```

### API

```ts
const response =
  await avi.askApi.preguntar('wifi');

expect(response.status()).toBe(200);
```

### Integration

```ts
const result =
  await avi.chatFlow.consultarConDetalle(
    'Necesito una toalla extra',
    {
      roomId: '101',
      language: 'es'
    }
  );

expect(
  result.apiResponse.request()
    .postDataJSON()
    .room_id
).toBe('101');

await avi.serviceRequest.esperarVisible();
```

---

## Roadmap

- [x] Page Object Model
- [x] BasePage
- [x] Fixtures personalizadas
- [x] AviApp facade
- [x] Business Flows
- [x] API Services
- [x] Data Factories
- [x] Context Objects
- [x] Components
- [x] Smoke Testing
- [x] Regression Testing
- [x] API Testing
- [x] Integration Testing
- [x] Multi-environment
- [x] HTML / JUnit reporting
- [x] Screenshots / Video / Trace
- [x] GitHub Actions
- [x] Production smoke tests
- [ ] Service Requests full regression
- [ ] Reservations
- [ ] Farmasi
- [ ] Work Orders
- [ ] Prefacturación

---

## Estado

El framework está siendo utilizado para proteger funcionalidades reales de AVI durante su desarrollo y despliegue.

La arquitectura está diseñada para crecer mediante nuevos Pages, Flows, Services, Components y Factories sin modificar la estructura central del framework.