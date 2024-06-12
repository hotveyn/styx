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
  FailureNotificationControllerCheckAllNotificationsData,
  FailureNotificationControllerCheckData,
  FailureNotificationControllerCheckError,
  FailureNotificationControllerGetNotificationsData,
  FailureNotificationControllerGetNotificationsError,
  FailureNotificationControllerGetNotificationsParams,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class FailureNotification<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags Failure Notification
 * @name FailureNotificationControllerCheck
 * @request POST:/failure-notification/{failureId}
 * @response `201` `FailureNotificationControllerCheckData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Failure notification already exist",
    thing?: "FAILURE_NOTIFICATION",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device failure with this id did not find",
    thing?: "DEVICE_FAILURE_ID",

}`
 */
  failureNotificationControllerCheck = (failureId: number, params: RequestParams = {}) =>
    this.http.request<FailureNotificationControllerCheckData, FailureNotificationControllerCheckError>({
      path: `/failure-notification/${failureId}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Failure Notification
   * @name FailureNotificationControllerCheckAllNotifications
   * @request POST:/failure-notification
   * @response `204` `FailureNotificationControllerCheckAllNotificationsData`
   */
  failureNotificationControllerCheckAllNotifications = (params: RequestParams = {}) =>
    this.http.request<FailureNotificationControllerCheckAllNotificationsData, any>({
      path: `/failure-notification`,
      method: "POST",
      ...params,
    });
  /**
 * No description
 *
 * @tags Failure Notification
 * @name FailureNotificationControllerGetNotifications
 * @request GET:/failure-notification
 * @response `200` `FailureNotificationControllerGetNotificationsData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Failure notification already exist",
    thing?: "FAILURE_NOTIFICATION",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device failure with this id did not find",
    thing?: "DEVICE_FAILURE_ID",

}`
 */
  failureNotificationControllerGetNotifications = (
    query: FailureNotificationControllerGetNotificationsParams,
    params: RequestParams = {},
  ) =>
    this.http.request<
      FailureNotificationControllerGetNotificationsData,
      FailureNotificationControllerGetNotificationsError
    >({
      path: `/failure-notification`,
      method: "GET",
      query: query,
      ...params,
    });
}
