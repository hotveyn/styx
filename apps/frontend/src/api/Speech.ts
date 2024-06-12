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
  SpeechControllerDeleteData,
  SpeechControllerDeleteError,
  SpeechControllerQuerySearchData,
  SpeechControllerQuerySearchParams,
  SpeechControllerRecognizeData,
  SpeechControllerRecognizePayload,
  SpeechControllerUpdateData,
  SpeechControllerUpdateError,
  UpdateSpeechDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Speech<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Speech
   * @name SpeechControllerRecognize
   * @request POST:/speech
   * @response `201` `SpeechControllerRecognizeData`
   */
  speechControllerRecognize = (data: SpeechControllerRecognizePayload, params: RequestParams = {}) =>
    this.http.request<SpeechControllerRecognizeData, any>({
      path: `/speech`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags Speech
   * @name SpeechControllerQuerySearch
   * @request GET:/speech/query
   * @response `200` `SpeechControllerQuerySearchData`
   */
  speechControllerQuerySearch = (query: SpeechControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<SpeechControllerQuerySearchData, any>({
      path: `/speech/query`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
 * No description
 *
 * @tags Speech
 * @name SpeechControllerDelete
 * @request DELETE:/speech/{id}
 * @response `200` `SpeechControllerDeleteData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  speechControllerDelete = (id: number, params: RequestParams = {}) =>
    this.http.request<SpeechControllerDeleteData, SpeechControllerDeleteError>({
      path: `/speech/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
 * No description
 *
 * @tags Speech
 * @name SpeechControllerUpdate
 * @request PATCH:/speech/{id}
 * @response `200` `SpeechControllerUpdateData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  speechControllerUpdate = (id: number, data: UpdateSpeechDto, params: RequestParams = {}) =>
    this.http.request<SpeechControllerUpdateData, SpeechControllerUpdateError>({
      path: `/speech/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
