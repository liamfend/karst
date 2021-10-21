export type Errors = {
  [key in string]: string;
};

/**
 * logger
 */
export type LoggerMsgType = {
  errorType: keyof Errors;
  msg: string;
};

export interface ILogger {
  info(msg: LoggerMsgType): void;
  warn(msg: LoggerMsgType, filter: boolean): void;
  debug(msg: LoggerMsgType): void;
  error(msg: LoggerMsgType): void;
}

export type LogType = "error" | "warn" | "info" | "none";

export interface InternalConfig {
  base: string;
  root: string;
  logger: ILogger;
}

export const makeSimpleLogger = (): ILogger => {
  const map = new Set<keyof Errors>();
  const info = (log: LoggerMsgType): void => {
    console.info(log.msg);
  };
  const warn = (log: LoggerMsgType, filter: boolean): void => {
    if (filter && !map.has(log.errorType)) {
      map.add(log.msg);
    } else {
      console.info(log.msg);
    }
  };
  const debug = (log: LoggerMsgType): void => {
    console.info(log.msg);
  };
  const error = (log: LoggerMsgType): void => {
    console.info(log.msg);
  };

  return {
    info,
    error,
    debug,
    warn,
  };
};
