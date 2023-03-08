import api, { apiConfig } from "./api"

const CREATE_SERVICE_PACKAGE_URL = "/api/service-packages";

export const createServicePackage = async (data: FormData) => {
  return await api.post(apiConfig.baseURL + CREATE_SERVICE_PACKAGE_URL, data);
};
