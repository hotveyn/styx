import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";
import { IFilterStore } from "../../store/FilterStore";

const client = new Api(axiosInstance);

const getFailureNotifications = async (filters: IFilterStore) => {
  const rewrittenParams = {
    offset: filters.pagination.offset,
    limit: filters.pagination.limit,
    isDeleted: false,
  };

  const res =
    await client.failureNotificationControllerGetNotifications(rewrittenParams);

  return res.data;
};

const checkFailureNotificationById = async (id: string) => {
  const res = await client.failureNotificationControllerCheck(+id);

  return res.data;
};

const checkAllFailureNotification = async () => {
  const res = await client.failureNotificationControllerCheckAllNotifications();

  return res.data;
};

const getMonitoring = async (organizationId: string) => {
  const res = await client.statControllerGetMonitoring(
    organizationId ? { organizationId } : {}
  );

  return res.data;
};

const api = {
  getFailureNotifications,
  checkFailureNotificationById,
  checkAllFailureNotification,
  getMonitoring,
};

export default api;
