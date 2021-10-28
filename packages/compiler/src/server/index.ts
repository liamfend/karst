import { resolveHttpServer, resolveHttpsConfig } from "./http";
import connect, { Server } from "connect";
import { makeConfig, InternalConfig } from "../config";
import * as Http from "http";
import path from "path";
import * as esbuild from "esbuild";

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
  const basePath = process.cwd();
  console.log(`this is cwd` + process.cwd());
  const serve = serveStatic(basePath, {
    index: ["index.html"],
    setHeaders: (res, p) => {
      return /[jt?sx]$/.test(path.extname(p))
        ? res.setHeader("Content-Type", "application/javascript")
        : null;
    },
  });

  middlewares.use((req, res, next) => {
    const file = path.join(basePath, req.url || "");
    console.log(file);
    const result = "error~";
    if (/[jt?sx]$/.test(req.url || "")) {
      const _result = esbuild.buildSync({
        entryPoints: [file],
        format: "esm",
        write: false,
        sourcemap: "inline",
      });
      console.log(_result);
      res.setHeader("Content-Type", "application/javascript");
      res.write(_result.outputFiles[0].text);
      res.end();
    } else {
      next();
    }
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
