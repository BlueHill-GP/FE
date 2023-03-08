import api, { apiConfig } from "./api"

const POST_URL = '/api/posts'

export interface PostData {
  images: string[];
  description: string;
}


export const createPost = async (data: FormData) => {
  return await api.post(apiConfig.baseURL+ POST_URL, data);
};

export const getPost = async () => {
  return await api.get(apiConfig.baseURL+ POST_URL);
};
