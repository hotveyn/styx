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

export interface ChangeAccessTokenLifeTimeDto {
  /** @min 1 */
  value: number;
}

export interface ParameterChangeEntity {
  id: string;
  userId: string;
  parameterId: string;
  was: string;
  became: string;
  user: {
    name: string;
  };
}

export interface ParameterEntity {
  name: string;
  code: string;
  description: string;
  value: string;
  parameterChanges: ParameterChangeEntity[];
}

export interface ChangeTelegramBotTokenDto {
  /**
   * @minLength 0
   * @maxLength 200
   */
  value: string;
}

export interface ChangeTelegramBotNameDto {
  /**
   * @minLength 0
   * @maxLength 200
   */
  value: string;
}

export interface ChangeDeviceDetectIntervalDto {
  /**
   * @min 1
   * @max 2147483646
   */
  value: number;
}

export interface ChangeRefreshTokenLifeTimeDto {
  /** @min 1 */
  value: number;
}

export interface ChangeSpeechCredentialsDto {
  /**
   * @minLength 0
   * @maxLength 200
   */
  value: string;
}

export interface ChangeDadataCredentialsDto {
  /**
   * @minLength 0
   * @maxLength 200
   */
  value: string;
}

export interface ParameterEntityWithPagination {
  count: string;
  data: ParameterEntity[];
}

export interface ParameterChangeEntityWithPagination {
  count: string;
  data: ParameterChangeEntity[];
}

export interface CreateUserDto {
  /** @maxLength 256 */
  name: string;
  /** @maxLength 256 */
  login: string;
  /** @maxLength 256 */
  password: string;
  organizationId?: string;
  /** @maxLength 256 */
  email: string;
  /** @maxLength 3000 */
  additionalData?: string;
}

export interface UserEntity {
  id: string;
  name: string;
  login: string;
  code: string;
  organizationId: string | null;
  email: string | null;
  additionalData: string | null;
  /** @format date-time */
  isDeleted: string | null;
  organization: {
    name: string;
  };
  /** @format date-time */
  createdAt: string | null;
}

export interface UpdateUserDto {
  /** @maxLength 256 */
  name?: string;
  /** @maxLength 256 */
  login?: string;
  /** @maxLength 256 */
  password?: string;
  organizationId?: string;
  /** @maxLength 256 */
  email?: string;
  /** @maxLength 3000 */
  additionalData?: string;
}

export interface UserEntityWithPagination {
  count: string;
  data: UserEntity[];
}

export interface LoginDto {
  /**
   * @minLength 0
   * @maxLength 200
   */
  credential: string;
  /**
   * @minLength 0
   * @maxLength 200
   */
  password: string;
}

export interface CreateDeviceDto {
  ip: string;
  port: string;
  /** @maxLength 256 */
  name: string;
  /** @maxLength 256 */
  deviceType: string;
  /** @maxLength 256 */
  address: string;
  /** @maxLength 256 */
  geo: string;
  /** @maxLength 256 */
  softwareType: string;
  /** @maxLength 256 */
  softwareVersion: string;
  status: object;
  organizationId?: string;
  /** @maxLength 2000 */
  sshParameters?: string;
  /** @maxLength 256 */
  code?: string;
  /** @maxLength 3000 */
  additionalData?: string;
}

export interface OrganizationName {
  name: string;
}

export interface DeviceEntity {
  id: string;
  code: string;
  ip: string;
  port: string;
  name: string;
  deviceType: string;
  address: string;
  geo: string;
  softwareType: string;
  softwareVersion: string;
  organization: OrganizationName;
  status: string;
  sshParameters: string;
  isAlive: boolean;
  /** @format date-time */
  lastPingDate: string | null;
  additionalData: string | null;
  /** @format date-time */
  isDeleted: string | null;
  /** @format date-time */
  createdAt: string | null;
}

export interface DeviceEntityWithPagination {
  count: string;
  data: DeviceEntity[];
}

export interface UpdateDeviceDto {
  ip?: string;
  port?: string;
  /** @maxLength 256 */
  name?: string;
  /** @maxLength 256 */
  deviceType?: string;
  /** @maxLength 256 */
  address?: string;
  /** @maxLength 256 */
  geo?: string;
  /** @maxLength 256 */
  softwareType?: string;
  /** @maxLength 256 */
  softwareVersion?: string;
  status?: object;
  organizationId?: string;
  /** @maxLength 2000 */
  sshParameters?: string;
  /** @maxLength 256 */
  code?: string;
  /** @maxLength 3000 */
  additionalData?: string;
}

