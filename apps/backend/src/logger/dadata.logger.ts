import pino from 'pino';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Logger } from 'pino';
import { ConfigError } from 'src/errors/config.error';

export const DadataLoggerToken = 'Dadata_LOGGER';

interface IDadataLoggerConfig {
  level: string;
}

export function getDadataLogger(config: IDadataLoggerConfig): Logger {
  if (!fs.existsSync(path.resolve(process.cwd(), 'logs', 'dadata'))) {
    fs.mkdirSync(path.resolve(process.cwd(), 'logs', 'dadata'), {
      recursive: true,
    });
  }

  const pathToLogFile = path.resolve(process.cwd(), 'logs', 'dadata', 'dadata');

  const dadataTransports = pino.transport({
    targets: getTargets(config, pathToLogFile),
  });

  return pino(
    {
      name: 'dadata',
      timestamp: pino.stdTimeFunctions.isoTime,
      level: config.level,
    },
    dadataTransports,
  );
}

function getTargets(config: IDadataLoggerConfig, pathToLogFile: string) {
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

export function getDadataLoggerConfig(): IDadataLoggerConfig {
  const { DADATA_LOGGER_LEVEL } = process.env;

  const isAllENVVariablesLoaded = DADATA_LOGGER_LEVEL;

  if (!isAllENVVariablesLoaded) {
    throw new ConfigError('DADATA LOGGER', {
      DADATA_LOGGER_LEVEL,
    });
  }

  return {
    level: DADATA_LOGGER_LEVEL,
  };
}
