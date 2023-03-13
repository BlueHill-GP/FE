import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../api/authApi";
import Input from "../components/input/Input";

interface LoginState {
  login: (user: LoginData) => void;
  changeRoute: (route: string) => void;
}
const LoginPage = (props: LoginState) => {
  const navigate = useNavigate()
  const { login, changeRoute } = props;
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

  const handleSubmit = () => {
    console.log('ok');
    
    login(user);
  };
  const moveRegister = () => {

 navigate("register");
}
  return (
    <div >
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
      <button onClick={handleSubmit}>Login</button>
      <button onClick={moveRegister}>Register</button>
    </div>
  );
};

export default LoginPage;
