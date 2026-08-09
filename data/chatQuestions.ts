export interface ChatScenario {
  id: string;
  description: string;
  question: string;
  expected: string;
}

export const chatQuestions: ChatScenario[] = [
  {
    id: "wifi",
    description: "Consulta sobre la contraseña WiFi",
    question: "wifi",
    expected: "WiFi",
  },

  {
    id: "breakfast",
    description: "Consulta sobre el desayuno",
    question: "desayuno",
    expected: "desayuno",
  },

  {
    id: "checkout",
    description: "Consulta sobre checkout",
    question: "checkout",
    expected: "check",
  },
];