import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";
import {
  CreateOrganizationDto,
  OrganizationControllerQuerySearchParams,
  UpdateOrganizationDto,
} from "../../api/data-contracts";
import { maxContentLengthList } from "../../constants/common";
import { IFilterStore } from "../../store/FilterStore";

const client = new Api(axiosInstance);

const getOrganizations = async (
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
        id: searchParam?.slice(0, maxContentLengthList.id),
        name: searchParam,
      };

  const period = {
    startDate: filters?.period.startDate || undefined,
    endDate: filters?.period.endDate || undefined,
  };

  const sort = filters?.sorter.sortDirection
    ? {
        orderBy: filters.sorter
          .sortField as keyof OrganizationControllerQuerySearchParams["orderBy"],
        orderDirection: filters.sorter
          .sortDirection as keyof OrganizationControllerQuerySearchParams["orderDirection"],
      }
    : undefined;

  const rewrittenParams = {
    offset: selectOffset || filters?.pagination.offset,
    limit: selectLimit || filters?.pagination.limit,
    isDeleted: false,
    ...searchParams,
    ...period,
    ...sort,
  };

  const res = await client.organizationControllerQuerySearch(rewrittenParams);

  return res.data;
};

const addOrganization = async (dto: CreateOrganizationDto) => {
  const res = await client.organizationControllerCreate(dto);

  return res.data;
};

const editOrganization = async (dto: UpdateOrganizationDto, id: number) => {
  const res = await client.organizationControllerUpdate(id, dto);

  return res.data;
};

const deleteOrganization = async (id: number) => {
  const res = await client.organizationControllerRemove(id);

  return res.data;
};

const getOrganizationById = async (id: string) => {
  const params = {
    limit: 1,
    offset: 0,
    id,
  };

  const res = await client.organizationControllerQuerySearch(params);

  return res.data;
};

const api = {
  getOrganizations,
  addOrganization,
  editOrganization,
  deleteOrganization,
  getOrganizationById,
};

export default api;
