import api from "./api";

const VNP_URL_TEST = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";


export const createPayment = async (params: any) => {
  return await api.get(VNP_URL_TEST, { params });
};
