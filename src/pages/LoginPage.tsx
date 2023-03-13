import { useState } from "react";
import { LoginData } from "../api/authApi";
import Input from "../components/input/Input";
import "../../src/assets/css/register.css"

interface LoginState {
  login: (user: LoginData) => void;
  changeRoute: (route: string) => void;
}
const LoginPage = (props: LoginState) => {
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

  changeRoute("register")
}
  return (

      <div className={"container-register"}>
          <section className={"register-section"}>
              <div className={"form_header"}>
                  <h1 className={"form_header_welcome"}> Chao mung den Cuoidi Cuoidi</h1>
                  <p> Hay tan huong dam cuoi cua ban</p>
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

              <button className={"btn-login"} onClick={handleSubmit}>Login</button>
              </div>
              <div className={"Login-Btn"}>
              <button className="line" onClick={moveRegister}>Register</button>
              </div>
          </section>
    </div>
  );
};

export default LoginPage;