export interface CreateGoalDto {
  /** @maxLength 256 */
  name: string;
  /** @maxLength 256 */
  description: string;
  organizationId: string;
  /** @maxLength 256 */
  code?: string;
}

export interface GoalEntity {
  id: string;
  name: string;
  description: string;
  code: string;
  organizationId: string;
  /** @format date-time */
  isDeleted: string | null;
  organization: {
    name: string;
  };
  /** @format date-time */
  createdAt: string | null;
}

export interface UpdateGoalDto {
  /** @maxLength 256 */
  name?: string;
  /** @maxLength 256 */
  description?: string;
  /** @maxLength 256 */
  code?: string;
}

export interface GoalEntityWithPagination {
  count: string;
  data: GoalEntity[];
}

export interface CreateOrganizationDto {
  /** @maxLength 256 */
  name: string;
}

export interface OrganizationChildCounter {
  goals: number;
  users: number;
  devices: number;
}

export interface OrganizationEntity {
  id: string;
  name: string;
  _count: OrganizationChildCounter;
  /** @format date-time */
  isDeleted: string | null;
  /** @format date-time */
  createdAt: string | null;
}

export interface UpdateOrganizationDto {
  /** @maxLength 256 */
  name?: string;
}

export interface OrganizationEntityWithPagination {
  count: string;
  data: OrganizationEntity[];
}

export interface LogErrorEntity {
  id: string;
  deviceCode: string;
  body: object;
  /** @format date-time */
  requestTime: string;
  device: {
    name: string;
    code: string;
  };
}

export interface LogErrorEntityWithPagination {
  count: string;
  data: LogErrorEntity[];
}

export interface SendLogDto {
  deviceCode: string;
  body: string;
  requestTime: string;
}

export interface LogErrorGroupEntity {
  _count: {
    _all: number;
  };
  deviceCode: string;
}

export interface LogErrorGroupEntityWithPagination {
  count: string;
  data: LogErrorGroupEntity[];
}

export interface LogErrorDeviceEntity {
  count: string;
  data: LogErrorEntity[];
}

export interface UpdateNotificationsDto {
  failure: boolean;
  errorLog: boolean;
}

export interface NotificationEntity {
  userId: string;
  failure: boolean;
  errorLog: boolean;
}

export interface TelegramLinkEntity {
  link: string;
}

export interface LogInfoEntity {
  id: string;
  deviceCode: string;
  body: object;
  /** @format date-time */
  requestTime: string;
  device: {
    name: string;
    code: string;
  };
}

export interface LogInfoEntityWithPagination {
  count: string;
  data: LogInfoEntity[];
}

export interface LogInfoGroupEntity {
  _count: {
    _all: number;
  };
  deviceCode: string;
}

export interface LogInfoGroupEntityWithPagination {
  count: string;
  data: LogInfoGroupEntity[];
}

export interface LogInfoDeviceEntity {
  count: string;
  data: LogInfoEntity[];
}

export interface AchieveGoalDto {
  /**
   * @minLength 1
   * @maxLength 200
   */
  goalCode: string;
  /**
   * @minLength 1
   * @maxLength 200
   */
  deviceCode: string;
}

export interface GoalAchieveEntity {
  id: string;
  goalId: string;
  deviceId: string;
  /** @format date-time */
  isDeleted: string | null;
  /** @format date-time */
  createdAt: string | null;
}

export interface GoalAchieveQueryEntity {
  id: string;
  goalId: string;
  deviceId: string;
  goal: {
    name: string;
    code: string;
  };
  device: {
    name: string;
    code: string;
  };
  /** @format date-time */
  createdAt: string | null;
}

export interface GoalAchieveQueryEntityWithPagination {
  count: string;
  data: GoalAchieveQueryEntity[];
}

export interface GoalAchieveGroupEntity {
  goalId: string;
  deviceId: string;
  count: string;
  deviceName: string;
  deviceCode: string;
  goalName: string;
  goalCode: string;
}

export interface GoalAchieveGroupEntityWithPagination {
  count: string;
  data: GoalAchieveGroupEntity[];
}

