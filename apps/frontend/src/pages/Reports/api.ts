import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";
import { IFilterStore } from "../../store/FilterStore";

const client = new Api(axiosInstance);

const getFailureReportData = async (filters: IFilterStore) => {
  const period = {
    startDate: filters.period.startDate,
    endDate: filters.period.endDate,
  };

  const rewrittenParams = {
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
    ...period,
  };

  const res = await client.statControllerGetActivity(rewrittenParams);

  return res.data;
};

const api = {
  getFailureReportData,
};

export default api;
