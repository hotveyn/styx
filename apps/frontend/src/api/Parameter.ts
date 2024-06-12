/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  ChangeAccessTokenLifeTimeDto,
  ChangeDadataCredentialsDto,
  ChangeDeviceDetectIntervalDto,
  ChangeRefreshTokenLifeTimeDto,
  ChangeSpeechCredentialsDto,
  ChangeTelegramBotNameDto,
  ChangeTelegramBotTokenDto,
  ParameterControllerChangeAccessTokenLifeTimeData,
  ParameterControllerChangeDadataCredentialsData,
  ParameterControllerChangeDeviceDetectIntervalData,
  ParameterControllerChangeRefreshTokenLifeTimeData,
  ParameterControllerChangeSpeechCredentialsData,
  ParameterControllerChangeTelegramBotNameData,
  ParameterControllerChangeTelegramBotTokenData,
  ParameterControllerGetAllData,
  ParameterControllerGetAllParams,
  ParameterControllerGetParameterChangesData,
  ParameterControllerGetParameterChangesParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Parameter<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeAccessTokenLifeTime
   * @request PATCH:/parameter/access-token-life
   * @secure
   * @response `200` `ParameterControllerChangeAccessTokenLifeTimeData`
   */
  parameterControllerChangeAccessTokenLifeTime = (data: ChangeAccessTokenLifeTimeDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeAccessTokenLifeTimeData, any>({
      path: `/parameter/access-token-life`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeTelegramBotToken
   * @request PATCH:/parameter/telegram-bot-token
   * @secure
   * @response `200` `ParameterControllerChangeTelegramBotTokenData`
   */
  parameterControllerChangeTelegramBotToken = (data: ChangeTelegramBotTokenDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeTelegramBotTokenData, any>({
      path: `/parameter/telegram-bot-token`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeTelegramBotName
   * @request PATCH:/parameter/telegram-bot-name
   * @secure
   * @response `200` `ParameterControllerChangeTelegramBotNameData`
   */
  parameterControllerChangeTelegramBotName = (data: ChangeTelegramBotNameDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeTelegramBotNameData, any>({
      path: `/parameter/telegram-bot-name`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeDeviceDetectInterval
   * @request PATCH:/parameter/device-detect-interval
   * @secure
   * @response `200` `ParameterControllerChangeDeviceDetectIntervalData`
   */
  parameterControllerChangeDeviceDetectInterval = (data: ChangeDeviceDetectIntervalDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeDeviceDetectIntervalData, any>({
      path: `/parameter/device-detect-interval`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeRefreshTokenLifeTime
   * @request PATCH:/parameter/refresh-token-life
   * @secure
   * @response `200` `ParameterControllerChangeRefreshTokenLifeTimeData`
   */
  parameterControllerChangeRefreshTokenLifeTime = (data: ChangeRefreshTokenLifeTimeDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeRefreshTokenLifeTimeData, any>({
      path: `/parameter/refresh-token-life`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeSpeechCredentials
   * @request PATCH:/parameter/speech-credentials
   * @secure
   * @response `200` `ParameterControllerChangeSpeechCredentialsData`
   */
  parameterControllerChangeSpeechCredentials = (data: ChangeSpeechCredentialsDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeSpeechCredentialsData, any>({
      path: `/parameter/speech-credentials`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeDadataCredentials
   * @request PATCH:/parameter/dadata-credentials
   * @secure
   * @response `200` `ParameterControllerChangeDadataCredentialsData`
   */
  parameterControllerChangeDadataCredentials = (data: ChangeDadataCredentialsDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeDadataCredentialsData, any>({
      path: `/parameter/dadata-credentials`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerGetAll
   * @request GET:/parameter
   * @secure
   * @response `200` `ParameterControllerGetAllData`
   */
  parameterControllerGetAll = (query: ParameterControllerGetAllParams, params: RequestParams = {}) =>
    this.http.request<ParameterControllerGetAllData, any>({
      path: `/parameter`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerGetParameterChanges
   * @request GET:/parameter/{code}/changes
   * @secure
   * @response `200` `ParameterControllerGetParameterChangesData`
   */
  parameterControllerGetParameterChanges = (
    { code, ...query }: ParameterControllerGetParameterChangesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<ParameterControllerGetParameterChangesData, any>({
      path: `/parameter/${code}/changes`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
