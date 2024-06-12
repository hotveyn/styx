import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Logger } from 'pino';
import { DadataLoggerToken } from 'src/logger/dadata.logger';
import * as https from 'node:https';
import { ParameterCenter } from 'src/parameter/parameter.center';
import { $Enums } from '@prisma/client';

@Injectable()
export class DadataClient implements OnModuleInit {
  private api: AxiosInstance;

  onModuleInit() {
    this.createApiAxiosInstance();

    this.parameterCenter.emitter.on(
      $Enums.ParameterCode.DADATA_CREDENTIALS,
      () => {
        this.createApiAxiosInstance();
        this.logger.info({ msg: 'Dadata credentials updated' });
      },
    );
  }

  constructor(
    @Inject(DadataLoggerToken)
    private readonly logger: Logger,
    private readonly parameterCenter: ParameterCenter,
  ) {}

  public async suggest(query: string) {
    try {
      const { data } = await this.api.post('', { query, count: 5 });
      return data;
    } catch (error) {
      this.logger.error({
        msg: 'Dadata suggest error',
        error: error.message,
      });
    }
  }

  private createApiAxiosInstance() {
    this.api = axios.create({
      baseURL: process.env.DADATA_URL_REST,
      headers: {
        Authorization: `Token ${this.parameterCenter.getDadataCredentials()}`,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      timeout: 20000,
    });

    this.api.interceptors.request.use(
      (config) => {
        this.logger.debug({
          msg: 'Dadata client REQUEST',
          method: config.method,
          url: config.url,
          headers: config.headers,
        });
        return config;
      },
      async (error) => {
        this.logger.error({
          msg: `Dadata client REQUEST ERROR`,
          error: error.message,
        });
        return await Promise.reject(error);
      },
    );

    this.api.interceptors.response.use(
      (response) => {
        this.logger.debug({
          msg: 'Dadata client RESPONSE',
          status: response.status,
          //   data: response.data,
          headers: response.headers,
        });
        return response;
      },
      async (error: AxiosError) => {
        this.logger.error({
          msg: `Dadata client RESPONSE ERROR`,
          error: error.message,
          //   data: error.response && error.response.data,
        });
        return await Promise.reject(error);
      },
    );
  }
}
