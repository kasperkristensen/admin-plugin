import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { build as viteBuild } from "vite"
import {
  defineBackend,
  formatBase,
  validateBase,
  validateURL,
} from "../../utils/build-helpers"
import { loadConfig } from "../../utils/load-config"
import { outputBuild } from "../../utils/logger"

type Options = {
  outDir?: string
}

export async function build({ outDir }: Options): Promise<void> {
  const { pluginOptions } = loadConfig()

  const root = resolve(__dirname, "..", "..", "src", "client")
  const buildOutDir = outDir
    ? resolve(process.cwd(), `${outDir}/build`)
    : resolve(__dirname, "..", "..", "build")

  if (outDir) {
    // Building to a custom directory, as the user intends to host the dashboard
    // separately from the Medusa backend. We need to validate that the user has
    // provided a valid backend URL.
    validateURL(pluginOptions.backend_url)
  } else {
    // Building for serving the dashboard on the server,
    // validate the base.
    validateBase(pluginOptions.base)
  }

  await viteBuild({
    root,
    plugins: [react()],
    base: formatBase(pluginOptions.base),
    define: defineBackend({
      serve: pluginOptions.serve,
      backendUrl: pluginOptions.backend_url,
    }),
    build: {
      outDir: buildOutDir,
      emptyOutDir: true,
    },
  }).then(() => {
    outputBuild(pluginOptions, !!outDir, buildOutDir)
  })
}
