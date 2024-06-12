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
  CreateGoalDto,
  GoalControllerCreateData,
  GoalControllerCreateError,
  GoalControllerQuerySearchData,
  GoalControllerQuerySearchParams,
  GoalControllerRemoveData,
  GoalControllerRemoveError,
  GoalControllerUpdateData,
  GoalControllerUpdateError,
  UpdateGoalDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Goal<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags Goal
 * @name GoalControllerCreate
 * @request POST:/goal
 * @secure
 * @response `201` `GoalControllerCreateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Goal with this code already exist",
    thing?: "GOAL_CODE",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Organization with this id dit not find",
    thing?: "ORGANIZATION_ID",

}`
 */
  goalControllerCreate = (data: CreateGoalDto, params: RequestParams = {}) =>
    this.http.request<GoalControllerCreateData, GoalControllerCreateError>({
      path: `/goal`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Goal
 * @name GoalControllerUpdate
 * @request PATCH:/goal/{id}
 * @secure
 * @response `200` `GoalControllerUpdateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Goal with this code already exist",
    thing?: "GOAL_CODE",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Goal with this id did not find",
    thing?: "GOAL_ID",

}`
 */
  goalControllerUpdate = (id: number, data: UpdateGoalDto, params: RequestParams = {}) =>
    this.http.request<GoalControllerUpdateData, GoalControllerUpdateError>({
      path: `/goal/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Goal
 * @name GoalControllerRemove
 * @request DELETE:/goal/{id}
 * @secure
 * @response `200` `GoalControllerRemoveData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Goal with this id did not find",
    thing?: "GOAL_ID",

}`
 */
  goalControllerRemove = (id: number, params: RequestParams = {}) =>
    this.http.request<GoalControllerRemoveData, GoalControllerRemoveError>({
      path: `/goal/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Goal
   * @name GoalControllerQuerySearch
   * @request GET:/goal/query
   * @secure
   * @response `200` `GoalControllerQuerySearchData`
   */
  goalControllerQuerySearch = (query: GoalControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<GoalControllerQuerySearchData, any>({
      path: `/goal/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
