import { getConfigFile } from "medusa-core-utils";
import { ConfigModule, PluginEntry, PluginOptions } from "../types";
import { formatBase } from "./build-helpers";

export function loadConfig(rootDirectory?: string): {
  pluginOptions: PluginOptions;
  configFilePath: string;
} {
  const root = rootDirectory || process.cwd();

  const {
    configModule,
    configFilePath,
    error = undefined,
  } = getConfigFile(root, `medusa-config`) as {
    configModule: ConfigModule;
    configFilePath: string;
    error?: Error;
  };

  if (error) {
    throw error;
  }

  const plugins = configModule.plugins;

  const adminConfig = plugins.find(
    (p) => typeof p !== "string" && p.resolve === "medusa-plugin-admin"
  );

  const defaultConfig = {
    base: "/app/",
    serve: true,
    serveInDev: true,
  };

  if (!isPluginWithOptions(adminConfig)) {
    return { pluginOptions: defaultConfig, configFilePath };
  }

  const readOptions = {
    base: adminConfig.options?.base
      ? formatBase(adminConfig.options.base)
      : undefined,
    ...adminConfig.options,
  };

  const options = { ...defaultConfig, ...readOptions };

  return { pluginOptions: options, configFilePath };
}

function isPluginWithOptions(
  p: PluginEntry | undefined
): p is { resolve: string; options?: PluginOptions } {
  if (!p) {
    return false;
  }

  return (
    typeof p !== "string" && p.resolve !== undefined && p.options !== undefined
  );
}
