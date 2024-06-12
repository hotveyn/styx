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
  ApplicationControllerCreateData,
  ApplicationControllerCreateError,
  ApplicationControllerDeleteData,
  ApplicationControllerDeleteError,
  ApplicationControllerQuerySearchData,
  ApplicationControllerQuerySearchParams,
  ApplicationControllerUpdateData,
  ApplicationControllerUpdateError,
  ApplicationControllerUploadData,
  ApplicationControllerUploadError,
  ApplicationControllerUploadPayload,
  CreateApplicationDto,
  UpdateApplicationDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Application<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Applications
   * @name ApplicationControllerQuerySearch
   * @request GET:/application/query
   * @secure
   * @response `200` `ApplicationControllerQuerySearchData`
   */
  applicationControllerQuerySearch = (query: ApplicationControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<ApplicationControllerQuerySearchData, any>({
      path: `/application/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Applications
 * @name ApplicationControllerUpload
 * @request POST:/application/{name}/upload
 * @secure
 * @response `201` `ApplicationControllerUploadData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Application with this name did not find",
    thing?: "APPLICATION_NAME",

}`
 */
  applicationControllerUpload = (name: string, data: ApplicationControllerUploadPayload, params: RequestParams = {}) =>
    this.http.request<ApplicationControllerUploadData, ApplicationControllerUploadError>({
      path: `/application/${name}/upload`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
 * No description
 *
 * @tags Applications
 * @name ApplicationControllerCreate
 * @request POST:/application
 * @secure
 * @response `201` `ApplicationControllerCreateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Application with this name already exist",
    thing?: "APPLICATION_NAME",

}`
 */
  applicationControllerCreate = (data: CreateApplicationDto, params: RequestParams = {}) =>
    this.http.request<ApplicationControllerCreateData, ApplicationControllerCreateError>({
      path: `/application`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Applications
 * @name ApplicationControllerUpdate
 * @request PATCH:/application/{name}
 * @secure
 * @response `200` `ApplicationControllerUpdateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Application with this name already exist",
    thing?: "APPLICATION_NAME",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Application with this name did not find",
    thing?: "APPLICATION_NAME",

}`
 */
  applicationControllerUpdate = (name: string, data: UpdateApplicationDto, params: RequestParams = {}) =>
    this.http.request<ApplicationControllerUpdateData, ApplicationControllerUpdateError>({
      path: `/application/${name}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Applications
 * @name ApplicationControllerDelete
 * @request DELETE:/application/{name}
 * @secure
 * @response `200` `ApplicationControllerDeleteData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Application with this name did not find",
    thing?: "APPLICATION_NAME",

}`
 */
  applicationControllerDelete = (name: string, params: RequestParams = {}) =>
    this.http.request<ApplicationControllerDeleteData, ApplicationControllerDeleteError>({
      path: `/application/${name}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
