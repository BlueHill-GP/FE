import api, { apiConfig } from "./api"

const POST_URL = '/api/posts/'

export interface PostData {
  images: string[];
  description: string;
}


export const createPost = async (data: FormData) => {
  return await api.post(apiConfig.baseURL+ POST_URL, data);
};

export const getPosts = async () => {
  return await api.get(apiConfig.baseURL+ POST_URL);
};

export const getPostByUser = async (userId: string) => {
  return await api.get(apiConfig.baseURL + POST_URL + userId);
};
