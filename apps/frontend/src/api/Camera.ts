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
  CameraControllerCreateData,
  CameraControllerCreateError,
  CameraControllerQueryData,
  CameraControllerQueryParams,
  CameraControllerRemoveData,
  CameraControllerRemoveError,
  CameraControllerUpdateData,
  CameraControllerUpdateError,
  CreateCameraDto,
  UpdateCameraDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Camera<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Camera
   * @name CameraControllerQuery
   * @request GET:/camera/query
   * @response `200` `CameraControllerQueryData`
   */
  cameraControllerQuery = (query: CameraControllerQueryParams, params: RequestParams = {}) =>
    this.http.request<CameraControllerQueryData, any>({
      path: `/camera/query`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
 * No description
 *
 * @tags Camera
 * @name CameraControllerCreate
 * @request POST:/camera
 * @response `201` `CameraControllerCreateData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Organization with this id dit not find",
    thing?: "ORGANIZATION_ID",

}`
 */
  cameraControllerCreate = (data: CreateCameraDto, params: RequestParams = {}) =>
    this.http.request<CameraControllerCreateData, CameraControllerCreateError>({
      path: `/camera`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Camera
 * @name CameraControllerUpdate
 * @request PATCH:/camera/{id}
 * @response `200` `CameraControllerUpdateData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Camera with this id did not find",
    thing?: "CAMERA_ID",

}`
 */
  cameraControllerUpdate = (id: number, data: UpdateCameraDto, params: RequestParams = {}) =>
    this.http.request<CameraControllerUpdateData, CameraControllerUpdateError>({
      path: `/camera/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Camera
 * @name CameraControllerRemove
 * @request DELETE:/camera/{id}
 * @response `200` `CameraControllerRemoveData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Camera with this id did not find",
    thing?: "CAMERA_ID",

}`
 */
  cameraControllerRemove = (id: number, params: RequestParams = {}) =>
    this.http.request<CameraControllerRemoveData, CameraControllerRemoveError>({
      path: `/camera/${id}`,
      method: "DELETE",
      ...params,
    });
}
