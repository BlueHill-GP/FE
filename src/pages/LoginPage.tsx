import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginData, loginApi } from "../api/authApi";
import Input from "../components/input/Input";

const LoginPage = () => {
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [user, setUser] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginApi(user);
      if (response.status === 200) {
        // success move to home page
        navigate("/");
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while logging in");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="email"
        value={user.email}
        function={handleInputChange}
      />
      <Input
        type="password"
        name="password"
        value={user.password}
        function={handleInputChange}
      />
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