export interface ByDayEntity {
  goalId: string;
  count: string;
  goalName: string;
  day: number;
}

export interface ByDayEntityWithPagination {
  count: string;
  data: ByDayEntity[];
}

export interface ByDayWithDevicesEntity {
  goalId: string;
  count: string;
  goalName: string;
  deviceName: string;
  deviceId: string;
  day: number;
}

export interface ByDayWithDevicesEntityWithPagination {
  count: string;
  data: ByDayWithDevicesEntity[];
}

export interface ByDayWithDeviceEntity {
  goalId: string;
  count: string;
  goalName: string;
  day: number;
}

export interface ByDayWithDeviceEntityWithPagination {
  count: string;
  data: ByDayWithDeviceEntity[];
}

export interface ByHourEntity {
  goalId: string;
  count: string;
  goalName: string;
  hour: number;
}

export interface ByHourEntityWithPagination {
  count: string;
  data: ByHourEntity[];
}

export interface ByHourWithDevicesEntity {
  goalId: string;
  count: string;
  goalName: string;
  deviceName: string;
  deviceId: string;
  hour: number;
}

export interface ByHourWithDevicesEntityWithPagination {
  count: string;
  data: ByHourWithDevicesEntity[];
}

export interface ByHourWithDeviceEntity {
  goalId: string;
  count: string;
  goalName: string;
  hour: number;
}

export interface ByHourWithDeviceEntityWithPagination {
  count: string;
  data: ByHourWithDeviceEntity[];
}

export interface FailureEntity {
  id: string;
  deviceId: string;
  /** @format date-time */
  reparedDate: string;
  comment: string;
  /** @format date-time */
  createdAt: string | null;
}

export interface FailureEntityWithPagination {
  count: string;
  data: FailureEntity[];
}

export interface CommentFailureDto {
  /** @maxLength 256 */
  commment: string;
}

export interface FailureNotificationEntity {
  failureId: string;
  /** @format date-time */
  userId: string;
  /** @format date-time */
  createdAt: string | null;
  /** @format date-time */
  updatedAt: string | null;
}

export interface LongFailureEntity {
  id: string;
  deviceId: string;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  comment: string;
  checked: boolean;
  device: {
    name: string;
    code: string;
  };
  /** @format date-time */
  createdAt: string | null;
}

export interface LongFailureEntityWithPagination {
  count: string;
  data: LongFailureEntity[];
}

export interface ApplicationEntity {
  name: string;
  /** @format date-time */
  createdAt: string;
  unpacked: boolean;
  size: number | null;
}

export interface ApplicationEntityWithPagination {
  count: string;
  data: ApplicationEntity[];
}

export interface CreateApplicationDto {
  /** @maxLength 80 */
  name: string;
}

export interface UpdateApplicationDto {
  /** @maxLength 80 */
  name: string;
}

export interface CameraEntity {
  id: string;
  name: string;
  link: string;
  /** @format date-time */
  createdAt: string;
  organizationId: string;
  organization: {
    name: string;
  };
}

export interface CameraEntityWithPagination {
  count: string;
  data: CameraEntity[];
}

export interface CreateCameraDto {
  /** @maxLength 256 */
  name: string;
  /** @maxLength 256 */
  link: string;
  /** @maxLength 256 */
  organizationId?: string;
}

export interface UpdateCameraDto {
  /** @maxLength 256 */
  name?: string;
  /** @maxLength 256 */
  link?: string;
}

export interface SpeechEntity {
  id: string;
  fileName: string;
  recognizedText: string;
  apiResult: string;
  /** @format date-time */
  createdAt: string;
  sampleRate: number;
  /** @format date-time */
  recognizedDate: string;
  comment: string;
  name: string;
  status: object;
  compression: object;
}

export interface SpeechEntityWithPagniation {
  count: string;
  data: SpeechEntity[];
}

export interface UpdateSpeechDto {
  /** @maxLength 256 */
  comment?: string;
  /** @maxLength 256 */
  name?: string;
}

export interface SuggestionEntity {
  value: string;
  geo_lat: string;
  geo_lon: string;
}

export interface MonitoringEntity {
  activeDevicesCount: number;
  unactiveDevicesCount: number;
  achievedGoalsCount: number;
  failureCount: number;
  activeFailureCount: number;
  logErrorCount: number;
  logInfoCount: number;
}

