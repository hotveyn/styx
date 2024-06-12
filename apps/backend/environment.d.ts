declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SWAGGER: 'true' | 'false';
      SERVER_HOST: string;
      SERVER_PORT: string;
      SERVER_GLOBAL_PREFIX: string;
      SERVER_LOGGER_LEVEL: string;
      BOT_PORT: string;
      BOT_LOGGER_LEVEL: string;
      DATABASE_URL: string;
      AUTH_SECRET: string;
      SPEECH_URL_ACCESS_TOKEN: string;
      SPEECH_URL_REST: string;
      SPEECH_SCOPE: string;
      SPEECH_LOGGER_LEVEL: string;
      DADATA_LOGGER_LEVEL: string;
      DADATA_URL_REST: string;
      SPEECH_CREDENTIALS: string;
      DADATA_CREDENTIALS: string;
      REFRESH_TOKEN_LIFE_TIME: string;
      ACCESS_TOKEN_LIFE_TIME: string;
      DEVICE_DECAY_TIME: string;
      TELEGRAM_BOT_TOKEN: string;
      TELEGRAM_BOT_NAME: string;
      DEVICE_DETECT_INTERVAL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
