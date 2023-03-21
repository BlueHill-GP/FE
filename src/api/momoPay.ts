import api, { apiConfig } from "./api";

const MOMO_PAY_URL_TEST = "/api/payment/momo";

export const createMomoPayment = async (data:any) => {
  return await api.post(apiConfig.baseURL + MOMO_PAY_URL_TEST, {data});
};

