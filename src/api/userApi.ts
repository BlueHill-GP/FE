import api, { apiConfig } from "./api"

const GET_USER_BY_ID_URL = '/api/user/'


export interface LoginData {
    email: string,
    password: string,
}

export const getUserByIdpApi = async (userId: string) => {
    return await api.get(apiConfig.baseURL + GET_USER_BY_ID_URL+userId);
}