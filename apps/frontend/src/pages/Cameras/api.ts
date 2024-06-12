import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";
import {
  CameraControllerQueryParams,
  CreateCameraDto,
  UpdateCameraDto,
} from "../../api/data-contracts";
import { maxContentLengthList } from "../../constants/common";
import { IFilterStore } from "../../store/FilterStore";

const client = new Api(axiosInstance);

const getCameras = async (filters: IFilterStore) => {
  const searchParam = filters?.filters.searchValue || undefined;

  const searchParams = {
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
          .sortField as keyof CameraControllerQueryParams["orderBy"],
        orderDirection: filters.sorter
          .sortDirection as keyof CameraControllerQueryParams["orderDirection"],
      }
    : undefined;

  const rewrittenParams = {
    offset: filters?.pagination.offset,
    limit: filters?.pagination.limit,
    isDeleted: false,
    ...searchParams,
    ...period,
    ...sort,
  };

  const res = await client.cameraControllerQuery(rewrittenParams);

  return res.data;
};

const addCamera = async (dto: CreateCameraDto) => {
  const res = await client.cameraControllerCreate(dto);

  return res.data;
};

const editCamera = async (dto: UpdateCameraDto, id: number) => {
  const res = await client.cameraControllerUpdate(id, dto);

  return res.data;
};

const deleteCamera = async (id: number) => {
  const res = await client.cameraControllerRemove(id);

  return res.data;
};

const api = {
  getCameras,
  addCamera,
  editCamera,
  deleteCamera,
};

export default api;