export interface ActivityEntity {
  date: string;
  errorCount: number;
  infoCount: number;
  failureCount: number;
}

export interface ActivityEntityWithPagination {
  count: string;
  data: ActivityEntity[];
}

export type ParameterControllerChangeAccessTokenLifeTimeData = ParameterEntity;

export type ParameterControllerChangeTelegramBotTokenData = ParameterEntity;

export type ParameterControllerChangeTelegramBotNameData = ParameterEntity;

export type ParameterControllerChangeDeviceDetectIntervalData = ParameterEntity;

export type ParameterControllerChangeRefreshTokenLifeTimeData = ParameterEntity;

export type ParameterControllerChangeSpeechCredentialsData = ParameterEntity;

export type ParameterControllerChangeDadataCredentialsData = ParameterEntity;

export interface ParameterControllerGetAllParams {
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
}

export type ParameterControllerGetAllData = ParameterEntityWithPagination;

export interface ParameterControllerGetParameterChangesParams {
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "id" | "userId" | "parameterCode" | "was" | "became" | "createdAt" | "updatedAt" | "isDeleted";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
  code: string;
}

export type ParameterControllerGetParameterChangesData = ParameterChangeEntityWithPagination;

export type UserControllerCreateData = UserEntity;

export type UserControllerCreateError =
  | (
      | {
          type?: "UNIQUE";
          message?: "User with this login already exist";
          thing?: "USER_LOGIN";
        }
      | {
          type?: "UNIQUE";
          message?: "User with this email already exist";
          thing?: "USER_EMAIL";
        }
    )
  | {
      type?: "NOT_FOUND";
      message?: "Organization with this id dit not find";
      thing?: "ORGANIZATION_ID";
    };

export type UserControllerUpdateData = UserEntity;

export type UserControllerUpdateError =
  | (
      | {
          type?: "UNIQUE";
          message?: "User with this login already exist";
          thing?: "USER_LOGIN";
        }
      | {
          type?: "UNIQUE";
          message?: "User with this email already exist";
          thing?: "USER_EMAIL";
        }
    )
  | {
      type?: "NOT_FOUND";
      message?: "User with this id dit not find";
      thing?: "USER_ID";
    };

export type UserControllerRemoveData = UserEntity;

export type UserControllerRemoveError =
  | {
      type?: "DELETE";
      message?: "User tried to delete himself";
      thing?: "USER_DELETE";
    }
  | {
      type?: "NOT_FOUND";
      message?: "User with this id dit not find";
      thing?: "USER_ID";
    };

export interface UserControllerQuerySearchParams {
  /** @maxLength 18 */
  id?: string;
  /** @maxLength 18 */
  organizationId?: string;
  /** @maxLength 256 */
  name?: string;
  /** @maxLength 256 */
  login?: string;
  /** @maxLength 256 */
  email?: string;
  isDeleted?: boolean;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?:
    | "id"
    | "code"
    | "name"
    | "login"
    | "password"
    | "organizationId"
    | "email"
    | "additionalData"
    | "createdAt"
    | "updatedAt"
    | "isDeleted";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
}

export type UserControllerQuerySearchData = UserEntityWithPagination;

export type UserControllerGetProfileData = UserEntity;

export type AuthControllerLoginData = any;

export type AuthControllerLoginError = {
  type?: "AUTH";
  message?: "Authentication failed";
  thing?: "USER_AUTH";
};

export type AuthControllerLogoutData = any;

export type DeviceControllerPingData = any;

export type DeviceControllerCreateData = DeviceEntity;

export type DeviceControllerCreateError =
  | {
      type?: "UNIQUE";
      message?: "Device with this code already exist";
      thing?: "DEVICE_CODE";
    }
  | {
      type?: "NOT_FOUND";
      message?: "Organization with this id dit not find";
      thing?: "ORGANIZATION_ID";
    };

