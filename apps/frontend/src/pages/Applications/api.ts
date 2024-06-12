import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";
import {
  ApplicationControllerQuerySearchParams,
  ApplicationControllerUploadPayload,
  CreateApplicationDto,
  UpdateApplicationDto,
} from "../../api/data-contracts";
import { IFilterStore } from "../../store/FilterStore";

const client = new Api(axiosInstance);

const getApplications = async (filters: IFilterStore) => {
  const searchParam = filters.filters.searchValue || undefined;
  const searchParams = {
    name: searchParam,
  };

  const period = {
    startDate: filters.period.startDate || undefined,
    endDate: filters.period.endDate || undefined,
  };

  const sort = filters?.sorter.sortDirection
    ? {
        orderBy: filters.sorter
          .sortField as keyof ApplicationControllerQuerySearchParams["orderBy"],
        orderDirection: filters.sorter
          .sortDirection as keyof ApplicationControllerQuerySearchParams["orderDirection"],
      }
    : undefined;

  const rewrittenParams = {
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
    ...period,
    ...searchParams,
    ...sort,
  };

  const res = await client.applicationControllerQuerySearch(rewrittenParams);

  return res.data;
};

const addApplication = async (dto: CreateApplicationDto) => {
  const res = await client.applicationControllerCreate(dto);

  return res.data;
};

const uploadApplication = async (
  name: string,
  app: ApplicationControllerUploadPayload
) => {
  const res = await client.applicationControllerUpload(name, app);

  return res.data;
};

const editApplication = async (name: string, dto: UpdateApplicationDto) => {
  const res = await client.applicationControllerUpdate(name, dto);

  return res.data;
};

const deleteApplication = async (name: string) => {
  const res = await client.applicationControllerDelete(name);

  return res.data;
};

const api = {
  getApplications,
  addApplication,
  editApplication,
  deleteApplication,
  uploadApplication,
};

export default api;
