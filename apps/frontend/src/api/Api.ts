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
  ApplicationControllerCreateData,
  ApplicationControllerCreateError,
  ApplicationControllerDeleteData,
  ApplicationControllerDeleteError,
  ApplicationControllerQuerySearchData,
  ApplicationControllerQuerySearchParams,
  ApplicationControllerUpdateData,
  ApplicationControllerUpdateError,
  ApplicationControllerUploadData,
  ApplicationControllerUploadError,
  ApplicationControllerUploadPayload,
  AuthControllerLoginData,
  AuthControllerLoginError,
  AuthControllerLogoutData,
  CameraControllerCreateData,
  CameraControllerCreateError,
  CameraControllerQueryData,
  CameraControllerQueryParams,
  CameraControllerRemoveData,
  CameraControllerRemoveError,
  CameraControllerUpdateData,
  CameraControllerUpdateError,
  ChangeAccessTokenLifeTimeDto,
  ChangeDadataCredentialsDto,
  ChangeDeviceDetectIntervalDto,
  ChangeRefreshTokenLifeTimeDto,
  ChangeSpeechCredentialsDto,
  ChangeTelegramBotNameDto,
  ChangeTelegramBotTokenDto,
  CommentFailureDto,
  CreateApplicationDto,
  CreateCameraDto,
  CreateDeviceDto,
  CreateGoalDto,
  CreateOrganizationDto,
  CreateUserDto,
  DadataControllerAddressSuggestData,
  DadataControllerAddressSuggestError,
  DadataControllerAddressSuggestParams,
  DeviceControllerCreateData,
  DeviceControllerCreateError,
  DeviceControllerGetByCodeData,
  DeviceControllerGetByCodeError,
  DeviceControllerPingData,
  DeviceControllerQuerySearchData,
  DeviceControllerQuerySearchParams,
  DeviceControllerRemoveData,
  DeviceControllerRemoveError,
  DeviceControllerUpdateData,
  DeviceControllerUpdateError,
  FailureControllerCommentDeviceFailureData,
  FailureControllerQuerySearchData,
  FailureControllerQuerySearchParams,
  FailureNotificationControllerCheckAllNotificationsData,
  FailureNotificationControllerCheckData,
  FailureNotificationControllerCheckError,
  FailureNotificationControllerGetNotificationsData,
  FailureNotificationControllerGetNotificationsError,
  FailureNotificationControllerGetNotificationsParams,
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
  GoalControllerCreateData,
  GoalControllerCreateError,
  GoalControllerQuerySearchData,
  GoalControllerQuerySearchParams,
  GoalControllerRemoveData,
  GoalControllerRemoveError,
  GoalControllerUpdateData,
  GoalControllerUpdateError,
  LogErrorControllerDeleteData,
  LogErrorControllerDeleteParams,
  LogErrorControllerGetByGroupData,
  LogErrorControllerGetByGroupParams,
  LogErrorControllerGetOneData,
  LogErrorControllerGetOneParams,
  LogErrorControllerQuerySearchData,
  LogErrorControllerQuerySearchParams,
  LogErrorControllerSendLogData,
  LogErrorControllerSendLogError,
  LogInfoControllerDeleteData,
  LogInfoControllerDeleteParams,
  LogInfoControllerGetByGroupData,
  LogInfoControllerGetByGroupParams,
  LogInfoControllerGetOneData,
  LogInfoControllerGetOneParams,
  LogInfoControllerQuerySearchData,
  LogInfoControllerQuerySearchParams,
  LogInfoControllerSendLogData,
  LoginDto,
  NotificationControllerGetNotificationsData,
  NotificationControllerGetNotificationsError,
  NotificationControllerGetTelegramLinkData,
  NotificationControllerUpdateNotificationsData,
  NotificationControllerUpdateNotificationsError,
  OrganizationControllerCreateData,
  OrganizationControllerCreateError,
  OrganizationControllerQuerySearchData,
  OrganizationControllerQuerySearchParams,
  OrganizationControllerRemoveData,
  OrganizationControllerRemoveError,
  OrganizationControllerUpdateData,
  OrganizationControllerUpdateError,
  ParameterControllerChangeAccessTokenLifeTimeData,
  ParameterControllerChangeDadataCredentialsData,
  ParameterControllerChangeDeviceDetectIntervalData,
  ParameterControllerChangeRefreshTokenLifeTimeData,
  ParameterControllerChangeSpeechCredentialsData,
  ParameterControllerChangeTelegramBotNameData,
  ParameterControllerChangeTelegramBotTokenData,
  ParameterControllerGetAllData,
  ParameterControllerGetAllParams,
  ParameterControllerGetParameterChangesData,
  ParameterControllerGetParameterChangesParams,
  SendLogDto,
  SpeechControllerDeleteData,
  SpeechControllerDeleteError,
  SpeechControllerQuerySearchData,
  SpeechControllerQuerySearchParams,
  SpeechControllerRecognizeData,
  SpeechControllerRecognizePayload,
  SpeechControllerUpdateData,
  SpeechControllerUpdateError,
  StatControllerGetActivityData,
  StatControllerGetActivityParams,
  StatControllerGetMonitoringData,
  StatControllerGetMonitoringParams,
  UpdateApplicationDto,
  UpdateCameraDto,
  UpdateDeviceDto,
  UpdateGoalDto,
  UpdateNotificationsDto,
  UpdateOrganizationDto,
  UpdateSpeechDto,
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

