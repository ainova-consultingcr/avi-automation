import { test as base } from '@playwright/test';
import { AviApp } from './AviApp';

type AviFixtures = {
  avi: AviApp;
};

export const test = base.extend<AviFixtures>({
  avi: async ({ page, request }, use) => {
    const avi = new AviApp(page, request);

    await use(avi);
  },
});

export { expect } from '@playwright/test';