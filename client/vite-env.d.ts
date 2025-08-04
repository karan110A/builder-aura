/// <reference types="vite/client" />

declare global {
  interface Window {
    __rechartsWarningsSuppressed?: boolean;
    __rechartsSuppressionActive?: boolean;
  }

  // Ensure globalThis has the react root
  var __reactRoot: any;
}
