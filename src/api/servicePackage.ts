import api, { apiConfig } from "./api"

const SERVICE_PACKAGE_URL = "/api/service-packages/";
const GET_SERVICE_PACKAGE_BY_ID_URL = "/api/service-packages/id/";
const GET_SERVICE_PACKAGE_BY_USER_URL = "/api/service-packages/user/";

export const createServicePackage = async (data: FormData) => {
  return await api.post(apiConfig.baseURL + SERVICE_PACKAGE_URL, data);
};

export const getServicePackageByUser = async (userId: string) => {
  return await api.get(
    apiConfig.baseURL + GET_SERVICE_PACKAGE_BY_USER_URL + userId
  );
};

export const getServicePackageById = async (id: string) => {
  return await api.get(apiConfig.baseURL + GET_SERVICE_PACKAGE_BY_ID_URL + id);
};
