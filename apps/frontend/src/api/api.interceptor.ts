import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import routes from "../constants/routes";
import { HttpClient } from "./http-client";

const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
};

export const axiosInstance = new HttpClient(axiosConfig);

axiosInstance.instance.interceptors.request.use((req) => {
  if (req.url === "/auth/login") return req;

  const accessToken = localStorage.getItem("accessToken");

  req.headers.Authorization = `Bearer ${accessToken}`;

  return req;
});

axiosInstance.instance.interceptors.response.use(
  (res: AxiosResponse) => {
    const newAccessToken = res.headers["x-new-access-token"];
    if (newAccessToken && localStorage.getItem("accessToken")) {
      localStorage.setItem("accessToken", newAccessToken);
    }

    return res;
  },
  (error: AxiosError) => {
    if (
      (error.response?.status === 401 ||
        error.response?.statusText === "Unauthorized") &&
      !error.config?.url?.includes("/auth/login")
    ) {
      localStorage.removeItem("accessToken");
      window.location.href = `${window.location.origin}${routes.auth}`;
    }

    return Promise.reject(error);
  }
);
