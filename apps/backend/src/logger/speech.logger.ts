import pino from 'pino';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Logger } from 'pino';
import { ConfigError } from 'src/errors/config.error';

export const SpeechLoggerToken = 'SPEECH_LOGGER';

interface ISpeechLoggerConfig {
  level: string;
}

export function getSpeechLogger(config: ISpeechLoggerConfig): Logger {
  if (!fs.existsSync(path.resolve(process.cwd(), 'logs', 'speech'))) {
    fs.mkdirSync(path.resolve(process.cwd(), 'logs', 'speech'), {
      recursive: true,
    });
  }

  const pathToLogFile = path.resolve(process.cwd(), 'logs', 'speech', 'speech');

  const speechTransports = pino.transport({
    targets: getTargets(config, pathToLogFile),
  });

  return pino(
    {
      name: 'speech',
      timestamp: pino.stdTimeFunctions.isoTime,
      level: config.level,
    },
    speechTransports,
  );
}

function getTargets(config: ISpeechLoggerConfig, pathToLogFile: string) {
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

// export class SpeechLogger extends getSpeechLogger(getSpeechLoggerConfig()) {}

export function getSpeechLoggerConfig(): ISpeechLoggerConfig {
  const { SPEECH_LOGGER_LEVEL } = process.env;

  const isAllENVVariablesLoaded = SPEECH_LOGGER_LEVEL;

  if (!isAllENVVariablesLoaded) {
    throw new ConfigError('SPEECH LOGGER', {
      SPEECH_LOGGER_LEVEL,
    });
  }

  return {
    level: SPEECH_LOGGER_LEVEL,
  };
}
