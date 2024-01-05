/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
