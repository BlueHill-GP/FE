import api from "./api"

const POST_URL = '/api/posts'

export interface PostData {
  images: string[];
  description: string;
}


export const createPost = async (data: FormData) => {
  return await api.post(process.env.REACT_APP_API_BASE_URL + POST_URL, data);
};

export const getPost = async () => {
  return await api.get(process.env.REACT_APP_API_BASE_URL + POST_URL);
};
