export type PluginOptions = {
  base?: string;
  serve?: boolean;
  serveInDev?: boolean;
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
