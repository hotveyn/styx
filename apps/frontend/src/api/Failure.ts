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
  CommentFailureDto,
  FailureControllerCommentDeviceFailureData,
  FailureControllerQuerySearchData,
  FailureControllerQuerySearchParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Failure<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Failure
   * @name FailureControllerQuerySearch
   * @request GET:/failure/query
   * @secure
   * @response `200` `FailureControllerQuerySearchData`
   */
  failureControllerQuerySearch = (query: FailureControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<FailureControllerQuerySearchData, any>({
      path: `/failure/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Failure
   * @name FailureControllerCommentDeviceFailure
   * @request PATCH:/failure/comment/{id}
   * @secure
   * @response `200` `FailureControllerCommentDeviceFailureData`
   */
  failureControllerCommentDeviceFailure = (id: number, data: CommentFailureDto, params: RequestParams = {}) =>
    this.http.request<FailureControllerCommentDeviceFailureData, any>({
      path: `/failure/comment/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
