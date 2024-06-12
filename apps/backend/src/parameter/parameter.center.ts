import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { $Enums } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter } from 'node:events';

@Injectable()
export class ParameterCenter implements OnModuleInit {
  private ACCESS_TOKEN_LIFE_TIME?: number;
  private REFRESH_TOKEN_LIFE_TIME?: number;
  private SPEECH_CREDENTIALS?: string;
  private DADATA_CREDENTIALS?: string;
  private TELEGRAM_BOT_TOKEN?: string;
  private TELEGRAM_BOT_NAME?: string;
  private DEVICE_DETECT_INTERVAL?: number;

  public emitter = new EventEmitter();

  constructor(
    private readonly prisma: PrismaService,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    await this.parsePrimaryParameters(this.moduleRef.get(PrismaService));
  }

  getAccessTokenLifeTime() {
    return this.ACCESS_TOKEN_LIFE_TIME;
  }
  async setAccessTokenLifeTime(value: number, changerId: bigint) {
    const changeParamerterResult = await this.prisma.parameter.update({
      where: {
        code: $Enums.ParameterCode.ACCESS_TOKEN_LIFE_TIME,
      },
      data: {
        value: String(value),
        parameterChanges: {
          create: {
            became: String(value),
            was: String(this.ACCESS_TOKEN_LIFE_TIME),
            userId: changerId,
          },
        },
      },
    });

    this.ACCESS_TOKEN_LIFE_TIME = value;

    this.emitter.emit($Enums.ParameterCode.ACCESS_TOKEN_LIFE_TIME);

    return changeParamerterResult;
  }

  getRefreshTokenLifeTime() {
    return this.REFRESH_TOKEN_LIFE_TIME;
  }
  async setRefreshTokenLifeTime(value: number, changerId: bigint) {
    const [parameterUpdateResult] = await this.prisma.$transaction([
      this.prisma.parameter.update({
        where: {
          code: $Enums.ParameterCode.REFRESH_TOKEN_LIFE_TIME,
        },
        data: {
          value: String(value),
          parameterChanges: {
            create: {
              became: String(value),
              was: String(this.REFRESH_TOKEN_LIFE_TIME),
              userId: changerId,
            },
          },
        },
      }),
      this.prisma.refreshToken.deleteMany(),
    ]);

    this.REFRESH_TOKEN_LIFE_TIME = value;

    this.emitter.emit($Enums.ParameterCode.REFRESH_TOKEN_LIFE_TIME);

    return parameterUpdateResult;
  }

  getSpeechCredentials() {
    return this.SPEECH_CREDENTIALS;
  }
  async setSpeechCredentials(value: string, changerId: bigint) {
    const changeParamerterResult = await this.prisma.parameter.update({
      where: {
        code: $Enums.ParameterCode.SPEECH_CREDENTIALS,
      },
      data: {
        value,
        parameterChanges: {
          create: {
            became: value,
            was: this.SPEECH_CREDENTIALS,
            userId: changerId,
          },
        },
      },
    });

    this.SPEECH_CREDENTIALS = value;

    this.emitter.emit($Enums.ParameterCode.SPEECH_CREDENTIALS);

    return changeParamerterResult;
  }

  getDadataCredentials() {
    return this.DADATA_CREDENTIALS;
  }
  async setDadataCredentials(value: string, changerId: bigint) {
    const changeParamerterResult = await this.prisma.parameter.update({
      where: {
        code: $Enums.ParameterCode.DADATA_CREDENTIALS,
      },
      data: {
        value,
        parameterChanges: {
          create: {
            became: value,
            was: this.DADATA_CREDENTIALS,
            userId: changerId,
          },
        },
      },
    });

    this.DADATA_CREDENTIALS = value;

    this.emitter.emit($Enums.ParameterCode.DADATA_CREDENTIALS);

    return changeParamerterResult;
  }

  getTelegramBotToken() {
    return this.TELEGRAM_BOT_TOKEN;
  }
  async setTelegramBotToken(value: string, changerId: bigint) {
    const changeParamerterResult = await this.prisma.parameter.update({
      where: {
        code: $Enums.ParameterCode.TELEGRAM_BOT_TOKEN,
      },
      data: {
        value,
        parameterChanges: {
          create: {
            became: value,
            was: this.TELEGRAM_BOT_TOKEN,
            userId: changerId,
          },
        },
      },
    });

    this.TELEGRAM_BOT_TOKEN = value;

    this.emitter.emit($Enums.ParameterCode.TELEGRAM_BOT_TOKEN);

    return changeParamerterResult;
  }

