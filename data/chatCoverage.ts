export type TestLevel =
  | 'smoke'
  | 'regression'
  | 'contract'
  | 'integration'
  | 'negative'
  | 'e2e';

export interface ChatCoverageScenario {
  id: string;
  description: string;
  level: TestLevel[];
  question: string;
  expected?: string;
  language?: 'es' | 'en';
  roomId?: string | null;
  propertyId?: string;
  expectedStatus?: number;
}

export const chatCoverage: ChatCoverageScenario[] = [
  {
    id: 'wifi',
    description: 'Consulta básica sobre WiFi',
    level: ['smoke', 'e2e' ],
    question: 'wifi',
    expected: 'wifi',
    language: 'es',
    roomId: null,
  },

  {
    id: 'breakfast',
    description: 'Consulta básica sobre desayuno',
    level: ['smoke'],
    question: 'desayuno',
    expected: 'desayuno',
    language: 'es',
    roomId: null,
  },

  {
    id: 'checkout',
    description: 'Consulta básica sobre checkout',
    level: ['smoke'],
    question: 'checkout',
    expected: 'check',
    language: 'es',
    roomId: null,
  },

  {
    id: 'wifi-en',
    description: 'Consulta sobre WiFi en inglés',
    level: ['regression'],
    question: 'wifi',
    expected: 'wifi',
    language: 'en',
    roomId: null,
  },

  {
    id: 'unknown-question',
    description: 'Pregunta no reconocida',
    level: ['regression', 'negative'],
    question: '¿Tienen clases de buceo en la luna?',
    language: 'es',
    roomId: null,
  },

  {
    id: 'room-context',
    description: 'Consulta con contexto de habitación',
    level: ['regression', 'integration'],
    question: 'Necesito una toalla extra',
    language: 'es',
    roomId: '101',
  },

  {
    id: 'empty-question',
    description: 'Pregunta vacía enviada al API',
    level: ['contract', 'negative'],
    question: '',
    language: 'es',
    roomId: null,
    expectedStatus: 400,
  },

  {
    id: 'invalid-property',
    description: 'Property ID inválido',
    level: ['contract', 'negative'],
    question: 'wifi',
    language: 'es',
    roomId: null,
    propertyId: 'invalid-property-id',
    expectedStatus: 404,
  },

  {
    id: 'ask-contract',
    description: 'Contrato básico de POST /ask',
    level: ['contract'],
    question: 'wifi',
    language: 'es',
    roomId: null,
    expectedStatus: 200,
  },

  {
    id: 'api-ui-consistency',
    description: 'La respuesta de la API coincide con la UI',
    level: ['integration'],
    question: 'desayuno',
    expected: 'desayuno',
    language: 'es',
    roomId: null,
  },

  {
  id: 'room-context',
  description: 'Solicitud de una toalla extra con contexto de habitación',
  level: ['regression', 'integration', 'e2e'],
  question: 'Necesito una toalla extra',
  language: 'es',
  roomId: '101',
  expected: 'toalla',
},
];