export class Api<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeAccessTokenLifeTime
   * @request PATCH:/api/parameter/access-token-life
   * @secure
   * @response `200` `ParameterControllerChangeAccessTokenLifeTimeData`
   */
  parameterControllerChangeAccessTokenLifeTime = (data: ChangeAccessTokenLifeTimeDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeAccessTokenLifeTimeData, any>({
      path: `/api/parameter/access-token-life`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeTelegramBotToken
   * @request PATCH:/api/parameter/telegram-bot-token
   * @secure
   * @response `200` `ParameterControllerChangeTelegramBotTokenData`
   */
  parameterControllerChangeTelegramBotToken = (data: ChangeTelegramBotTokenDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeTelegramBotTokenData, any>({
      path: `/api/parameter/telegram-bot-token`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeTelegramBotName
   * @request PATCH:/api/parameter/telegram-bot-name
   * @secure
   * @response `200` `ParameterControllerChangeTelegramBotNameData`
   */
  parameterControllerChangeTelegramBotName = (data: ChangeTelegramBotNameDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeTelegramBotNameData, any>({
      path: `/api/parameter/telegram-bot-name`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeDeviceDetectInterval
   * @request PATCH:/api/parameter/device-detect-interval
   * @secure
   * @response `200` `ParameterControllerChangeDeviceDetectIntervalData`
   */
  parameterControllerChangeDeviceDetectInterval = (data: ChangeDeviceDetectIntervalDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeDeviceDetectIntervalData, any>({
      path: `/api/parameter/device-detect-interval`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeRefreshTokenLifeTime
   * @request PATCH:/api/parameter/refresh-token-life
   * @secure
   * @response `200` `ParameterControllerChangeRefreshTokenLifeTimeData`
   */
  parameterControllerChangeRefreshTokenLifeTime = (data: ChangeRefreshTokenLifeTimeDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeRefreshTokenLifeTimeData, any>({
      path: `/api/parameter/refresh-token-life`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeSpeechCredentials
   * @request PATCH:/api/parameter/speech-credentials
   * @secure
   * @response `200` `ParameterControllerChangeSpeechCredentialsData`
   */
  parameterControllerChangeSpeechCredentials = (data: ChangeSpeechCredentialsDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeSpeechCredentialsData, any>({
      path: `/api/parameter/speech-credentials`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerChangeDadataCredentials
   * @request PATCH:/api/parameter/dadata-credentials
   * @secure
   * @response `200` `ParameterControllerChangeDadataCredentialsData`
   */
  parameterControllerChangeDadataCredentials = (data: ChangeDadataCredentialsDto, params: RequestParams = {}) =>
    this.http.request<ParameterControllerChangeDadataCredentialsData, any>({
      path: `/api/parameter/dadata-credentials`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerGetAll
   * @request GET:/api/parameter
   * @secure
   * @response `200` `ParameterControllerGetAllData`
   */
  parameterControllerGetAll = (query: ParameterControllerGetAllParams, params: RequestParams = {}) =>
    this.http.request<ParameterControllerGetAllData, any>({
      path: `/api/parameter`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Parameter
   * @name ParameterControllerGetParameterChanges
   * @request GET:/api/parameter/{code}/changes
   * @secure
   * @response `200` `ParameterControllerGetParameterChangesData`
   */
  parameterControllerGetParameterChanges = (
    { code, ...query }: ParameterControllerGetParameterChangesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<ParameterControllerGetParameterChangesData, any>({
      path: `/api/parameter/${code}/changes`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags User
 * @name UserControllerCreate
 * @request POST:/api/user
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
      path: `/api/user`,
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
 * @request PATCH:/api/user/{id}
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
      path: `/api/user/${id}`,
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
 * @request DELETE:/api/user/{id}
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
      path: `/api/user/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserControllerQuerySearch
   * @request GET:/api/user/query
   * @secure
   * @response `200` `UserControllerQuerySearchData`
   */
  userControllerQuerySearch = (query: UserControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<UserControllerQuerySearchData, any>({
      path: `/api/user/query`,
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
   * @request GET:/api/user/profile
   * @secure
   * @response `200` `UserControllerGetProfileData`
   */
  userControllerGetProfile = (params: RequestParams = {}) =>
    this.http.request<UserControllerGetProfileData, any>({
      path: `/api/user/profile`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerLogin
 * @request POST:/api/auth/login
 * @response `201` `AuthControllerLoginData`
 * @response `401` `{
    type?: "AUTH",
    message?: "Authentication failed",
    thing?: "USER_AUTH",

}`
 */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.http.request<AuthControllerLoginData, AuthControllerLoginError>({
      path: `/api/auth/login`,
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
   * @request POST:/api/auth/logout
   * @response `204` `AuthControllerLogoutData`
   */
  authControllerLogout = (params: RequestParams = {}) =>
    this.http.request<AuthControllerLogoutData, any>({
      path: `/api/auth/logout`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Device
   * @name DeviceControllerPing
   * @request PATCH:/api/device/ping/{code}
   * @secure
   * @response `201` `DeviceControllerPingData`
   */
  deviceControllerPing = (code: string, params: RequestParams = {}) =>
    this.http.request<DeviceControllerPingData, any>({
      path: `/api/device/ping/${code}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Device
 * @name DeviceControllerCreate
 * @request POST:/api/device
 * @secure
 * @response `201` `DeviceControllerCreateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Device with this code already exist",
    thing?: "DEVICE_CODE",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Organization with this id dit not find",
    thing?: "ORGANIZATION_ID",

}`
 */
  deviceControllerCreate = (data: CreateDeviceDto, params: RequestParams = {}) =>
    this.http.request<DeviceControllerCreateData, DeviceControllerCreateError>({
      path: `/api/device`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Device
   * @name DeviceControllerQuerySearch
   * @request GET:/api/device/query
   * @secure
   * @response `200` `DeviceControllerQuerySearchData`
   */
  deviceControllerQuerySearch = (query: DeviceControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<DeviceControllerQuerySearchData, any>({
      path: `/api/device/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Device
 * @name DeviceControllerUpdate
 * @request PATCH:/api/device/{id}
 * @secure
 * @response `200` `DeviceControllerUpdateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Device with this code already exist",
    thing?: "DEVICE_CODE",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  deviceControllerUpdate = (id: number, data: UpdateDeviceDto, params: RequestParams = {}) =>
    this.http.request<DeviceControllerUpdateData, DeviceControllerUpdateError>({
      path: `/api/device/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Device
 * @name DeviceControllerRemove
 * @request DELETE:/api/device/{id}
 * @secure
 * @response `200` `DeviceControllerRemoveData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  deviceControllerRemove = (id: number, params: RequestParams = {}) =>
    this.http.request<DeviceControllerRemoveData, DeviceControllerRemoveError>({
      path: `/api/device/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Device
 * @name DeviceControllerGetByCode
 * @request GET:/api/device/{code}
 * @secure
 * @response `200` `DeviceControllerGetByCodeData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  deviceControllerGetByCode = (code: string, params: RequestParams = {}) =>
    this.http.request<DeviceControllerGetByCodeData, DeviceControllerGetByCodeError>({
      path: `/api/device/${code}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Goal
 * @name GoalControllerCreate
 * @request POST:/api/goal
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
      path: `/api/goal`,
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
 * @request PATCH:/api/goal/{id}
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
      path: `/api/goal/${id}`,
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
 * @request DELETE:/api/goal/{id}
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
      path: `/api/goal/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Goal
   * @name GoalControllerQuerySearch
   * @request GET:/api/goal/query
   * @secure
   * @response `200` `GoalControllerQuerySearchData`
   */
  goalControllerQuerySearch = (query: GoalControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<GoalControllerQuerySearchData, any>({
      path: `/api/goal/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Organization
 * @name OrganizationControllerCreate
 * @request POST:/api/organization
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
      path: `/api/organization`,
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
 * @request PATCH:/api/organization/{id}
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
      path: `/api/organization/${id}`,
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
 * @request DELETE:/api/organization/{id}
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
      path: `/api/organization/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Organization
   * @name OrganizationControllerQuerySearch
   * @request GET:/api/organization/query
   * @secure
   * @response `200` `OrganizationControllerQuerySearchData`
   */
  organizationControllerQuerySearch = (query: OrganizationControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<OrganizationControllerQuerySearchData, any>({
      path: `/api/organization/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Error
   * @name LogErrorControllerQuerySearch
   * @request GET:/api/log-error/query
   * @response `200` `LogErrorControllerQuerySearchData`
   */
  logErrorControllerQuerySearch = (query: LogErrorControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<LogErrorControllerQuerySearchData, any>({
      path: `/api/log-error/query`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
 * No description
 *
 * @tags Log Error
 * @name LogErrorControllerSendLog
 * @request POST:/api/log-error/send-log
 * @response `201` `LogErrorControllerSendLogData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  logErrorControllerSendLog = (data: SendLogDto, params: RequestParams = {}) =>
    this.http.request<LogErrorControllerSendLogData, LogErrorControllerSendLogError>({
      path: `/api/log-error/send-log`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Error
   * @name LogErrorControllerGetByGroup
   * @request GET:/api/log-error/by-group
   * @secure
   * @response `200` `LogErrorControllerGetByGroupData`
   */
  logErrorControllerGetByGroup = (query: LogErrorControllerGetByGroupParams, params: RequestParams = {}) =>
    this.http.request<LogErrorControllerGetByGroupData, any>({
      path: `/api/log-error/by-group`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Error
   * @name LogErrorControllerGetOne
   * @request GET:/api/log-error/{deviceCode}
   * @secure
   * @response `200` `LogErrorControllerGetOneData`
   */
  logErrorControllerGetOne = ({ deviceCode, ...query }: LogErrorControllerGetOneParams, params: RequestParams = {}) =>
    this.http.request<LogErrorControllerGetOneData, any>({
      path: `/api/log-error/${deviceCode}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Error
   * @name LogErrorControllerDelete
   * @request DELETE:/api/log-error
   * @secure
   * @response `200` `LogErrorControllerDeleteData`
   */
  logErrorControllerDelete = (query: LogErrorControllerDeleteParams, params: RequestParams = {}) =>
    this.http.request<LogErrorControllerDeleteData, any>({
      path: `/api/log-error`,
      method: "DELETE",
      query: query,
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Notification
 * @name NotificationControllerUpdateNotifications
 * @request PATCH:/api/notification
 * @response `200` `NotificationControllerUpdateNotificationsData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "There is no subscription of authed user",
    thing?: "NOTIFICATION_USERID",

}`
 */
  notificationControllerUpdateNotifications = (data: UpdateNotificationsDto, params: RequestParams = {}) =>
    this.http.request<NotificationControllerUpdateNotificationsData, NotificationControllerUpdateNotificationsError>({
      path: `/api/notification`,
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
 * @request GET:/api/notification
 * @response `200` `NotificationControllerGetNotificationsData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "There is no subscription of authed user",
    thing?: "NOTIFICATION_USERID",

}`
 */
  notificationControllerGetNotifications = (params: RequestParams = {}) =>
    this.http.request<NotificationControllerGetNotificationsData, NotificationControllerGetNotificationsError>({
      path: `/api/notification`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Notification
   * @name NotificationControllerGetTelegramLink
   * @request GET:/api/notification/telegram-link
   * @response `200` `NotificationControllerGetTelegramLinkData`
   */
  notificationControllerGetTelegramLink = (params: RequestParams = {}) =>
    this.http.request<NotificationControllerGetTelegramLinkData, any>({
      path: `/api/notification/telegram-link`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Info
   * @name LogInfoControllerQuerySearch
   * @request GET:/api/log-info/query
   * @response `200` `LogInfoControllerQuerySearchData`
   */
  logInfoControllerQuerySearch = (query: LogInfoControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<LogInfoControllerQuerySearchData, any>({
      path: `/api/log-info/query`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Info
   * @name LogInfoControllerSendLog
   * @request POST:/api/log-info/send-log
   * @response `201` `LogInfoControllerSendLogData`
   */
  logInfoControllerSendLog = (data: SendLogDto, params: RequestParams = {}) =>
    this.http.request<LogInfoControllerSendLogData, any>({
      path: `/api/log-info/send-log`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Info
   * @name LogInfoControllerGetByGroup
   * @request GET:/api/log-info/group
   * @secure
   * @response `200` `LogInfoControllerGetByGroupData`
   */
  logInfoControllerGetByGroup = (query: LogInfoControllerGetByGroupParams, params: RequestParams = {}) =>
    this.http.request<LogInfoControllerGetByGroupData, any>({
      path: `/api/log-info/group`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Info
   * @name LogInfoControllerGetOne
   * @request GET:/api/log-info/{deviceCode}
   * @secure
   * @response `200` `LogInfoControllerGetOneData`
   */
  logInfoControllerGetOne = ({ deviceCode, ...query }: LogInfoControllerGetOneParams, params: RequestParams = {}) =>
    this.http.request<LogInfoControllerGetOneData, any>({
      path: `/api/log-info/${deviceCode}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Log Info
   * @name LogInfoControllerDelete
   * @request DELETE:/api/log-info
   * @secure
   * @response `200` `LogInfoControllerDeleteData`
   */
  logInfoControllerDelete = (query: LogInfoControllerDeleteParams, params: RequestParams = {}) =>
    this.http.request<LogInfoControllerDeleteData, any>({
      path: `/api/log-info`,
      method: "DELETE",
      query: query,
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Goal Achieve
 * @name GoalAchieveControllerAchieveGoal
 * @request POST:/api/goal-achieve
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
      path: `/api/goal-achieve`,
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
   * @request GET:/api/goal-achieve/query
   * @secure
   * @response `200` `GoalAchieveControllerQuerySearchData`
   */
  goalAchieveControllerQuerySearch = (query: GoalAchieveControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<GoalAchieveControllerQuerySearchData, any>({
      path: `/api/goal-achieve/query`,
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
   * @request GET:/api/goal-achieve/group
   * @secure
   * @response `200` `GoalAchieveControllerGetByGroupWithDevicesData`
   */
  goalAchieveControllerGetByGroupWithDevices = (
    query: GoalAchieveControllerGetByGroupWithDevicesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<GoalAchieveControllerGetByGroupWithDevicesData, any>({
      path: `/api/goal-achieve/group`,
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
   * @request GET:/api/goal-achieve/group/day
   * @secure
   * @response `200` `GoalAchieveControllerGetByDayData`
   */
  goalAchieveControllerGetByDay = (query: GoalAchieveControllerGetByDayParams, params: RequestParams = {}) =>
    this.http.request<GoalAchieveControllerGetByDayData, any>({
      path: `/api/goal-achieve/group/day`,
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
   * @request GET:/api/goal-achieve/group/day-with-devices
   * @secure
   * @response `200` `GoalAchieveControllerGetByDayWithDevicesData`
   */
  goalAchieveControllerGetByDayWithDevices = (
    query: GoalAchieveControllerGetByDayWithDevicesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<GoalAchieveControllerGetByDayWithDevicesData, any>({
      path: `/api/goal-achieve/group/day-with-devices`,
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
   * @request GET:/api/goal-achieve/group/day-with-device
   * @secure
   * @response `200` `GoalAchieveControllerGetByDayWithDeviceData`
   */
  goalAchieveControllerGetByDayWithDevice = (
    query: GoalAchieveControllerGetByDayWithDeviceParams,
    params: RequestParams = {},
  ) =>
    this.http.request<GoalAchieveControllerGetByDayWithDeviceData, any>({
      path: `/api/goal-achieve/group/day-with-device`,
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
   * @request GET:/api/goal-achieve/group/hour
   * @secure
   * @response `200` `GoalAchieveControllerGetByHourData`
   */
  goalAchieveControllerGetByHour = (query: GoalAchieveControllerGetByHourParams, params: RequestParams = {}) =>
    this.http.request<GoalAchieveControllerGetByHourData, any>({
      path: `/api/goal-achieve/group/hour`,
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
   * @request GET:/api/goal-achieve/group/hour-with-devices
   * @secure
   * @response `200` `GoalAchieveControllerGetByHourWithDevicesData`
   */
  goalAchieveControllerGetByHourWithDevices = (
    query: GoalAchieveControllerGetByHourWithDevicesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<GoalAchieveControllerGetByHourWithDevicesData, any>({
      path: `/api/goal-achieve/group/hour-with-devices`,
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
   * @request GET:/api/goal-achieve/group/hour-with-device
   * @secure
   * @response `200` `GoalAchieveControllerGetByHourWithDeviceData`
   */
  goalAchieveControllerGetByHourWithDevice = (
    query: GoalAchieveControllerGetByHourWithDeviceParams,
    params: RequestParams = {},
  ) =>
    this.http.request<GoalAchieveControllerGetByHourWithDeviceData, any>({
      path: `/api/goal-achieve/group/hour-with-device`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Failure
   * @name FailureControllerQuerySearch
   * @request GET:/api/failure/query
   * @secure
   * @response `200` `FailureControllerQuerySearchData`
   */
  failureControllerQuerySearch = (query: FailureControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<FailureControllerQuerySearchData, any>({
      path: `/api/failure/query`,
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
   * @request PATCH:/api/failure/comment/{id}
   * @secure
   * @response `200` `FailureControllerCommentDeviceFailureData`
   */
  failureControllerCommentDeviceFailure = (id: number, data: CommentFailureDto, params: RequestParams = {}) =>
    this.http.request<FailureControllerCommentDeviceFailureData, any>({
      path: `/api/failure/comment/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Failure Notification
 * @name FailureNotificationControllerCheck
 * @request POST:/api/failure-notification/{failureId}
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
      path: `/api/failure-notification/${failureId}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Failure Notification
   * @name FailureNotificationControllerCheckAllNotifications
   * @request POST:/api/failure-notification
   * @response `204` `FailureNotificationControllerCheckAllNotificationsData`
   */
  failureNotificationControllerCheckAllNotifications = (params: RequestParams = {}) =>
    this.http.request<FailureNotificationControllerCheckAllNotificationsData, any>({
      path: `/api/failure-notification`,
      method: "POST",
      ...params,
    });
  /**
 * No description
 *
 * @tags Failure Notification
 * @name FailureNotificationControllerGetNotifications
 * @request GET:/api/failure-notification
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
      path: `/api/failure-notification`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Applications
   * @name ApplicationControllerQuerySearch
   * @request GET:/api/application/query
   * @secure
   * @response `200` `ApplicationControllerQuerySearchData`
   */
  applicationControllerQuerySearch = (query: ApplicationControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<ApplicationControllerQuerySearchData, any>({
      path: `/api/application/query`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
 * No description
 *
 * @tags Applications
 * @name ApplicationControllerUpload
 * @request POST:/api/application/{name}/upload
 * @secure
 * @response `201` `ApplicationControllerUploadData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Application with this name did not find",
    thing?: "APPLICATION_NAME",

}`
 */
  applicationControllerUpload = (name: string, data: ApplicationControllerUploadPayload, params: RequestParams = {}) =>
    this.http.request<ApplicationControllerUploadData, ApplicationControllerUploadError>({
      path: `/api/application/${name}/upload`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
 * No description
 *
 * @tags Applications
 * @name ApplicationControllerCreate
 * @request POST:/api/application
 * @secure
 * @response `201` `ApplicationControllerCreateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Application with this name already exist",
    thing?: "APPLICATION_NAME",

}`
 */
  applicationControllerCreate = (data: CreateApplicationDto, params: RequestParams = {}) =>
    this.http.request<ApplicationControllerCreateData, ApplicationControllerCreateError>({
      path: `/api/application`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Applications
 * @name ApplicationControllerUpdate
 * @request PATCH:/api/application/{name}
 * @secure
 * @response `200` `ApplicationControllerUpdateData`
 * @response `400` `{
    type?: "UNIQUE",
    message?: "Application with this name already exist",
    thing?: "APPLICATION_NAME",

}`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Application with this name did not find",
    thing?: "APPLICATION_NAME",

}`
 */
  applicationControllerUpdate = (name: string, data: UpdateApplicationDto, params: RequestParams = {}) =>
    this.http.request<ApplicationControllerUpdateData, ApplicationControllerUpdateError>({
      path: `/api/application/${name}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Applications
 * @name ApplicationControllerDelete
 * @request DELETE:/api/application/{name}
 * @secure
 * @response `200` `ApplicationControllerDeleteData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Application with this name did not find",
    thing?: "APPLICATION_NAME",

}`
 */
  applicationControllerDelete = (name: string, params: RequestParams = {}) =>
    this.http.request<ApplicationControllerDeleteData, ApplicationControllerDeleteError>({
      path: `/api/application/${name}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Camera
   * @name CameraControllerQuery
   * @request GET:/api/camera/query
   * @response `200` `CameraControllerQueryData`
   */
  cameraControllerQuery = (query: CameraControllerQueryParams, params: RequestParams = {}) =>
    this.http.request<CameraControllerQueryData, any>({
      path: `/api/camera/query`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
 * No description
 *
 * @tags Camera
 * @name CameraControllerCreate
 * @request POST:/api/camera
 * @response `201` `CameraControllerCreateData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Organization with this id dit not find",
    thing?: "ORGANIZATION_ID",

}`
 */
  cameraControllerCreate = (data: CreateCameraDto, params: RequestParams = {}) =>
    this.http.request<CameraControllerCreateData, CameraControllerCreateError>({
      path: `/api/camera`,
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
 * @request PATCH:/api/camera/{id}
 * @response `200` `CameraControllerUpdateData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Camera with this id did not find",
    thing?: "CAMERA_ID",

}`
 */
  cameraControllerUpdate = (id: number, data: UpdateCameraDto, params: RequestParams = {}) =>
    this.http.request<CameraControllerUpdateData, CameraControllerUpdateError>({
      path: `/api/camera/${id}`,
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
 * @request DELETE:/api/camera/{id}
 * @response `200` `CameraControllerRemoveData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Camera with this id did not find",
    thing?: "CAMERA_ID",

}`
 */
  cameraControllerRemove = (id: number, params: RequestParams = {}) =>
    this.http.request<CameraControllerRemoveData, CameraControllerRemoveError>({
      path: `/api/camera/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Speech
   * @name SpeechControllerRecognize
   * @request POST:/api/speech
   * @response `201` `SpeechControllerRecognizeData`
   */
  speechControllerRecognize = (data: SpeechControllerRecognizePayload, params: RequestParams = {}) =>
    this.http.request<SpeechControllerRecognizeData, any>({
      path: `/api/speech`,
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
   * @request GET:/api/speech/query
   * @response `200` `SpeechControllerQuerySearchData`
   */
  speechControllerQuerySearch = (query: SpeechControllerQuerySearchParams, params: RequestParams = {}) =>
    this.http.request<SpeechControllerQuerySearchData, any>({
      path: `/api/speech/query`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
 * No description
 *
 * @tags Speech
 * @name SpeechControllerDelete
 * @request DELETE:/api/speech/{id}
 * @response `200` `SpeechControllerDeleteData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  speechControllerDelete = (id: number, params: RequestParams = {}) =>
    this.http.request<SpeechControllerDeleteData, SpeechControllerDeleteError>({
      path: `/api/speech/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
 * No description
 *
 * @tags Speech
 * @name SpeechControllerUpdate
 * @request PATCH:/api/speech/{id}
 * @response `200` `SpeechControllerUpdateData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "Device with this id did not find",
    thing?: "DEVICE_ID",

}`
 */
  speechControllerUpdate = (id: number, data: UpdateSpeechDto, params: RequestParams = {}) =>
    this.http.request<SpeechControllerUpdateData, SpeechControllerUpdateError>({
      path: `/api/speech/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
 * No description
 *
 * @tags Dadata
 * @name DadataControllerAddressSuggest
 * @request GET:/api/dadata
 * @response `200` `DadataControllerAddressSuggestData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "No one suggestion found",
    thing?: "DADATA_SUGGESTION",

}`
 */
  dadataControllerAddressSuggest = (query: DadataControllerAddressSuggestParams, params: RequestParams = {}) =>
    this.http.request<DadataControllerAddressSuggestData, DadataControllerAddressSuggestError>({
      path: `/api/dadata`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Stat
   * @name StatControllerGetMonitoring
   * @request GET:/api/stat/monitoring
   * @response `200` `StatControllerGetMonitoringData`
   */
  statControllerGetMonitoring = (query: StatControllerGetMonitoringParams, params: RequestParams = {}) =>
    this.http.request<StatControllerGetMonitoringData, any>({
      path: `/api/stat/monitoring`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Stat
   * @name StatControllerGetActivity
   * @request GET:/api/stat/activity
   * @response `200` `StatControllerGetActivityData`
   */
  statControllerGetActivity = (query: StatControllerGetActivityParams, params: RequestParams = {}) =>
    this.http.request<StatControllerGetActivityData, any>({
      path: `/api/stat/activity`,
      method: "GET",
      query: query,
      ...params,
    });
}
