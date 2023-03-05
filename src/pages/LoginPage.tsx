import axios from "axios";
import { useState } from "react";
import api from "../api/api";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post(process.env.REACT_APP_API_BASE_URL+`/api/auth/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while logging in");
    }
  };

  if (isLoggedIn) {
    console.log("oki la");
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
