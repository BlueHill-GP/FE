import { useState } from "react";
import Input from "../components/input/Input";
import {
  registerApi,
  RegisterData,
  ResendOtpData,
  VerifyOtpData,
} from "../api/authApi";
import { useNavigate } from "react-router-dom";

interface IProp {
  verifyOtpRegister: (data: VerifyOtpData, navigate: Function) => void;
  changeRoute: (route: string) => void;
  resendOtp: (email: ResendOtpData) => void;
}
export const RegisterPage = (props: IProp) => {
  const navigate = useNavigate();

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
    verifyOtpRegister({ email: user.email, otp }, navigate);
  };

  const handleResendOtp = async () => {
    resendOtp({email :user.email})
  }

  return (
    <>
      {!showOtpInput ? (
        <div className="">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
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
              name="phone"
              value={user.phone}
              function={handleInputChange}
            />
            <Input
              type="password"
              name="password"
              value={user.password}
              function={handleInputChange}
            />
            <div>
              <label htmlFor="userType">User Type:</label>
              <select
                name="userType"
                id="userType"
                value={user.userType}
                onChange={handleInputChange}
              >
                <option value="photographer">Photographer</option>
                <option value="makeup">Makeup</option>
                <option value="couple">Couple</option>
              </select>
            </div>
            {errorMessage && <div>{errorMessage}</div>}
            <button type="submit">Register</button>
          </form>
          <button type="button" onClick={() => navigate("/")}>
            login
          </button>
        </div>
      ) : (
        <div>
          <Input
            type="text"
            name="otp"
            value={otp}
            function={handleOTPInputChange}
          />
          <button type="button" onClick={handleOtpVerification}>
            Verify OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setShowOtpInput(!showOtpInput);
              setOtp("");
            }}
          >
            Back
          </button>
          <button type="button" onClick={handleResendOtp}>
            Resend OTP
          </button>
        </div>
      )}
    </>
  );
};
