import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";
import {
  CreateDeviceDto,
  DeviceControllerQuerySearchParams,
  UpdateDeviceDto,
} from "../../api/data-contracts";
import { IFilterStore } from "../../store/FilterStore";

const client = new Api(axiosInstance);

// rewrite with only filters param when testing component will be removed
const getDevices = async (
  filters?: IFilterStore,
  selectOffset?: number,
  selectLimit?: number,
  selectSearchParam?: string
) => {
  const searchParam = filters?.filters.searchValue || undefined;

  const searchParams = selectSearchParam
    ? { name: selectSearchParam }
    : {
        ip: searchParam,
        port: searchParam,
        deviceType: searchParam,
        address: searchParam,
        geo: searchParam,
        softwareType: searchParam,
        softwareVersion: searchParam,
        sshParameters: searchParam,
        code: searchParam,
        name: searchParam,
      };

  const organizationId = filters?.filters.organizationId
    ? {
        organizationId: filters?.filters.organizationId,
      }
    : undefined;

  const period = {
    startDate: filters?.period.startDate || undefined,
    endDate: filters?.period.endDate || undefined,
  };

  const sort = filters?.sorter.sortDirection
    ? {
        orderBy: filters.sorter
          .sortField as keyof DeviceControllerQuerySearchParams["orderBy"],
        orderDirection: filters.sorter
          .sortDirection as keyof DeviceControllerQuerySearchParams["orderDirection"],
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

  const res = await client.deviceControllerQuerySearch(rewrittenParams);

  return res.data;
};

const getDeviceByCode = async (code: string) => {
  const res = await client.deviceControllerGetByCode(code);

  return res.data;
};

const addDevice = async (dto: CreateDeviceDto) => {
  const res = await client.deviceControllerCreate(dto);

  return res.data;
};

const editDevice = async (dto: UpdateDeviceDto, id: number) => {
  const res = await client.deviceControllerUpdate(id, dto);

  return res.data;
};

const deleteDevice = async (id: number) => {
  const res = await client.deviceControllerRemove(id);

  return res.data;
};

const api = {
  getDevices,
  getDeviceByCode,
  addDevice,
  editDevice,
  deleteDevice,
};

export default api;
