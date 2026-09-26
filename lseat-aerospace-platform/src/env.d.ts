/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    API_URL: string;
    // Add other environment variables as needed
  }
}