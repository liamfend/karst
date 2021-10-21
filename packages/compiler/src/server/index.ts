import { resolveHttpServer, resolveHttpsConfig } from "./http";
import connect, { Server } from "connect";
import { makeConfig, InternalConfig } from "../config";
import * as Http from "http";
import path from "path";

import finalhandler from "finalhandler";
import serveStatic from "serve-static";

export interface KarstServerConfig {
  middlewares: Server;
  httpServer: Http.Server | null;
}

export interface KarstServer {
  httpServer: Http.Server | null;
  listen(port?: number, isRestart?: boolean): void;
  close(): void;
}

const createServer = (internalConfig: InternalConfig) => {
  const config = makeConfig();
  const middlewares = connect();

  /**
   * 将来修改位置
   */
  const serve = serveStatic(path.join(process.cwd()), {
    index: ["index.html"],
    setHeaders: (res, p) => {
      return path.extname(p).endsWith(".tsx")
        ? res.setHeader("Content-Type", "application/javascript")
        : null;
    },
  });
  middlewares.use(serve);

  const httpServer = resolveHttpServer(middlewares, config.httpsConfig);

  return httpServer;
};

export const createKarstServer = (
  internalConfig: InternalConfig
): KarstServer => {
  const _createServer = createServer(internalConfig);
  const listen = (port?: number) => {
    return _createServer.listen(port || internalConfig.port);
  };

  return {
    httpServer: _createServer,
    listen: listen,
    close: () => {
      console.log("close");
    },
  };
};
