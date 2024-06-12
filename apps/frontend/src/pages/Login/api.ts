import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";
import { LoginDto } from "../../api/data-contracts";

const client = new Api(axiosInstance);

const login = async (data: LoginDto) => {
  const res = await client.authControllerLogin(data);
  return res.data;
};

const logout = async () => {
  const res = await client.authControllerLogout();
  return res.data;
};

const getTelegramLink = async () => {
  const res = await client.notificationControllerGetTelegramLink();
  return res.data;
};

const getUserNotification = async () => {
  const res = await client.notificationControllerGetNotifications();
  return res.data;
};

const api = {
  login,
  logout,
  getTelegramLink,
  getUserNotification,
};

export default api;
