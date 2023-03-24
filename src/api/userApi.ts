import api, { apiConfig } from "./api"

const GET_USER_BY_ID_URL = '/api/user/'
const UPDATE_AVATAR_URL = "/api/user/avatar";
const UPDATE_DESC_URL = "/api/user/desc";

export interface LoginData {
    email: string,
    password: string,
}

export interface updateDescData {
  desc: string;
}

export const getUserByIdpApi = async (userId: string) => {
    return await api.get(apiConfig.baseURL + GET_USER_BY_ID_URL+userId);
}

export const updateAvatarApi = async (data: FormData) => {
  return await api.put(apiConfig.baseURL + UPDATE_AVATAR_URL, data);
};

export const updateDescApi = async (data: updateDescData) => {
  return await api.put(apiConfig.baseURL + UPDATE_DESC_URL, data);
};

;
