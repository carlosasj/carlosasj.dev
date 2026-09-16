import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // Also render every static route to HTML at build time, so build/client
  // can be served as-is by GitHub Pages
  prerender: true,
} satisfies Config;
