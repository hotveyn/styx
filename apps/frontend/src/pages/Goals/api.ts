import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";
import {
  CreateGoalDto,
  GoalAchieveControllerGetByGroupWithDevicesParams,
  GoalAchieveControllerQuerySearchParams,
  GoalControllerQuerySearchParams,
  UpdateGoalDto,
} from "../../api/data-contracts";
import { IFilterStore } from "../../store/FilterStore";

const client = new Api(axiosInstance);

const getGoals = async (
  filters?: IFilterStore,
  selectOffset?: number,
  selectLimit?: number,
  selectSearchParam?: string
) => {
  const searchParam = filters?.filters.searchValue || undefined;
  const searchParams = selectSearchParam
    ? {
        name: selectSearchParam,
      }
    : {
        description: searchParam,
      };

  const period = {
    startDate: filters?.period.startDate || undefined,
    endDate: filters?.period.endDate || undefined,
  };

  const organizationId = filters?.filters.organizationId
    ? {
        organizationId: filters?.filters.organizationId,
      }
    : undefined;

  const sort = filters?.sorter.sortDirection
    ? {
        orderBy: filters.sorter
          .sortField as keyof GoalControllerQuerySearchParams["orderBy"],
        orderDirection: filters.sorter
          .sortDirection as keyof GoalControllerQuerySearchParams["orderDirection"],
      }
    : undefined;

  const rewrittenParams = {
    offset: selectOffset || filters?.pagination.offset,
    limit: selectLimit || filters?.pagination.limit,
    isDeleted: false,
    ...searchParams,
    ...period,
    ...sort,
    ...organizationId,
  };

  const res = await client.goalControllerQuerySearch(rewrittenParams);

  return res.data;
};

const addGoal = async (dto: CreateGoalDto) => {
  const res = await client.goalControllerCreate(dto);

  return res.data;
};

const editGoal = async (dto: UpdateGoalDto, id: number) => {
  const res = await client.goalControllerUpdate(id, dto);

  return res.data;
};

const deleteGoal = async (id: number) => {
  const res = await client.goalControllerRemove(id);

  return res.data;
};

const getGroupGoals = async (filters: IFilterStore) => {
  const period = {
    startDate: filters.period.startDate,
    endDate: filters.period.endDate,
  };

  const sort = filters?.sorter.sortDirection
    ? {
        orderBy: filters.sorter
          .sortField as keyof GoalAchieveControllerGetByGroupWithDevicesParams["orderBy"],
        orderDirection: filters.sorter
          .sortDirection as keyof GoalAchieveControllerGetByGroupWithDevicesParams["orderDirection"],
      }
    : undefined;

  const rewrittenParams = {
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
    ...period,
    ...sort,
  };

  const res =
    await client.goalAchieveControllerGetByGroupWithDevices(rewrittenParams);

  return res.data;
};

const getAchievedGoals = async (filters: IFilterStore) => {
  const sort = filters?.sorter.sortDirection
    ? {
        orderBy: filters.sorter
          .sortField as keyof GoalAchieveControllerQuerySearchParams["orderBy"],
        orderDirection: filters.sorter
          .sortDirection as keyof GoalAchieveControllerQuerySearchParams["orderDirection"],
      }
    : undefined;

  const period = {
    startDate: filters.period.startDate,
    endDate: filters.period.endDate,
  };

  const rewrittenParams = {
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
    deviceId: filters.filters.deviceId,
    goalId: filters.filters.goalIds[0],
    ...sort,
    ...period,
  };

  const res = await client.goalAchieveControllerQuerySearch(rewrittenParams);

  return res.data;
};

const api = {
  getGoals,
  addGoal,
  editGoal,
  deleteGoal,
  getGroupGoals,
  getAchievedGoals,
};

export default api;
