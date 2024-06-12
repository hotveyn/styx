import { Api } from "../../api/Api";
import { axiosInstance } from "../../api/api.interceptor";

const client = new Api(axiosInstance);

const achieveGoal = async (data: { deviceCode: string; goalCode: string }) => {
  const res = await client.goalAchieveControllerAchieveGoal(data);
  return res.data;
};

const api = {
  achieveGoal,
};

export default api;
