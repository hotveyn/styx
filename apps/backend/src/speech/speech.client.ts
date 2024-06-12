import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Logger } from 'pino';
import { SpeechLoggerToken } from 'src/logger/speech.logger';
import { v4 } from 'uuid';
import * as https from 'node:https';
import { ParameterCenter } from 'src/parameter/parameter.center';
// import { $Enums } from '@prisma/client';

@Injectable()
export class SpeechClient implements OnModuleInit {
  private accessToken: string;
  // private tokenExpire: number;
  private api: AxiosInstance;

  async onModuleInit() {
    // await this.auth();
    // this.parameterCenter.emitter.on(
    //   $Enums.ParameterCode.SPEECH_CREDENTIALS,
    //   async () => {
    //     await this.auth();
    //     this.logger.info('Speech credentials updated');
    //   },
    // );
  }

  constructor(
    @Inject(SpeechLoggerToken)
    private readonly logger: Logger,
    private readonly parameterCenter: ParameterCenter,
  ) {}

  async recognize(
    buffer: Buffer,
    {
      compressionType,
      sampleRate,
    }: { compressionType: 'pcmu' | 'pcma'; sampleRate: number },
  ) {
    if (!this.api) {
      this.logger.error('Api client does not provided');
      throw new Error('Api client does not provided');
    }

    try {
      // this.logger.debug('Trying ot recognize file - ');
      return await this.api.post<IRecognizeRespones>(
        '/speech:recognize',
        buffer,
        {
          headers: {
            'Content-Type': `audio/${compressionType};rate=${sampleRate}`,
          },
        },
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 429) {
          this.logger.error('Too many requests');
        } else if (error.response.status === 401) {
          await this.auth();

          return await this.api.post<IRecognizeRespones>(
            '/speech:recognize',
            buffer,
            {
              headers: {
                'Content-Type': `audio/${compressionType};rate=${sampleRate}`,
              },
            },
          );
        } else if (error.response.status === 400) {
          if ((error.response.data.message as string).startsWith('Bad audio')) {
            this.logger.error({
              msg: 'Speech recognize bad request',
              error: error.message,
              data: error.response && error.response.data,
            });
          }
        } else {
          this.logger.error({
            msg: 'Speech recognize unhandled axios error',
            error: error.message,
            data: error.response && error.response.data,
          });
        }
      }

      throw error;
    }
  }

  private async auth() {
    try {
      this.logger.info('SPEECH login start');
      const res = await axios<{ access_token: string; expires_at: number }>({
        method: 'post',
        url: process.env.SPEECH_URL_ACCESS_TOKEN,
        headers: {
          Authorization: `Bearer ${this.parameterCenter.getSpeechCredentials()}`,
          RqUID: v4(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          scope: process.env.SPEECH_SCOPE,
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });
      const { access_token } = res.data;
      this.accessToken = access_token;
      // this.tokenExpire = expires_at;
      this.logger.info('SPEECH login successed');

      this.createApiAxiosInstance();
    } catch (error) {
      this.logger.error({
        msg: 'Speech login error',
        error: error.message,
        data: error.response && error.response.data,
      });
      throw error;
    }
  }

  private createApiAxiosInstance() {
    this.api = axios.create({
      baseURL: process.env.SPEECH_URL_REST,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      timeout: 20000,
    });

    this.api.interceptors.request.use(
      (config) => {
        this.logger.debug({
          msg: 'Speech client REQUEST',
          method: config.method,
          url: config.url,
          headers: config.headers,
        });
        return config;
      },
      async (error) => {
        this.logger.error({
          msg: `Speech client REQUEST ERROR}`,
          error: error.message,
        });
        return await Promise.reject(error);
      },
    );

    this.api.interceptors.response.use(
      (response) => {
        this.logger.debug({
          msg: 'Speech client RESPONSE',
          status: response.status,
          data: response.data,
          headers: response.headers,
        });
        return response;
      },
      async (error: AxiosError) => {
        this.logger.error({
          msg: `Speech client RESPONSE error`,
          error: error.message,
          data: error.response && error.response.data,
        });
        return await Promise.reject(error);
      },
    );
  }
}

export interface IRecognizeRespones {
  result: string[];
  emotions: { negative: number; neutral: number; positive: number }[];
  status: number;
}
