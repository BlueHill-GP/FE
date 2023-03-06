import api from "./api"

const LOGIN_URL = '/api/auth/login'
const REGISTER_URL = '/api/auth/register'
const VERIFY_OPT_URL = '/api/auth/register/OTP'

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

export interface OtpData {
    email: string,
    otp: string,
}
export const loginApi = async (data: LoginData) => {
    return await api.post(process.env.REACT_APP_API_BASE_URL+LOGIN_URL, data)
}

export const registerApi = async (data: RegisterData) => {
    return await api.post(process.env.REACT_APP_API_BASE_URL+REGISTER_URL, data)
}

export const verifyOtpApi = async (data: OtpData) => {
    return await api.post(process.env.REACT_APP_API_BASE_URL+VERIFY_OPT_URL, data)
}