/// <reference types.ts="webpack/module" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT?: number;
  }
}
