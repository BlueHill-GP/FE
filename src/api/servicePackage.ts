import api from "./api"

const CREATE_SERVICE_PACKAGE_URL = "/api/service-packages";

export const createServicePackage = async (data: FormData) => {
  return await api.post(
    process.env.REACT_APP_API_BASE_URL + CREATE_SERVICE_PACKAGE_URL,
    data
  );
};
