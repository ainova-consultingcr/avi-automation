import path from 'path';
import { localConfig } from './environments/local';
// import { qaConfig } from './environments/qa';
 import { productionConfig } from './environments/production';

const environment = process.env.TEST_ENV ?? 'local';

const configs = {
  local: localConfig,
  // qa: qaConfig,
  production: productionConfig,
};

const environmentConfig =
  configs[environment as keyof typeof configs] ?? localConfig;

export const appConfig = {
  ...environmentConfig,

  frontendPath: path.resolve(
    process.cwd(),
    '../airbnb_ar_assistant'
  ),

  backendPath: path.resolve(
    process.cwd(),
    '../airbnb_ar_assistant/backend'
  ),
};