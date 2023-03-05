import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "../utils/storage";

interface ApiConfig extends AxiosRequestConfig {
  baseURL: string;
  timeout: number;
  headers?: {
    [key: string]: string;
  };
}

const apiConfig: ApiConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:4000",
  timeout: 10000,
};

const api = axios.create(apiConfig);

api.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();
  console.log(accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    try {
      const token = response.data.data;
      console.log(token);

      if (token.accessToken) {
        setAccessToken(token.accessToken);
      }
    } catch (error) {
      console.log(error);
      
    }
    
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
    }
    throw error;
  }
);

export default api;
