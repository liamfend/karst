import { createServer, Server as HttpServer } from "http";
import {
  createServer as createHttpsServer,
  ServerOptions as HttpsServerOptions,
} from "https";
import { Server } from "connect";
import { ServerConfig } from "../config";

export const resolveHttpServer = (
  app: Server,
  httpsOptions: HttpsServerOptions | undefined
): HttpServer => {
  if (!httpsOptions) {
    return createServer(app);
  } else {
    return createHttpsServer(httpsOptions, app);
  }
};

export const resolveHttpsConfig = (
  config: ServerConfig
): HttpsServerOptions | undefined => config?.httpsConfig;
