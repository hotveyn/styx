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
  CreateDeviceDto,
  DeviceControllerCreateData,
  DeviceControllerCreateError,
  DeviceControllerGetByCodeData,
  DeviceControllerGetByCodeError,
  DeviceControllerPingData,
  DeviceControllerQuerySearchData,
  DeviceControllerQuerySearchParams,
  DeviceControllerRemoveData,
  DeviceControllerRemoveError,
  DeviceControllerUpdateData,
  DeviceControllerUpdateError,
  UpdateDeviceDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Device<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Device
   * @name DeviceControllerPing
   * @request PATCH:/device/ping/{code}
   * @secure
   * @response `201` `DeviceControllerPingData`
   */
  deviceControllerPing = (code: string, params: RequestParams = {}) =>
    this.http.request<DeviceControllerPingData, any>({
      path: `/device/ping/${code}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Device
 * @name DeviceControllerCreate
 * @request POST:/device
 * @secure
 * @response `201` `DeviceControllerCreateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Device with this code already exist",
    thing?: "DEVICE_CODE",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Organization with this id dit not find",
    thing?: "ORGANIZATION_ID",

}`
 */
  deviceControllerCreate = (data: CreateDeviceDto, params: RequestParams = {}) =>
    this.http.request<DeviceControllerCreateData, DeviceControllerCreateError>({
      path: `/device`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Device
   * @name DeviceControllerQuerySearch
   * @request GET:/device/query
   * @secure
   * @response `200` `DeviceControllerQuerySearchData`
   */
  deviceControllerQuerySearch = (query: DeviceControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<DeviceControllerQuerySearchData, any>({
      path: `/device/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Device
 * @name DeviceControllerUpdate
 * @request PATCH:/device/{id}
 * @secure
 * @response `200` `DeviceControllerUpdateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Device with this code already exist",
    thing?: "DEVICE_CODE",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  deviceControllerUpdate = (id: number, data: UpdateDeviceDto, params: RequestParams = {}) =>
    this.http.request<DeviceControllerUpdateData, DeviceControllerUpdateError>({
      path: `/device/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Device
 * @name DeviceControllerRemove
 * @request DELETE:/device/{id}
 * @secure
 * @response `200` `DeviceControllerRemoveData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  deviceControllerRemove = (id: number, params: RequestParams = {}) =>
    this.http.request<DeviceControllerRemoveData, DeviceControllerRemoveError>({
      path: `/device/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Device
 * @name DeviceControllerGetByCode
 * @request GET:/device/{code}
 * @secure
 * @response `200` `DeviceControllerGetByCodeData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  deviceControllerGetByCode = (code: string, params: RequestParams = {}) =>
    this.http.request<DeviceControllerGetByCodeData, DeviceControllerGetByCodeError>({
      path: `/device/${code}`,
      method: "GET",
      secure: true,
      ...params,
    });
}
