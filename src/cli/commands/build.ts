import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { build as viteBuild } from "vite";
import {
  defineBackend,
  formatBase,
  validateBase,
} from "../../utils/build-helpers";
import { loadConfig } from "../../utils/load-config";
import { outputBuild } from "../../utils/logger";

type Options = {
  outDir?: string;
};

export async function build({ outDir }: Options): Promise<void> {
  const { pluginOptions } = loadConfig();

  const root = resolve(__dirname, "..", "..", "src", "client");
  const buildOutDir = outDir || resolve(__dirname, "..", "..", "build");

  validateBase(pluginOptions.base);

  await viteBuild({
    root,
    plugins: [react()],
    base: formatBase(pluginOptions.base),
    define: defineBackend({
      serve: pluginOptions.serve,
      backendUrl: pluginOptions.backendUrl,
    }),
    build: {
      outDir: buildOutDir,
      emptyOutDir: true,
    },
  }).then(() => {
    outputBuild(pluginOptions);
  });
}
