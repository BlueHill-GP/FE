import api, { apiConfig } from "./api";

const SOCKET_URL = "/api/socket/";
const GEI_USER_SOCKET_ID_SOCKET_URL = "/api/socket/use-socket-id";

export interface CreateRoomData {
  userId: string;
  partnerId: string;
}

export interface userSocketIdData {
  userId: string;
  
}

export const createRoomApi = async (data: CreateRoomData) => {
  return await api.post(apiConfig.baseURL + SOCKET_URL, data);
};


export const getUserSocketId = async (data: userSocketIdData) => {
  return await api.post(
    apiConfig.baseURL + GEI_USER_SOCKET_ID_SOCKET_URL,
    data
  );
};

