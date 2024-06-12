import pino from 'pino';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Logger } from 'pino';
import { ConfigError } from 'src/errors/config.error';

export interface IServerLoggerConfig {
  level: string;
}

export function getServerLoggerConfig(): IServerLoggerConfig {
  const { SERVER_LOGGER_LEVEL } = process.env;

  const isAllENVVariablesLoaded = SERVER_LOGGER_LEVEL;

  if (!isAllENVVariablesLoaded) {
    throw new ConfigError('SERVER LOGGER', {
      SERVER_LOGGER_LEVEL,
    });
  }

  return {
    level: SERVER_LOGGER_LEVEL,
  };
}

export function getServerLogger(config: IServerLoggerConfig): Logger {
  if (!fs.existsSync(path.resolve(process.cwd(), 'logs', 'server'))) {
    fs.mkdirSync(path.resolve(process.cwd(), 'logs', 'server'), {
      recursive: true,
    });
  }

  const pathToLogFile = path.resolve(process.cwd(), 'logs', 'server', 'server');

  const serverTransports = pino.transport({
    targets: getTargets(config, pathToLogFile),
  });

  return pino(
    {
      name: 'server',
      timestamp: pino.stdTimeFunctions.isoTime,
      level: config.level,
    },
    serverTransports,
  );
}

function getTargets(config: IServerLoggerConfig, pathToLogFile: string) {
  if (process.env.NODE_ENV === 'DEV') {
    return [
      {
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:standard',
        },
        level: config.level,
      },
    ];
  } else if (process.env.NODE_ENV === 'PROD') {
    return [
      {
        target: 'pino/file',
        options: {
          destination: pathToLogFile,
          translateTime: 'SYS:standard',
        },
        level: config.level,
      },
      {
        target: 'pino/file',
        options: {
          destination: pathToLogFile + '-errors',
          translateTime: 'SYS:standard',
        },
        level: 'error',
      },
    ];
  } else {
    throw new Error(
      'NODE_ENV env varibable has incorrect value - ' + process.env.NODE_ENV,
    );
  }
}
