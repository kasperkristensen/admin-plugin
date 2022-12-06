export type PluginOptions = {
  base?: string;
  serve?: boolean;
  serveInDev?: boolean;
  backendUrl?: string;
};

type PluginName = string;

export type PluginEntry =
  | PluginName
  | {
      resolve: PluginName;
      options?: PluginOptions;
    };

export type ConfigModule = {
  plugins: PluginEntry[];
};

export type DefineBackendConfig = {
  serve?: boolean;
  backendUrl?: string;
};
