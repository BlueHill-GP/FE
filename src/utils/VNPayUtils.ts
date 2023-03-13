import queryString from "query-string";
import CryptoJS from "crypto-js";

const zeroFill = (num: number) => {
  return num <= 9 ? `0${num}` : String(num);
};

export const getCreateDate = (date: Date) => {
  return `${date.getFullYear()}${zeroFill(date.getMonth() + 1)}${zeroFill(
    date.getDate()
  )}${zeroFill(date.getHours())}${zeroFill(date.getMinutes())}${zeroFill(
    date.getSeconds()
  )}`;
};


export const createPaymentPayload = (
  amount: number,
  ipAddress: string,
  orderId: string,
  orderInfo: string,
) => {
  const vnp_Version = "2.1.0";
  const vnp_Command = "pay";
  const vnp_Amount = amount * 100;
  const vnp_CreateDate = getCreateDate(new Date());
  const vnp_CurrCode = "VND";
  const vnp_IpAddr = ipAddress;
  const vnp_Locale = "en";
  const vnp_OrderInfo = orderInfo.replaceAll(" ", "_");
  const vnp_ReturnUrl = process.env.REACT_APP_API_BASE_URL+"/api/payment/";
  const vnp_ExpireDate = String(Number(getCreateDate(new Date())) + 500); 
  const vnp_TmnCode = process.env.REACT_APP_VNP_TMNCODE;
  const vnp_TxnRef = orderId;
  return {
    vnp_Amount,
    vnp_Command,
    vnp_CreateDate,
    vnp_CurrCode,
    vnp_ExpireDate,
    vnp_IpAddr,
    vnp_Locale,
    vnp_OrderInfo,
    vnp_ReturnUrl,
    vnp_TmnCode,
    vnp_TxnRef,
    vnp_Version,
  };
};
export const getVNPayParams = (data: any): string => {
  console.log(data);
  
  const params = queryString.stringify(data);
  const vnp_SecureHash = CryptoJS.HmacSHA512(
    params,
    process.env.REACT_APP_SECRET_KEY || ""
  ).toString();

  console.log(queryString.stringify({ ...data, vnp_SecureHash }));
  return queryString.stringify({ ...data, vnp_SecureHash });
};


//localhost:4000/aa?
// vnp_Amount = 1000000
// vnp_BankCode=NCB
// vnp_BankTranNo=VNP13954714
// vnp_CardType=ATM
// vnp_OrderInfo=abc
// vnp_PayDate=20230310213650
// vnp_ResponseCode=00
// vnp_TmnCode=P2BKD39T
// vnp_TransactionNo=13954714
// vnp_TransactionStatus=00
// vnp_TxnRef=1764032484
// vnp_SecureHash=c6c3cffd4424dee60661f787ff5fde38773483fbb6f88b818660423e5beca43ff2c4f169e871f766fea34e353fbbc818201f80b81abbbf0dd47ce4a465862d20

// vnp_Amount=1000000
// vnp_Command=pay
// vnp_CreateDate=20230311152534
// vnp_CurrCode=VND
// vnp_IpAddr=113.185.109.179
// vnp_Locale=en
// vnp_OrderInfo=abc
// vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A4000%2Fapi%2Fpayment%2F
// vnp_SecureHash=1a35b74479cb4866e4b2ce262b25bde9d4bb91937e27e910bfca6fd2497f60943e0ca42575d395f663ce4863de23477ea30c3f0b978248f84c1299dc0d3bac7a
// vnp_TmnCode=P2BKD39T
// vnp_TxnRef=8951909210
// vnp_Version=2.1.0