import dayjs from "dayjs";
import { Api } from "../../../api/Api";
import { axiosInstance } from "../../../api/api.interceptor";
import { IFilterStore } from "../../../store/FilterStore";
import { DateFilters } from "../../../types/common";

const client = new Api(axiosInstance);

const getDeviceGoals = async (
  filters: IFilterStore["filters"],
  period: string,
  deviceId: string,
  date: DateFilters
) => {
  const rewrittenParams = {
    deviceId,
    startDate: date.startDate?.format() || dayjs().startOf("month").format(),
    endDate: date.endDate?.format() || dayjs().endOf("month").format(),
    goalId: filters.goalIds,
  };

  const res =
    await client[
      period === "days"
        ? "goalAchieveControllerGetByDayWithDevice"
        : "goalAchieveControllerGetByHourWithDevice"
    ](rewrittenParams);

  return res.data;
};

const api = {
  getDeviceGoals,
};

export default api;
