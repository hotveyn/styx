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
  NotificationControllerGetNotificationsData,
  NotificationControllerGetNotificationsError,
  NotificationControllerGetTelegramLinkData,
  NotificationControllerUpdateNotificationsData,
  NotificationControllerUpdateNotificationsError,
  UpdateNotificationsDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Notification<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags Notification
 * @name NotificationControllerUpdateNotifications
 * @request PATCH:/notification
 * @response `200` `NotificationControllerUpdateNotificationsData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "There is no subscription of authed user",
    thing?: "NOTIFICATION_USERID",

}`
 */
  notificationControllerUpdateNotifications = (data: UpdateNotificationsDto, params: RequestParams = {}) =>
    this.http.request<NotificationControllerUpdateNotificationsData, NotificationControllerUpdateNotificationsError>({
      path: `/notification`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Notification
 * @name NotificationControllerGetNotifications
 * @request GET:/notification
 * @response `200` `NotificationControllerGetNotificationsData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "There is no subscription of authed user",
    thing?: "NOTIFICATION_USERID",

}`
 */
  notificationControllerGetNotifications = (params: RequestParams = {}) =>
    this.http.request<NotificationControllerGetNotificationsData, NotificationControllerGetNotificationsError>({
      path: `/notification`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Notification
   * @name NotificationControllerGetTelegramLink
   * @request GET:/notification/telegram-link
   * @response `200` `NotificationControllerGetTelegramLinkData`
   */
  notificationControllerGetTelegramLink = (params: RequestParams = {}) =>
    this.http.request<NotificationControllerGetTelegramLinkData, any>({
      path: `/notification/telegram-link`,
      method: "GET",
      ...params,
    });
}
