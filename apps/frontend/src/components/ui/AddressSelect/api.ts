import { Api } from "../../../api/Api";
import { axiosInstance } from "../../../api/api.interceptor";

const client = new Api(axiosInstance);

const getAddress = async (query: string) => {
  const res = await client.dadataControllerAddressSuggest({ query });

  return res.data;
};

const api = {
  getAddress,
};

export default api;
