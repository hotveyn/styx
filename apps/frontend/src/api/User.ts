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
  CreateUserDto,
  UpdateUserDto,
  UserControllerCreateData,
  UserControllerCreateError,
  UserControllerGetProfileData,
  UserControllerQuerySearchData,
  UserControllerQuerySearchParams,
  UserControllerRemoveData,
  UserControllerRemoveError,
  UserControllerUpdateData,
  UserControllerUpdateError,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags User
 * @name UserControllerCreate
 * @request POST:/user
 * @secure
 * @response `201` `UserControllerCreateData`
 * @response `400` `({
    type?: "UNIQUE",
    message?: "User with this login already exist",
    thing?: "USER_LOGIN",

} | {
    type?: "UNIQUE",
    message?: "User with this email already exist",
    thing?: "USER_EMAIL",

})`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Organization with this id dit not find",
    thing?: "ORGANIZATION_ID",

}`
 */
  userControllerCreate = (data: CreateUserDto, params: RequestParams = {}) =>
    this.http.request<UserControllerCreateData, UserControllerCreateError>({
      path: `/user`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags User
 * @name UserControllerUpdate
 * @request PATCH:/user/{id}
 * @secure
 * @response `200` `UserControllerUpdateData`
 * @response `400` `({
    type?: "UNIQUE",
    message?: "User with this login already exist",
    thing?: "USER_LOGIN",

} | {
    type?: "UNIQUE",
    message?: "User with this email already exist",
    thing?: "USER_EMAIL",

})`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "User with this id dit not find",
    thing?: "USER_ID",

}`
 */
  userControllerUpdate = (id: number, data: UpdateUserDto, params: RequestParams = {}) =>
    this.http.request<UserControllerUpdateData, UserControllerUpdateError>({
      path: `/user/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags User
 * @name UserControllerRemove
 * @request DELETE:/user/{id}
 * @secure
 * @response `200` `UserControllerRemoveData`
 * @response `400` `{
    type?: "DELETE",
    message?: "User tried to delete himself",
    thing?: "USER_DELETE",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "User with this id dit not find",
    thing?: "USER_ID",

}`
 */
  userControllerRemove = (id: number, params: RequestParams = {}) =>
    this.http.request<UserControllerRemoveData, UserControllerRemoveError>({
      path: `/user/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserControllerQuerySearch
   * @request GET:/user/query
   * @secure
   * @response `200` `UserControllerQuerySearchData`
   */
  userControllerQuerySearch = (query: UserControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<UserControllerQuerySearchData, any>({
      path: `/user/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserControllerGetProfile
   * @request GET:/user/profile
   * @secure
   * @response `200` `UserControllerGetProfileData`
   */
  userControllerGetProfile = (params: RequestParams = {}) =>
    this.http.request<UserControllerGetProfileData, any>({
      path: `/user/profile`,
      method: "GET",
      secure: true,
      ...params,
    });
}
