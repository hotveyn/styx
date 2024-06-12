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
  StatControllerGetActivityData,
  StatControllerGetActivityParams,
  StatControllerGetMonitoringData,
  StatControllerGetMonitoringParams,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Stat<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Stat
   * @name StatControllerGetMonitoring
   * @request GET:/stat/monitoring
   * @response `200` `StatControllerGetMonitoringData`
   */
  statControllerGetMonitoring = (query: StatControllerGetMonitoringParams, params: RequestParams = {}) =>
    this.http.request<StatControllerGetMonitoringData, any>({
      path: `/stat/monitoring`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Stat
   * @name StatControllerGetActivity
   * @request GET:/stat/activity
   * @response `200` `StatControllerGetActivityData`
   */
  statControllerGetActivity = (query: StatControllerGetActivityParams, params: RequestParams = {}) =>
    this.http.request<StatControllerGetActivityData, any>({
      path: `/stat/activity`,
      method: "GET",
      query: query,
      ...params,
    });
}
