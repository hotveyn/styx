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
  AuthControllerLoginData,
  AuthControllerLoginError,
  AuthControllerLogoutData,
  LoginDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerLogin
 * @request POST:/auth/login
 * @response `201` `AuthControllerLoginData`
 * @response `401` `{
    type?: "AUTH",
    message?: "Authentication failed",
    thing?: "USER_AUTH",

}`
 */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.http.request<AuthControllerLoginData, AuthControllerLoginError>({
      path: `/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogout
   * @request POST:/auth/logout
   * @response `204` `AuthControllerLogoutData`
   */
  authControllerLogout = (params: RequestParams = {}) =>
    this.http.request<AuthControllerLogoutData, any>({
      path: `/auth/logout`,
      method: "POST",
      ...params,
    });
}
