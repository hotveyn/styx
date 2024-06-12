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
  CreateOrganizationDto,
  OrganizationControllerCreateData,
  OrganizationControllerCreateError,
  OrganizationControllerQuerySearchData,
  OrganizationControllerQuerySearchParams,
  OrganizationControllerRemoveData,
  OrganizationControllerRemoveError,
  OrganizationControllerUpdateData,
  OrganizationControllerUpdateError,
  UpdateOrganizationDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Organization<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags Organization
 * @name OrganizationControllerCreate
 * @request POST:/organization
 * @secure
 * @response `201` `OrganizationControllerCreateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Organization with this name already exists",
    thing?: "ORGANIZATION_NAME",

}`
 */
  organizationControllerCreate = (data: CreateOrganizationDto, params: RequestParams = {}) =>
    this.http.request<OrganizationControllerCreateData, OrganizationControllerCreateError>({
      path: `/organization`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Organization
 * @name OrganizationControllerUpdate
 * @request PATCH:/organization/{id}
 * @secure
 * @response `200` `OrganizationControllerUpdateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Organization with this name already exists",
    thing?: "ORGANIZATION_NAME",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Organization with this id dit not find",
    thing?: "ORGANIZATION_ID",

}`
 */
  organizationControllerUpdate = (id: number, data: UpdateOrganizationDto, params: RequestParams = {}) =>
    this.http.request<OrganizationControllerUpdateData, OrganizationControllerUpdateError>({
      path: `/organization/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Organization
 * @name OrganizationControllerRemove
 * @request DELETE:/organization/{id}
 * @secure
 * @response `200` `OrganizationControllerRemoveData`
 * @response `400` `({
    type?: "DELETE",
    message?: "Organization has some users",
    thing?: "ORGANIZATION_USERS",

} | {
    type?: "DELETE",
    message?: "Organization has some devicess",
    thing?: "ORGANIZATION_DEVICES",

} | {
    type?: "DELETE",
    message?: "Organization has some goals",
    thing?: "ORGANIZATION_GOALS",

})`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Organization with this id dit not find",
    thing?: "ORGANIZATION_ID",

}`
 */
  organizationControllerRemove = (id: number, params: RequestParams = {}) =>
    this.http.request<OrganizationControllerRemoveData, OrganizationControllerRemoveError>({
      path: `/organization/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Organization
   * @name OrganizationControllerQuerySearch
   * @request GET:/organization/query
   * @secure
   * @response `200` `OrganizationControllerQuerySearchData`
   */
  organizationControllerQuerySearch = (query: OrganizationControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<OrganizationControllerQuerySearchData, any>({
      path: `/organization/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
