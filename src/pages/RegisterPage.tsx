import { useState } from "react";
import Input from "../components/input/Input";
import "../../src/assets/css/register.css"

import {
  registerApi,
  RegisterData,
  ResendOtpData,
  VerifyOtpData,
} from "../api/authApi";

interface IProp {
  verifyOtpRegister: (data: VerifyOtpData) => void;
  changeRoute: (route: string) => void;
  resendOtp: (email: ResendOtpData) => void;
}
export const RegisterPage = (props: IProp) => {
  const { verifyOtpRegister, changeRoute, resendOtp } = props;
  const [user, setUser] = useState<RegisterData>({
    username: "",
    password: "",
    email: "",
    phone: "",
    userType: "photographer",
  });
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleOTPInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setOtp(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await registerApi(user);
      if (response.status === 200) {
        setErrorMessage("");
        setShowOtpInput(true);
        // setOtp(response.data.otp);
      } else {
        setErrorMessage("Something went wrong, please try again later");
      }
    } catch (error) {
      setErrorMessage("Something went wrong, please try again later");
    }
  };

  const handleOtpVerification = async () => {
    verifyOtpRegister({ email: user.email, otp });
  };

  const handleResendOtp = async () => {
    resendOtp({email :user.email})
  }

  return (
    <div className={"container-register"}>
    <>
      {!showOtpInput ? (
          <section className={"register-section"}>
            <div className={"form_header"}>
              <h1 className={"form_header_welcome"}> Chào mừng đến Cuoidi Cuoidi</h1>
              <p> Hãy tận hưởng đám cưới của bạn</p>
              <h1 className={"form_header_register-text"}>Đăng ký</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="Họ và tên"
                value={user.username}
                function={handleInputChange}
              />


              <Input
                type="text"
                name="email"
                value={user.email}
                function={handleInputChange}
              />



              <Input
                type="text"
                name="Số điện thoại"
                value={user.phone}
                function={handleInputChange}
              />


              <Input
                type="password"
                name="Mật khẩu"
                value={user.password}
                function={handleInputChange}
              />



                <label htmlFor="userType">Loại người dùng:</label>
                <select className={"userType"}
                  name="userType"
                  id="userType"
                  value={user.userType}
                  onChange={handleInputChange}
                >
                  <option value="photographer">Nhiếp ảnh</option>
                  <option value="makeup">Trang điểm</option>
                  <option value="couple">Cặp đôi</option>
                </select>


              {errorMessage && <div>{errorMessage}</div>}
              <button className={"btn-login"} type="submit">Đăng ký</button>
            </form>

            <button className="line" type="button" onClick={() => changeRoute("login")}>
              Đăng nhập
            </button>
          </section>


      ) : (
        <div>
          <Input
            type="text"
            name="otp"
            value={otp}
            function={handleOTPInputChange}
          />
          <button type="button" onClick={handleOtpVerification}>
            Xác thực mã OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setShowOtpInput(!showOtpInput);
              setOtp("");
            }}
          >
            Quay lại
          </button>
          <button type="button" onClick={handleResendOtp}>
            Gửi lại mã OTP
          </button>
        </div>
      )}
    </>
    </div>
  );
};
