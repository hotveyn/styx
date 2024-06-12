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
  AchieveGoalDto,
  GoalAchieveControllerAchieveGoalData,
  GoalAchieveControllerAchieveGoalError,
  GoalAchieveControllerGetByDayData,
  GoalAchieveControllerGetByDayParams,
  GoalAchieveControllerGetByDayWithDeviceData,
  GoalAchieveControllerGetByDayWithDeviceParams,
  GoalAchieveControllerGetByDayWithDevicesData,
  GoalAchieveControllerGetByDayWithDevicesParams,
  GoalAchieveControllerGetByGroupWithDevicesData,
  GoalAchieveControllerGetByGroupWithDevicesParams,
  GoalAchieveControllerGetByHourData,
  GoalAchieveControllerGetByHourParams,
  GoalAchieveControllerGetByHourWithDeviceData,
  GoalAchieveControllerGetByHourWithDeviceParams,
  GoalAchieveControllerGetByHourWithDevicesData,
  GoalAchieveControllerGetByHourWithDevicesParams,
  GoalAchieveControllerQuerySearchData,
  GoalAchieveControllerQuerySearchParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class GoalAchieve<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags Goal Achieve
 * @name GoalAchieveControllerAchieveGoal
 * @request POST:/goal-achieve
 * @secure
 * @response `201` `GoalAchieveControllerAchieveGoalData`
 * @response `400` `{
    type?: "FORBIDDEN",
    message?: "You haven't acces to this organization",
    thing?: "ORGANIZATION_FORBIDDEN",

}`
 * @response `404` `({
    type?: "NOT_FOUND",
    message?: "Goal with this code did not find",
    thing?: "GOAL_CODE",

} | {
    type?: "NOT_FOUND",
    message?: "Device with this code did not find",
    thing?: "DEVICE_CODE",

})`
 */
  goalAchieveControllerAchieveGoal = (data: AchieveGoalDto, params: RequestParams = {}) =>
    this.http.request<GoalAchieveControllerAchieveGoalData, GoalAchieveControllerAchieveGoalError>({
      path: `/goal-achieve`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Goal Achieve
   * @name GoalAchieveControllerQuerySearch
   * @request GET:/goal-achieve/query
   * @secure
   * @response `200` `GoalAchieveControllerQuerySearchData`
   */
  goalAchieveControllerQuerySearch = (query: GoalAchieveControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<GoalAchieveControllerQuerySearchData, any>({
      path: `/goal-achieve/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Goal Achieve
   * @name GoalAchieveControllerGetByGroupWithDevices
   * @request GET:/goal-achieve/group
   * @secure
   * @response `200` `GoalAchieveControllerGetByGroupWithDevicesData`
   */
  goalAchieveControllerGetByGroupWithDevices = (
    query: GoalAchieveControllerGetByGroupWithDevicesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<GoalAchieveControllerGetByGroupWithDevicesData, any>({
      path: `/goal-achieve/group`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Goal Achieve
   * @name GoalAchieveControllerGetByDay
   * @request GET:/goal-achieve/group/day
   * @secure
   * @response `200` `GoalAchieveControllerGetByDayData`
   */
  goalAchieveControllerGetByDay = (query: GoalAchieveControllerGetByDayParams, params: RequestParams = {}) =>
    this.http.request<GoalAchieveControllerGetByDayData, any>({
      path: `/goal-achieve/group/day`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Goal Achieve
   * @name GoalAchieveControllerGetByDayWithDevices
   * @request GET:/goal-achieve/group/day-with-devices
   * @secure
   * @response `200` `GoalAchieveControllerGetByDayWithDevicesData`
   */
  goalAchieveControllerGetByDayWithDevices = (
    query: GoalAchieveControllerGetByDayWithDevicesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<GoalAchieveControllerGetByDayWithDevicesData, any>({
      path: `/goal-achieve/group/day-with-devices`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Goal Achieve
   * @name GoalAchieveControllerGetByDayWithDevice
   * @request GET:/goal-achieve/group/day-with-device
   * @secure
   * @response `200` `GoalAchieveControllerGetByDayWithDeviceData`
   */
  goalAchieveControllerGetByDayWithDevice = (
    query: GoalAchieveControllerGetByDayWithDeviceParams,
    params: RequestParams = {},
  ) =>
    this.http.request<GoalAchieveControllerGetByDayWithDeviceData, any>({
      path: `/goal-achieve/group/day-with-device`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Goal Achieve
   * @name GoalAchieveControllerGetByHour
   * @request GET:/goal-achieve/group/hour
   * @secure
   * @response `200` `GoalAchieveControllerGetByHourData`
   */
  goalAchieveControllerGetByHour = (query: GoalAchieveControllerGetByHourParams, params: RequestParams = {}) =>
    this.http.request<GoalAchieveControllerGetByHourData, any>({
      path: `/goal-achieve/group/hour`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Goal Achieve
   * @name GoalAchieveControllerGetByHourWithDevices
   * @request GET:/goal-achieve/group/hour-with-devices
   * @secure
   * @response `200` `GoalAchieveControllerGetByHourWithDevicesData`
   */
  goalAchieveControllerGetByHourWithDevices = (
    query: GoalAchieveControllerGetByHourWithDevicesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<GoalAchieveControllerGetByHourWithDevicesData, any>({
      path: `/goal-achieve/group/hour-with-devices`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Goal Achieve
   * @name GoalAchieveControllerGetByHourWithDevice
   * @request GET:/goal-achieve/group/hour-with-device
   * @secure
   * @response `200` `GoalAchieveControllerGetByHourWithDeviceData`
   */
  goalAchieveControllerGetByHourWithDevice = (
    query: GoalAchieveControllerGetByHourWithDeviceParams,
    params: RequestParams = {},
  ) =>
    this.http.request<GoalAchieveControllerGetByHourWithDeviceData, any>({
      path: `/goal-achieve/group/hour-with-device`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
