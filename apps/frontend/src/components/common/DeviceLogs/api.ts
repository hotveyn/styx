import dayjs from "dayjs";
import { Api } from "../../../api/Api";
import { axiosInstance } from "../../../api/api.interceptor";
import { IFilterStore } from "../../../store/FilterStore";
import { formatDateUTC } from "../../../utils/formatDateUTC";

const client = {
  info: new Api(axiosInstance).logInfoControllerGetOne,
  groupInfo: new Api(axiosInstance).logInfoControllerQuerySearch,
  error: new Api(axiosInstance).logErrorControllerGetOne,
  groupError: new Api(axiosInstance).logErrorControllerQuerySearch,
  failure: new Api(axiosInstance),
};

const getLogs = async (
  filters: IFilterStore,
  type: string,
  deviceCode: string
) => {
  const period = {
    startDate:
      filters.period.startDate || formatDateUTC(dayjs("01.01.1970 00:00:00")),
    endDate: filters.period.endDate || formatDateUTC(dayjs().endOf("day")),
  };

  const rewrittenParams = {
    deviceCode,
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
    ...period,
  };

  const res = await client[type as "info" | "error"](rewrittenParams);

  return res.data;
};

const getDeviceFailures = async (deviceId: string, filters: IFilterStore) => {
  const period = {
    startDate:
      filters.period.startDate || formatDateUTC(dayjs("01.01.1970 00:00:00")),
    endDate: filters.period.endDate || formatDateUTC(dayjs().endOf("day")),
  };

  const rewrittenParams = {
    deviceId,
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
    ...period,
  };

  const res =
    await client.failure.failureControllerQuerySearch(rewrittenParams);

  return res.data;
};

const getGroupLogs = async (filters: IFilterStore, type: string) => {
  const period = {
    startDate: dayjs().startOf("day").format(),
    endDate: dayjs().endOf("day").format(),
  };

  const organizationId = {
    organizationId: filters.filters.organizationId || undefined,
  };

  const rewrittenParams = {
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
    ...period,
    ...organizationId,
  };

  const res = await client[type as "groupInfo" | "groupError"](rewrittenParams);

  return res.data;
};

const api = {
  getLogs,
  getDeviceFailures,
  getGroupLogs,
};

export default api;
