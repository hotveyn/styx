import { Rule } from "antd/es/form";
import { Dayjs } from "dayjs";
import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { Content } from "vanilla-jsoneditor";
import {
  ChangeAccessTokenLifeTimeDto,
  ChangeDadataCredentialsDto,
  ChangeRefreshTokenLifeTimeDto,
  ChangeSpeechCredentialsDto,
  ChangeTelegramBotNameDto,
  ChangeTelegramBotTokenDto,
  DeviceEntity,
  GoalEntity,
  UserEntity,
} from "../api/data-contracts";

export interface IDrawer {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  width?: string;
  title: string;
  children: ReactNode;
}

export type ObserverSelectEntityType = "organizations" | "goals" | "devices";

export type VisibleFormEntity = ((UserEntity | DeviceEntity | GoalEntity) & {
  organizationId: string | null;
}) &
  object;

export interface IFormItems<T = object> {
  locales: {
    label: string;
    placeholder?: string;
  };
  name: string;
  initialValue: string | number | null | (string | number)[];
  observerSelect?: {
    entityType: ObserverSelectEntityType;
    formVisibleEntity?: T | null;
    valueKey?: keyof VisibleFormEntity;
  };
  select?: {
    options?: { label: string; value: string | number }[] | undefined;
    searchValue?: string;
    onSearch?: (value: string) => void;
    mode?: "multiple" | "tags";
    allowClear?: boolean;
  };
  json?: {
    content: Content;
    handler: (content: Content) => void;
  };
  inputType: InputType;
  extraField?: ReactElement;
  maxContentLength?: number;
  visibilityToggle?: {
    onVisibleChange: Dispatch<SetStateAction<boolean>>;
    visible: boolean;
  };
  rules: Rule[];
  span?: number;
}

export type IFormFields<T = object> = {
  columnSpan: number;
  items: (IFormItems<T> | null)[];
};

export interface DateFilters {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export type InputType =
  | "input"
  | "password"
  | "select"
  | "observerSelect"
  | "json"
  | "address";

export type IDrawerHandler<T> = (
  isOpen: boolean,
  drawerState: DrawerState,
  entity: T | null
) => void;

export type ISshHandler<T> = (isOpen: boolean, entity: T | null) => void;

export type NotificationType = "success" | "info" | "warning" | "error";

export type DrawerState = "add" | "edit" | "view" | "";

export type LogsType = "info" | "error";

export type ReportPeriod = "month" | "day";

export type SystemParamType =
  | "DEVICE_DETECT_INTERVAL"
  | "SPEECH_CREDENTIALS"
  | "REFRESH_TOKEN_LIFE_TIME"
  | "ACCESS_TOKEN_LIFE_TIME"
  | "DADATA_CREDENTIALS"
  | "TELEGRAM_BOT_TOKEN"
  | "TELEGRAM_BOT_NAME";

export type SystemParamDto = ChangeSpeechCredentialsDto &
  ChangeRefreshTokenLifeTimeDto &
  ChangeAccessTokenLifeTimeDto &
  ChangeDadataCredentialsDto &
  ChangeTelegramBotTokenDto &
  ChangeTelegramBotNameDto;
