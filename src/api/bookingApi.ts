import api, { apiConfig } from "./api";

const CREATE_BOOKING_URL = "/api/booking/";
const GET_ALL_BOOKING_BY_USER_URL = "/api/booking/user";
const GET_ALL_COUPLE_BOOKING_URL = "/api/booking/couple";
const UPDATE_BOOKING_STATUS_URL = "/api/booking/";

export interface BookingFormData {
  customerId: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  customerGender: string;
  customerAge: number;
  bookingTime: string;
  bookingAddress: string;
  serviceId: string;
  notes: string;
}

export interface bookingStatus{
  status: string;
}

export const createBooking = async (data: BookingFormData) => {
  return await api.post(apiConfig.baseURL + CREATE_BOOKING_URL, data);
};

export const getAllBookingByUser = async (userId: string) => {
  return await api.get(apiConfig.baseURL + GET_ALL_BOOKING_BY_USER_URL );
};

export const updateBookingStatus = async (
  bookingId: string,
  bookingStatus: string
) => {
  return await api.put(
    apiConfig.baseURL + UPDATE_BOOKING_STATUS_URL + bookingId,
    {bookingStatus}
  );
};

export const getAllCoupeBookingApi = async () => {
  return await api.get(apiConfig.baseURL + GET_ALL_COUPLE_BOOKING_URL);
};