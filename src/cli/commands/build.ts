import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { build as viteBuild } from "vite";
import { loadConfig } from "../../utils/load-config";

type Options = {
  outDir?: string;
  watch?: boolean;
};

export async function build({ outDir, watch = false }: Options): Promise<void> {
  const { pluginOptions, configFilePath } = loadConfig();

  const root = resolve(__dirname, "..", "..", "src", "client");
  const buildOutDir = outDir || resolve(__dirname, "..", "..", "build");

  await viteBuild({
    root,
    plugins: [react()],
    base: pluginOptions.base,
    build: {
      outDir: buildOutDir,
      emptyOutDir: true,
      watch: {
        include: [configFilePath],
      },
    },
  });
}
