import { createPaymentPayload, getVNPayParams } from "../utils/VNPayUtils";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { createMomoPayment } from "../api/momoPay";

const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};
const VNPay = () => {
const location = useLocation();
  const data = location.state.data;
  console.log(data);
  
  const pay = async () => {
    const response = await axios.get("https://api.ipify.org?format=json");
    const ip = response.data.ip;
    if (!ip) {
      console.log( "err IP");
      return response;
    };

    const payload = createPaymentPayload(data.price, ip, data.bookingId, "abc");

    const vnPayUrl = `${process.env.REACT_APP_VNP_URL_TEST}?${getVNPayParams(
      payload
    )}`;
   
     window.location.href = vnPayUrl 
  };

  const MoMo = async() => {
    const response = await createMomoPayment(data);
    if (response.data) {
      console.log(response.data);
      
      window.location.href = response.data.payUrl;
    }
  }
  return (
    <div>
      <p>Hello world</p>
      <div onClick={pay} style={{ padding: 30 }}>
        Pay for our service
      </div>

      <div onClick={MoMo} style={{ padding: 30 }}>
        momo
      </div>
    </div>
  );
};

export default VNPay;