export interface DeviceControllerQuerySearchParams {
  status?: "NEW" | "WAITED" | "WORK" | "STOPPED";
  /** @maxLength 18 */
  id?: string;
  /** @maxLength 256 */
  ip?: string;
  /** @maxLength 256 */
  port?: string;
  /** @maxLength 256 */
  name?: string;
  /** @maxLength 256 */
  deviceType?: string;
  /** @maxLength 256 */
  address?: string;
  /** @maxLength 256 */
  geo?: string;
  /** @maxLength 256 */
  softwareType?: string;
  /** @maxLength 256 */
  softwareVersion?: string;
  /** @maxLength 256 */
  sshParameters?: string;
  /** @maxLength 256 */
  code?: string;
  /** @maxLength 18 */
  organizationId?: string;
  isDeleted?: boolean;
  isAlive?: boolean;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?:
    | "id"
    | "code"
    | "ip"
    | "port"
    | "name"
    | "deviceType"
    | "address"
    | "geo"
    | "softwareType"
    | "softwareVersion"
    | "organizationId"
    | "status"
    | "sshParameters"
    | "isAlive"
    | "lastActionDate"
    | "additionalData"
    | "createdAt"
    | "updatedAt"
    | "isDeleted";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
}

export type DeviceControllerQuerySearchData = DeviceEntityWithPagination;

export type DeviceControllerUpdateData = DeviceEntity;

export type DeviceControllerUpdateError =
  | {
      type?: "UNIQUE";
      message?: "Device with this code already exist";
      thing?: "DEVICE_CODE";
    }
  | {
      type?: "NOT_FOUND";
      message?: "Device with this id did not find";
      thing?: "DEVICE_ID";
    };

export type DeviceControllerRemoveData = DeviceEntity;

export type DeviceControllerRemoveError = {
  type?: "NOT_FOUND";
  message?: "Device with this id did not find";
  thing?: "DEVICE_ID";
};

export type DeviceControllerGetByCodeData = DeviceEntity;

export type DeviceControllerGetByCodeError = {
  type?: "NOT_FOUND";
  message?: "Device with this id did not find";
  thing?: "DEVICE_ID";
};

export type GoalControllerCreateData = GoalEntity;

export type GoalControllerCreateError =
  | {
      type?: "UNIQUE";
      message?: "Goal with this code already exist";
      thing?: "GOAL_CODE";
    }
  | {
      type?: "NOT_FOUND";
      message?: "Organization with this id dit not find";
      thing?: "ORGANIZATION_ID";
    };

export type GoalControllerUpdateData = GoalEntity;

export type GoalControllerUpdateError =
  | {
      type?: "UNIQUE";
      message?: "Goal with this code already exist";
      thing?: "GOAL_CODE";
    }
  | {
      type?: "NOT_FOUND";
      message?: "Goal with this id did not find";
      thing?: "GOAL_ID";
    };

export type GoalControllerRemoveData = GoalEntity;

export type GoalControllerRemoveError = {
  type?: "NOT_FOUND";
  message?: "Goal with this id did not find";
  thing?: "GOAL_ID";
};

export interface GoalControllerQuerySearchParams {
  /** @maxLength 256 */
  name?: string;
  /** @maxLength 256 */
  code?: string;
  /** @maxLength 18 */
  id?: string;
  /** @maxLength 18 */
  organizationId?: string;
  /** @maxLength 256 */
  description?: string;
  isDeleted?: boolean;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "id" | "name" | "description" | "code" | "organizationId" | "createdAt" | "updatedAt" | "isDeleted";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
}

export type GoalControllerQuerySearchData = GoalEntityWithPagination;

export type OrganizationControllerCreateData = OrganizationEntity;

export type OrganizationControllerCreateError = {
  type?: "UNIQUE";
  message?: "Organization with this name already exists";
  thing?: "ORGANIZATION_NAME";
};

export type OrganizationControllerUpdateData = OrganizationEntity;

export type OrganizationControllerUpdateError =
  | {
      type?: "UNIQUE";
      message?: "Organization with this name already exists";
      thing?: "ORGANIZATION_NAME";
    }
  | {
      type?: "NOT_FOUND";
      message?: "Organization with this id dit not find";
      thing?: "ORGANIZATION_ID";
    };

export type OrganizationControllerRemoveData = OrganizationEntity;

