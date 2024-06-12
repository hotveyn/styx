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
  LogInfoControllerDeleteData,
  LogInfoControllerDeleteParams,
  LogInfoControllerGetByGroupData,
  LogInfoControllerGetByGroupParams,
  LogInfoControllerGetOneData,
  LogInfoControllerGetOneParams,
  LogInfoControllerQuerySearchData,
  LogInfoControllerQuerySearchParams,
  LogInfoControllerSendLogData,
  SendLogDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class LogInfo<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Log Info
   * @name LogInfoControllerQuerySearch
   * @request GET:/log-info/query
   * @response `200` `LogInfoControllerQuerySearchData`
   */
  logInfoControllerQuerySearch = (query: LogInfoControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<LogInfoControllerQuerySearchData, any>({
      path: `/log-info/query`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Info
   * @name LogInfoControllerSendLog
   * @request POST:/log-info/send-log
   * @response `201` `LogInfoControllerSendLogData`
   */
  logInfoControllerSendLog = (data: SendLogDto, params: RequestParams = {}) =>
    this.http.request<LogInfoControllerSendLogData, any>({
      path: `/log-info/send-log`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Info
   * @name LogInfoControllerGetByGroup
   * @request GET:/log-info/group
   * @secure
   * @response `200` `LogInfoControllerGetByGroupData`
   */
  logInfoControllerGetByGroup = (query: LogInfoControllerGetByGroupParams, params: RequestParams = {}) =>
    this.http.request<LogInfoControllerGetByGroupData, any>({
      path: `/log-info/group`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Info
   * @name LogInfoControllerGetOne
   * @request GET:/log-info/{deviceCode}
   * @secure
   * @response `200` `LogInfoControllerGetOneData`
   */
  logInfoControllerGetOne = ({ deviceCode, ...query }: LogInfoControllerGetOneParams, params: RequestParams = {}) =>
    this.http.request<LogInfoControllerGetOneData, any>({
      path: `/log-info/${deviceCode}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Info
   * @name LogInfoControllerDelete
   * @request DELETE:/log-info
   * @secure
   * @response `200` `LogInfoControllerDeleteData`
   */
  logInfoControllerDelete = (query: LogInfoControllerDeleteParams, params: RequestParams = {}) =>
    this.http.request<LogInfoControllerDeleteData, any>({
      path: `/log-info`,
      method: "DELETE",
      query: query,
      secure: true,
      ...params,
    });
}
