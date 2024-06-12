import { Api } from "../../api/Api";

import { axiosInstance } from "../../api/api.interceptor";
import {
  CreateUserDto,
  UpdateUserDto,
  UserControllerQuerySearchParams,
} from "../../api/data-contracts";
import { maxContentLengthList } from "../../constants/common";
import { IFilterStore } from "../../store/FilterStore";

const client = new Api(axiosInstance);

const getUsers = async (filters: IFilterStore) => {
  const searchParam = filters.filters.searchValue || undefined;

  const searchParams = {
    id: searchParam?.slice(0, maxContentLengthList.id),
    login: searchParam,
    email: searchParam,
  };

  const period = {
    startDate: filters.period.startDate || undefined,
    endDate: filters.period.endDate || undefined,
  };

  const sort = filters?.sorter.sortDirection
    ? {
        orderBy: filters.sorter
          .sortField as keyof UserControllerQuerySearchParams["orderBy"],
        orderDirection: filters.sorter
          .sortDirection as keyof UserControllerQuerySearchParams["orderDirection"],
      }
    : undefined;

  const organizationId = filters?.filters.organizationId
    ? {
        organizationId: filters?.filters.organizationId,
      }
    : undefined;

  const rewrittenParams = {
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
    ...searchParams,
    ...period,
    ...sort,
    ...organizationId,
  };

  const res = await client.userControllerQuerySearch(rewrittenParams);

  return res.data;
};

const addUser = async (dto: CreateUserDto) => {
  const res = await client.userControllerCreate(dto);

  return res.data;
};

const editUser = async (dto: UpdateUserDto, id: number) => {
  const res = await client.userControllerUpdate(id, dto);

  return res.data;
};

const deleteUser = async (id: number) => {
  const res = await client.userControllerRemove(id);

  return res.data;
};

const getUserInfo = async () => {
  const res = await client.userControllerGetProfile();

  return res.data;
};

const api = {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  getUserInfo,
};

export default api;
