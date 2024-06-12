import { TFunction } from "i18next";

export const getNavLabels = (t: TFunction<"translation">) => ({
  organizations: t("titles.organizations"),
  users: t("titles.users"),
  params: t("titles.params"),
  cameras: t("titles.cameras"),
  devices: t("titles.devices"),
  device: t("titles.device"),
  logsDevice: t("titles.logsDevice"),
  goals: t("titles.goals"),
  goalList: t("titles.goalList"),
  goalsAchieve: t("titles.goalsAchieve"),
  achievedGoals: t("titles.achievedGoals"),
  applications: t("titles.applications"),
  statistics: t("titles.statistics"),
  monitoring: t("titles.monitoring"),
  reports: t("titles.reports"),
  docs: t("titles.docs"),
});

export const formatDateTimeType = "DD.MM.YYYY HH:mm:ss";
export const formatDateType = "DD.MM.YYYY";

export const maxContentLengthList = {
  id: 18,
  name: 50,
  description: 100,
  fullname: 50,
  login: 50,
  email: 50,
  port: 5,
  ip: 50,
  address: 200,
  geo: 50,
  soft: 50,
  password: 200,
};

export const defaultMaxContentLength = 256;

export const regExpList = {
  ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  port: /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/,
  email:
    /^[a-zA-Z0-9а-яА-ЯёЁ]+(?:[!#$%&'*+-/=?^_`{}|][a-zA-Z0-9а-яА-ЯёЁ]+)*@[a-zA-Z0-9а-яА-ЯёЁ-]+(?:\.[a-zA-Z0-9а-яА-ЯёЁ-]+)*(?:\.(ru|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum))$/,
  nospace: /^\S*$/,
  whitespace: /^[^\s]+(\s+[^\s]+)*$/,
  url: /^([a-zA-Z]+:\/\/)?((([a-z\d]([a-z\d-]*[a-z\\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i,
};

export const refetchInterval = 10000;

export const statusesColor: {
  [key: string]: string;
} = {
  NEW: "cyan",
  WAITED: "orange",
  WORK: "green",
  STOPPED: "red",
};

export const allowFileTypes = {
  zip: "application/x-tar, application/x-gzip",
};
