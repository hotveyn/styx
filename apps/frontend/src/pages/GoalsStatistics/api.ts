import dayjs from "dayjs";
import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";
import { IFilterStore } from "../../store/FilterStore";
import { DateFilters } from "../../types/common";

const client = new Api(axiosInstance);

const getGoalAchieves = async (
  filters: IFilterStore,
  period: string,
  date: DateFilters
) => {
  const rewrittenParams = {
    startDate: date.startDate?.format() || dayjs().startOf("month").format(),
    endDate: date.endDate?.format() || dayjs().endOf("month").format(),
    goalId: filters.filters.goalIds,
  };

  const res =
    await client[
      period === "days"
        ? "goalAchieveControllerGetByDay"
        : "goalAchieveControllerGetByHour"
    ](rewrittenParams);

  return res.data;
};

const api = {
  getGoalAchieves,
};

export default api;
