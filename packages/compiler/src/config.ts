import { ServerOptions } from "https";

export interface ServerConfig {
  configFile?: string;
  httpsConfig?: ServerOptions;
}

export const makeConfig = (): ServerConfig => {
  return {
    configFile: "aaa",
    httpsConfig: undefined,
  } as ServerConfig;
};

export type InternalConfig = {
  port: number;
};
