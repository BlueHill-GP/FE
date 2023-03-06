import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/input/Input";
type RegistrationFormProps = {
  onRegistrationSuccess: () => void;
};

export const RegisterPage = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
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
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        user
      );
      if (response.status === 200) {
        setErrorMessage("");
        setShowOtpInput(true);
        setOtp(response.data.otp);
      } else {
        setErrorMessage("Something went wrong, please try again later");
      }
    } catch (error) {
      setErrorMessage("Something went wrong, please try again later");
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register/otp",
        { email: user.email, otp }
      );
      if (response.status === 200) {
        setErrorMessage("");
        navigate("/login");
      } else {
        setErrorMessage("OTP verification failed, please try again");
      }
    } catch (error) {
      setErrorMessage("Something went wrong, please try again later");
    }
  };

  return (
    <>
      {!showOtpInput ? (
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
        </div>
      )}
    </>
  );
};