  getTelegramBotName() {
    return this.TELEGRAM_BOT_NAME;
  }
  async setTelegramBotName(value: string, changerId: bigint) {
    const changeParamerterResult = await this.prisma.parameter.update({
      where: {
        code: $Enums.ParameterCode.TELEGRAM_BOT_NAME,
      },
      data: {
        value,
        parameterChanges: {
          create: {
            became: value,
            was: this.TELEGRAM_BOT_NAME,
            userId: changerId,
          },
        },
      },
    });

    this.TELEGRAM_BOT_NAME = value;

    this.emitter.emit($Enums.ParameterCode.TELEGRAM_BOT_NAME);

    return changeParamerterResult;
  }

  getDeviceDetectInterval(): number {
    return this.DEVICE_DETECT_INTERVAL;
  }
  async setDeviceDetectInterval(value: number, changerId: bigint) {
    const changeParamerterResult = await this.prisma.parameter.update({
      where: {
        code: $Enums.ParameterCode.DEVICE_DETECT_INTERVAL,
      },
      data: {
        value: String(value),
        parameterChanges: {
          create: {
            became: String(value),
            was: String(this.DEVICE_DETECT_INTERVAL),
            userId: changerId,
          },
        },
      },
    });

    this.DEVICE_DETECT_INTERVAL = value;

    this.emitter.emit($Enums.ParameterCode.DEVICE_DETECT_INTERVAL);

    return changeParamerterResult;
  }

  private async parsePrimaryParameters(prisma: PrismaService) {
    const givenParameters = await Promise.allSettled([
      prisma.parameter.findUniqueOrThrow({
        where: {
          code: $Enums.ParameterCode.ACCESS_TOKEN_LIFE_TIME,
        },
      }),
      prisma.parameter.findUniqueOrThrow({
        where: {
          code: $Enums.ParameterCode.REFRESH_TOKEN_LIFE_TIME,
        },
      }),
      prisma.parameter.findUniqueOrThrow({
        where: {
          code: $Enums.ParameterCode.SPEECH_CREDENTIALS,
        },
      }),
      prisma.parameter.findUniqueOrThrow({
        where: {
          code: $Enums.ParameterCode.DADATA_CREDENTIALS,
        },
      }),
      prisma.parameter.findUniqueOrThrow({
        where: {
          code: $Enums.ParameterCode.TELEGRAM_BOT_TOKEN,
        },
      }),
      prisma.parameter.findUniqueOrThrow({
        where: {
          code: $Enums.ParameterCode.TELEGRAM_BOT_NAME,
        },
      }),
      prisma.parameter.findUniqueOrThrow({
        where: {
          code: $Enums.ParameterCode.DEVICE_DETECT_INTERVAL,
        },
      }),
    ]);

    const [
      accessTokenLifeTime,
      refreshTokenLifeTime,
      speechCredentials,
      dadataCredentials,
      telegramBotToken,
      telegramBotName,
      deviceDetectInterval,
    ] = givenParameters;

    givenParameters.forEach((parameter) => {
      if (parameter.status === 'fulfilled') {
        this[parameter.value.code] = parameter.value.value as never;
      } else {
        throw Error(
          'Any of parameters does not provided \n' +
            `
         \tACCESS_TOKEN_LIFE_TIME - ${JSON.stringify(accessTokenLifeTime['value'])}\n
         \tREFRESH_TOKEN_LIFE_TIME - ${JSON.stringify(refreshTokenLifeTime['value'])}\n
         \tSPEECH_CREDENTIALS - ${JSON.stringify(speechCredentials['value'])}\n
         \tDADATA_CREDENTIALS - ${JSON.stringify(dadataCredentials['value'])}\n
         \tTELEGRAM_BOT_TOKEN - ${JSON.stringify(telegramBotToken['value'])}\n
         \TELEGRAM_BOT_NAME - ${JSON.stringify(telegramBotName['value'])}\n
         \tDEVICE_DETECT_INTERVAL - ${JSON.stringify(deviceDetectInterval['value'])}\n
        `,
        );
      }
    });
  }
}
