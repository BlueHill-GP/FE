import api, { apiConfig } from "./api"

const LOGIN_URL = '/api/auth/login'
const REGISTER_URL = '/api/auth/register'
const VERIFY_OPT_URL = '/api/auth/register/OTP'
const RESEND_OPT_URL = "/api/auth/register/resend-OTP";

export interface LoginData {
    email: string,
    password: string,
}

export interface RegisterData {
    email: string,
    password: string,
    username: string,
    phone: string,
    userType: "photographer" |"makeup"| "couple",
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResendOtpData {
  email: string;
}


export const loginApi = async (data: LoginData) => {
    return await api.post(apiConfig.baseURL+LOGIN_URL, data)
}

export const registerApi = async (data: RegisterData) => {
    return await api.post(apiConfig.baseURL+REGISTER_URL, data)
}

export const verifyOtpApi = async (data: VerifyOtpData) => {
  return await api.post(apiConfig.baseURL + VERIFY_OPT_URL, data);
};

export const resendOtpApi = async (data: ResendOtpData) => {
  return await api.post(apiConfig.baseURL + RESEND_OPT_URL, data);
};