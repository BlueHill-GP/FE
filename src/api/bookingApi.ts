import api, { apiConfig } from "./api";

const CREATE_BOOKING_URL = "/api/booking/";
const GET_ALL_BOOKING_BY_USER_URL = "/api/booking/user";

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


export const createBooking = async (data: BookingFormData) => {
  return await api.post(apiConfig.baseURL + CREATE_BOOKING_URL, data);
};

export const getAllBookingByUser = async (userId: string) => {
  return await api.get(apiConfig.baseURL + GET_ALL_BOOKING_BY_USER_URL );
};