export type OrganizationControllerRemoveError =
  | (
      | {
          type?: "DELETE";
          message?: "Organization has some users";
          thing?: "ORGANIZATION_USERS";
        }
      | {
          type?: "DELETE";
          message?: "Organization has some devicess";
          thing?: "ORGANIZATION_DEVICES";
        }
      | {
          type?: "DELETE";
          message?: "Organization has some goals";
          thing?: "ORGANIZATION_GOALS";
        }
    )
  | {
      type?: "NOT_FOUND";
      message?: "Organization with this id dit not find";
      thing?: "ORGANIZATION_ID";
    };

export interface OrganizationControllerQuerySearchParams {
  /** @maxLength 18 */
  id?: string;
  /** @maxLength 256 */
  name?: string;
  isDeleted?: boolean;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "id" | "name" | "createdAt" | "updatedAt" | "isDeleted";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
}

export type OrganizationControllerQuerySearchData = OrganizationEntityWithPagination;

export interface LogErrorControllerQuerySearchParams {
  /**
   * @minLength 1
   * @maxLength 18
   */
  organizationId?: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  startDate?: string;
  endDate?: string;
  orderBy?: "id" | "deviceCode" | "body" | "requestTime" | "createdAt" | "updatedAt";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type LogErrorControllerQuerySearchData = LogErrorEntityWithPagination;

export type LogErrorControllerSendLogData = LogErrorEntity;

export type LogErrorControllerSendLogError = {
  type?: "NOT_FOUND";
  message?: "Device with this id did not find";
  thing?: "DEVICE_ID";
};

export interface LogErrorControllerGetByGroupParams {
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  startDate: string;
  endDate: string;
}

export type LogErrorControllerGetByGroupData = LogErrorGroupEntityWithPagination;

export interface LogErrorControllerGetOneParams {
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  startDate: string;
  endDate: string;
  deviceCode: string;
}

export type LogErrorControllerGetOneData = LogErrorDeviceEntity;

export interface LogErrorControllerDeleteParams {
  startDate: string;
  endDate: string;
}

export type LogErrorControllerDeleteData = object;

export type NotificationControllerUpdateNotificationsData = NotificationEntity;

export type NotificationControllerUpdateNotificationsError = {
  type?: "NOT_FOUND";
  message?: "There is no subscription of authed user";
  thing?: "NOTIFICATION_USERID";
};

export type NotificationControllerGetNotificationsData = NotificationEntity;

export type NotificationControllerGetNotificationsError = {
  type?: "NOT_FOUND";
  message?: "There is no subscription of authed user";
  thing?: "NOTIFICATION_USERID";
};

export type NotificationControllerGetTelegramLinkData = TelegramLinkEntity;

export interface LogInfoControllerQuerySearchParams {
  /**
   * @minLength 1
   * @maxLength 18
   */
  organizationId?: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  startDate?: string;
  endDate?: string;
  orderBy?: "id" | "deviceCode" | "body" | "requestTime" | "createdAt" | "updatedAt";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type LogInfoControllerQuerySearchData = LogInfoEntityWithPagination;

export type LogInfoControllerSendLogData = LogInfoEntity;

export interface LogInfoControllerGetByGroupParams {
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  startDate: string;
  endDate: string;
}

export type LogInfoControllerGetByGroupData = LogInfoGroupEntityWithPagination;

export interface LogInfoControllerGetOneParams {
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  startDate: string;
  endDate: string;
  deviceCode: string;
}

export type LogInfoControllerGetOneData = LogInfoDeviceEntity;

export interface LogInfoControllerDeleteParams {
  startDate: string;
  endDate: string;
}

export type LogInfoControllerDeleteData = object;

export type GoalAchieveControllerAchieveGoalData = GoalAchieveEntity;

export type GoalAchieveControllerAchieveGoalError =
  | {
      type?: "FORBIDDEN";
      message?: "You haven't acces to this organization";
      thing?: "ORGANIZATION_FORBIDDEN";
    }
  | (
      | {
          type?: "NOT_FOUND";
          message?: "Goal with this code did not find";
          thing?: "GOAL_CODE";
        }
      | {
          type?: "NOT_FOUND";
          message?: "Device with this code did not find";
          thing?: "DEVICE_CODE";
        }
    );

export interface GoalAchieveControllerQuerySearchParams {
  /** @maxLength 18 */
  goalId: string;
  /** @maxLength 18 */
  deviceId?: string;
  isDeleted?: boolean;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  startDate?: string;
  endDate?: string;
  orderBy?: "id" | "goalId" | "deviceId" | "createdAt" | "updatedAt" | "isDeleted";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type GoalAchieveControllerQuerySearchData = GoalAchieveQueryEntityWithPagination;

export interface GoalAchieveControllerGetByGroupWithDevicesParams {
  startDate: string;
  endDate: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "goalId" | "deviceId" | "count" | "deviceName" | "goalName";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type GoalAchieveControllerGetByGroupWithDevicesData = GoalAchieveGroupEntityWithPagination;

export interface GoalAchieveControllerGetByDayParams {
  goalId: string[];
  startDate: string;
  endDate: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "goalId" | "count" | "goalName" | "day";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type GoalAchieveControllerGetByDayData = ByDayEntityWithPagination;

export interface GoalAchieveControllerGetByDayWithDevicesParams {
  startDate: string;
  endDate: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "goalId" | "count" | "goalName" | "day" | "deviceId" | "deviceName";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type GoalAchieveControllerGetByDayWithDevicesData = ByDayWithDevicesEntityWithPagination;

export interface GoalAchieveControllerGetByDayWithDeviceParams {
  deviceId: string;
  goalId: string[];
  startDate: string;
  endDate: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "goalId" | "count" | "goalName" | "day";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type GoalAchieveControllerGetByDayWithDeviceData = ByDayWithDeviceEntityWithPagination;

export interface GoalAchieveControllerGetByHourParams {
  goalId: string[];
  startDate: string;
  endDate: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "goalId" | "count" | "goalName" | "hour";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type GoalAchieveControllerGetByHourData = ByHourEntityWithPagination;

export interface GoalAchieveControllerGetByHourWithDevicesParams {
  startDate: string;
  endDate: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "goalId" | "count" | "goalName" | "hour" | "deviceId" | "deviceName";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type GoalAchieveControllerGetByHourWithDevicesData = ByHourWithDevicesEntityWithPagination;

export interface GoalAchieveControllerGetByHourWithDeviceParams {
  deviceId: string;
  goalId: string[];
  startDate: string;
  endDate: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "goalId" | "count" | "goalName" | "hour";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type GoalAchieveControllerGetByHourWithDeviceData = ByHourWithDeviceEntityWithPagination;

export interface FailureControllerQuerySearchParams {
  /** @maxLength 18 */
  id?: string;
  /** @maxLength 18 */
  deviceId?: string;
  description?: string;
  orderBy?: "id" | "deviceId" | "reparedDate" | "comment" | "createdAt" | "updatedAt" | "isDeleted";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  startDate: string;
  endDate: string;
}

export type FailureControllerQuerySearchData = FailureEntityWithPagination;

export type FailureControllerCommentDeviceFailureData = FailureEntity;

export type FailureNotificationControllerCheckData = FailureNotificationEntity;

export type FailureNotificationControllerCheckError =
  | {
      type?: "UNIQUE";
      message?: "Failure notification already exist";
      thing?: "FAILURE_NOTIFICATION";
    }
  | {
      type?: "NOT_FOUND";
      message?: "Device failure with this id did not find";
      thing?: "DEVICE_FAILURE_ID";
    };

export type FailureNotificationControllerCheckAllNotificationsData = any;

export interface FailureNotificationControllerGetNotificationsParams {
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
}

export type FailureNotificationControllerGetNotificationsData = LongFailureEntityWithPagination;

export type FailureNotificationControllerGetNotificationsError =
  | {
      type?: "UNIQUE";
      message?: "Failure notification already exist";
      thing?: "FAILURE_NOTIFICATION";
    }
  | {
      type?: "NOT_FOUND";
      message?: "Device failure with this id did not find";
      thing?: "DEVICE_FAILURE_ID";
    };

export interface ApplicationControllerQuerySearchParams {
  /** @maxLength 80 */
  name?: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "name" | "unpacked" | "size" | "createdAt" | "updatedAt";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
}

export type ApplicationControllerQuerySearchData = ApplicationEntityWithPagination;

export interface ApplicationControllerUploadPayload {
  /** @format binary */
  app: File;
}

export type ApplicationControllerUploadData = object;

export type ApplicationControllerUploadError = {
  type?: "NOT_FOUND";
  message?: "Application with this name did not find";
  thing?: "APPLICATION_NAME";
};

export type ApplicationControllerCreateData = ApplicationEntity;

export type ApplicationControllerCreateError = {
  type?: "UNIQUE";
  message?: "Application with this name already exist";
  thing?: "APPLICATION_NAME";
};

export type ApplicationControllerUpdateData = ApplicationEntity;

export type ApplicationControllerUpdateError =
  | {
      type?: "UNIQUE";
      message?: "Application with this name already exist";
      thing?: "APPLICATION_NAME";
    }
  | {
      type?: "NOT_FOUND";
      message?: "Application with this name did not find";
      thing?: "APPLICATION_NAME";
    };

export type ApplicationControllerDeleteData = ApplicationEntity;

export type ApplicationControllerDeleteError = {
  type?: "NOT_FOUND";
  message?: "Application with this name did not find";
  thing?: "APPLICATION_NAME";
};

export interface CameraControllerQueryParams {
  /** @maxLength 18 */
  id?: string;
  /** @maxLength 18 */
  organizationId?: string;
  /** @maxLength 256 */
  name?: string;
  /** @maxLength 256 */
  link?: string;
  startDate?: string;
  endDate?: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "id" | "name" | "link" | "organizationId" | "createdAt" | "updatedAt";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type CameraControllerQueryData = CameraEntityWithPagination;

export type CameraControllerCreateData = CameraEntity;

export type CameraControllerCreateError = {
  type?: "NOT_FOUND";
  message?: "Organization with this id dit not find";
  thing?: "ORGANIZATION_ID";
};

export type CameraControllerUpdateData = CameraEntity;

export type CameraControllerUpdateError = {
  type?: "NOT_FOUND";
  message?: "Camera with this id did not find";
  thing?: "CAMERA_ID";
};

export type CameraControllerRemoveData = CameraEntity;

export type CameraControllerRemoveError = {
  type?: "NOT_FOUND";
  message?: "Camera with this id did not find";
  thing?: "CAMERA_ID";
};

export interface SpeechControllerRecognizePayload {
  /** @format binary */
  file: File;
}

export type SpeechControllerRecognizeData = SpeechEntity;

export interface SpeechControllerQuerySearchParams {
  status?: "NEW" | "DONE" | "ERROR";
  compression?: "pcmu" | "pcma";
  /** @maxLength 256 */
  id?: string;
  /** @maxLength 256 */
  fileName?: string;
  /** @maxLength 256 */
  comment?: string;
  /** @maxLength 256 */
  name?: string;
  /** @maxLength 256 */
  text?: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?:
    | "id"
    | "name"
    | "comment"
    | "status"
    | "compression"
    | "sampleRate"
    | "fileName"
    | "recognizedText"
    | "recognizedDate"
    | "apiResult"
    | "createdAt"
    | "updatedAt";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
}

export type SpeechControllerQuerySearchData = SpeechEntityWithPagniation;

export type SpeechControllerDeleteData = SpeechEntity;

export type SpeechControllerDeleteError = {
  type?: "NOT_FOUND";
  message?: "Device with this id did not find";
  thing?: "DEVICE_ID";
};

export type SpeechControllerUpdateData = SpeechEntity;

export type SpeechControllerUpdateError = {
  type?: "NOT_FOUND";
  message?: "Device with this id did not find";
  thing?: "DEVICE_ID";
};

export interface DadataControllerAddressSuggestParams {
  /**
   * @minLength 1
   * @maxLength 100
   */
  query: string;
}

export type DadataControllerAddressSuggestData = SuggestionEntity[];

export type DadataControllerAddressSuggestError = {
  type?: "NOT_FOUND";
  message?: "No one suggestion found";
  thing?: "DADATA_SUGGESTION";
};

export interface StatControllerGetMonitoringParams {
  /**
   * @minLength 1
   * @maxLength 18
   */
  organizationId?: string;
}

export type StatControllerGetMonitoringData = MonitoringEntity;

export interface StatControllerGetActivityParams {
  startDate: string;
  endDate: string;
  /** @min 0 */
  offset?: number;
  /**
   * @min 0
   * @max 100
   * @default 100
   */
  limit?: number;
  orderBy?: "errorCount" | "infoCount" | "failureCount" | "date";
  /** @default "asc" */
  orderDirection?: "asc" | "desc";
}

export type StatControllerGetActivityData = ActivityEntityWithPagination;
