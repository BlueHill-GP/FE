import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../api/authApi";
import Input from "../components/input/Input";
import "../../src/assets/css/register.css";

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

      <div className={"container-register"}>
          <section className={"login-section"}>
              <div className={"form_header"}>
                  <h1 className={"form_header_welcome"}> Chào mừng đến Cuoidi Cuoidi</h1>
                  <p>Hãy tận hưởng đám cưới của bạn</p>
                  <h1 className={"form_header_register-text"}>Đăng nhập</h1>
              </div>
              <div className={"form-login"}>
              <label htmlFor="password">Email:</label>
              <Input
                type="text"
                name="email"
                value={user.email}
                function={handleInputChange}
              />

              <label htmlFor="password">Mật khẩu:</label>
              <Input
                type="password"
                name="password"
                value={user.password}
                function={handleInputChange}
              />

              <button className={"btn-login"} onClick={handleSubmit}>Đăng nhập</button>
              </div>
              <div className={"Login-Btn"}>
              <button className="line" onClick={moveRegister}>Đăng ký</button>
              </div>
          </section>
    </div>
  );
};

export default LoginPage;
