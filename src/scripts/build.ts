import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { build as viteBuild } from "vite";
import { defineBackend } from "../utils/build-helpers";

build();

/**
 * Internal script used to build the default admin dashboard, that is shipped pre-built
 * with the plugin. If the user wants to change the URL from which the dashboard
 * is served, they can do so by changing the `base` option in the `medusa-config`
 * file, and re-build the dashboard using `medusa-admin build`.
 *
 * To build the dashboard, run `yarn build:app` from your terminal.
 */
async function build() {
  await viteBuild({
    root: resolve(__dirname, "../", "client"),
    base: "/app/",
    plugins: [react()],
    define: defineBackend({ serve: true }),
    build: {
      outDir: resolve(__dirname, "..", "..", "build"),
      emptyOutDir: true,
    },
  });
}
