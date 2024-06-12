import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";
import {
  ChangeAccessTokenLifeTimeDto,
  ChangeDadataCredentialsDto,
  ChangeDeviceDetectIntervalDto,
  ChangeRefreshTokenLifeTimeDto,
  ChangeSpeechCredentialsDto,
  ChangeTelegramBotNameDto,
  ChangeTelegramBotTokenDto,
} from "../../api/data-contracts";
import { IFilterStore } from "../../store/FilterStore";

const client = new Api(axiosInstance);

const getParams = async (filters: IFilterStore) => {
  const rewrittenParams = {
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
  };

  const res = await client.parameterControllerGetAll(rewrittenParams);

  return res.data;
};

const editDeviceDetectTime = async (data: ChangeDeviceDetectIntervalDto) => {
  const res = await client.parameterControllerChangeDeviceDetectInterval(data);

  return res.data;
};

const editSpeechCredentials = async (data: ChangeSpeechCredentialsDto) => {
  const res = await client.parameterControllerChangeSpeechCredentials(data);

  return res.data;
};

const editRefreshTokenLifeTime = async (
  data: ChangeRefreshTokenLifeTimeDto
) => {
  const res = await client.parameterControllerChangeRefreshTokenLifeTime(data);

  return res.data;
};

const editAccessTokenLifeTime = async (data: ChangeAccessTokenLifeTimeDto) => {
  const res = await client.parameterControllerChangeAccessTokenLifeTime(data);

  return res.data;
};

const editDadataCredentials = async (data: ChangeDadataCredentialsDto) => {
  const res = await client.parameterControllerChangeDadataCredentials(data);

  return res.data;
};

const editTelegramBotToken = async (data: ChangeTelegramBotTokenDto) => {
  const res = await client.parameterControllerChangeTelegramBotToken(data);

  return res.data;
};

const editTelegramBotName = async (data: ChangeTelegramBotNameDto) => {
  const res = await client.parameterControllerChangeTelegramBotName(data);

  return res.data;
};

const api = {
  getParams,
  editDeviceDetectTime,
  editSpeechCredentials,
  editRefreshTokenLifeTime,
  editAccessTokenLifeTime,
  editDadataCredentials,
  editTelegramBotToken,
  editTelegramBotName,
};

export default api;
