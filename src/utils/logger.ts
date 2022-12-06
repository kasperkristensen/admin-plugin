import colors from "picocolors";
import { createLogger } from "vite";
import { PluginOptions } from "../types";
import { formatBase } from "./build-helpers";

export const clientLogger = createLogger(undefined, {
  prefix: "[medusa-plugin-admin]",
});

/**
 * Logs build result on a successful build.
 */
export function outputBuild(pluginOptions: PluginOptions) {
  const colorBool = (bool?: boolean) =>
    bool ? colors.green("true") : colors.red("false");

  const configuration = `
    ${colors.bold("Configuration:")}

    ${colors.green("➜")}  ${colors.bold(
    "Serve"
  )}:                   ${colorBool(pluginOptions.serve)}

    ${colors.green("➜")}  ${colors.bold(
    "Base"
  )}:                    ${colors.cyan(formatBase(pluginOptions.base))}

    ${colors.green("➜")}  ${colors.bold(
    "Backend URL"
  )}:             ${colors.cyan(
    pluginOptions.serve
      ? `Serve is ${colorBool(true)}, this option is ignored`
      : pluginOptions.backendUrl
  )}
  `;

  clientLogger.info(
    `
    ${colors.bold(colors.magenta("[medusa-plugin-admin]:"))} ${colors.white(
      `Build completed`
    )} ${colors.green("✔")}

    ${configuration}
    `
  );
}

export function outputDevelopmentServer({
  port,
  url,
}: {
  port: number;
  url: string;
}) {
  const colorUrl = (url: string) =>
    colors.cyan(url.replace(/:(\d+)\//, (_, port) => `:${colors.bold(port)}/`));

  clientLogger.info(
    ` 
    ${colors.magenta(
      colors.bold("[medusa-plugin-admin]") + " development server"
    )}
    
    ${colors.green("➜")}  ${colors.bold("Admin")}:   ${colorUrl(
      "http://localhost:" + port
    )}
    

    ${colors.bold("Configuration:")}
    
    ${colors.green("➜")}  ${colors.bold("Port")}:            ${colorUrl(
      `${port}`
    )}
    ${colors.green("➜")}  ${colors.bold("Backend URL")}:     ${colorUrl(url)}`,
    {
      clear: true,
    }
  );
}

/**
 * Formats and logs an error message.
 */
export function logErrorMsg(msg: string) {
  clientLogger.error(
    `
    ${colors.magenta(colors.bold("[medusa-plugin-admin]"))}

    ${colors.red("×")} ${colors.bold("Error:")}  ${colors.red(msg)}
    `
  );
}
