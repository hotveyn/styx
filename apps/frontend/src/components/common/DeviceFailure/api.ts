import dayjs from "dayjs";
import { Api } from "../../../api/Api";
import { axiosInstance } from "../../../api/api.interceptor";
import { IFilterStore } from "../../../store/FilterStore";
import { formatDateUTC } from "../../../utils/formatDateUTC";

const client = new Api(axiosInstance);

const getDeviceFailures = async (deviceId: string, filters: IFilterStore) => {
  const period = {
    startDate:
      filters.period.startDate || formatDateUTC(dayjs("01.01.1970 00:00:00")),
    endDate: filters.period.endDate || formatDateUTC(dayjs().endOf("day")),
  };

  const rewrittenParams = {
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
    deviceId,
    ...period,
  };

  const res = await client.failureControllerQuerySearch(rewrittenParams);

  return res.data;
};

const api = {
  getDeviceFailures,
};

export default api;
