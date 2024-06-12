import pino from 'pino';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Logger } from 'pino';
import { ConfigError } from 'src/errors/config.error';

export const BotLoggerToken = 'BOT_LOGGER';

interface IBotLoggerConfig {
  level: string;
}

export function getBotLogger(config: IBotLoggerConfig): Logger {
  if (!fs.existsSync(path.resolve(process.cwd(), 'logs', 'bot'))) {
    fs.mkdirSync(path.resolve(process.cwd(), 'logs', 'bot'), {
      recursive: true,
    });
  }

  const pathToLogFile = path.resolve(process.cwd(), 'logs', 'bot', 'bot');

  const botTransports = pino.transport({
    targets: getTargets(config, pathToLogFile),
  });

  return pino(
    {
      name: 'bot',
      timestamp: pino.stdTimeFunctions.isoTime,
      level: config.level,
    },
    botTransports,
  );
}

function getTargets(config: IBotLoggerConfig, pathToLogFile: string) {
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

export function getBotLoggerConfig(): IBotLoggerConfig {
  const { BOT_LOGGER_LEVEL } = process.env;

  const isAllENVVariablesLoaded = BOT_LOGGER_LEVEL;

  if (!isAllENVVariablesLoaded) {
    throw new ConfigError('BOT LOGGER', {
      BOT_LOGGER_LEVEL,
    });
  }

  return {
    level: BOT_LOGGER_LEVEL,
  };
}
