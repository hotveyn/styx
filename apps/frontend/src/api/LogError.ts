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
  LogErrorControllerDeleteData,
  LogErrorControllerDeleteParams,
  LogErrorControllerGetByGroupData,
  LogErrorControllerGetByGroupParams,
  LogErrorControllerGetOneData,
  LogErrorControllerGetOneParams,
  LogErrorControllerQuerySearchData,
  LogErrorControllerQuerySearchParams,
  LogErrorControllerSendLogData,
  LogErrorControllerSendLogError,
  SendLogDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class LogError<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Log Error
   * @name LogErrorControllerQuerySearch
   * @request GET:/log-error/query
   * @response `200` `LogErrorControllerQuerySearchData`
   */
  logErrorControllerQuerySearch = (query: LogErrorControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<LogErrorControllerQuerySearchData, any>({
      path: `/log-error/query`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
 * No description
 *
 * @tags Log Error
 * @name LogErrorControllerSendLog
 * @request POST:/log-error/send-log
 * @response `201` `LogErrorControllerSendLogData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  logErrorControllerSendLog = (data: SendLogDto, params: RequestParams = {}) =>
    this.http.request<LogErrorControllerSendLogData, LogErrorControllerSendLogError>({
      path: `/log-error/send-log`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Error
   * @name LogErrorControllerGetByGroup
   * @request GET:/log-error/by-group
   * @secure
   * @response `200` `LogErrorControllerGetByGroupData`
   */
  logErrorControllerGetByGroup = (query: LogErrorControllerGetByGroupParams, params: RequestParams = {}) =>
    this.http.request<LogErrorControllerGetByGroupData, any>({
      path: `/log-error/by-group`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Error
   * @name LogErrorControllerGetOne
   * @request GET:/log-error/{deviceCode}
   * @secure
   * @response `200` `LogErrorControllerGetOneData`
   */
  logErrorControllerGetOne = ({ deviceCode, ...query }: LogErrorControllerGetOneParams, params: RequestParams = {}) =>
    this.http.request<LogErrorControllerGetOneData, any>({
      path: `/log-error/${deviceCode}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Error
   * @name LogErrorControllerDelete
   * @request DELETE:/log-error
   * @secure
   * @response `200` `LogErrorControllerDeleteData`
   */
  logErrorControllerDelete = (query: LogErrorControllerDeleteParams, params: RequestParams = {}) =>
    this.http.request<LogErrorControllerDeleteData, any>({
      path: `/log-error`,
      method: "DELETE",
      query: query,
      secure: true,
      ...params,
    });
}
