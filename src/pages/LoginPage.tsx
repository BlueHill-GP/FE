import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../api/authApi";
import "../../src/assets/css/register.css";
import { Button, Checkbox, Form, Input } from 'antd';


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
  const onFinish = () => {
      login(user);
  };

  const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
  };

  return (

      <div className={"container-register"}>
          <section className={"login-section"}>
              <div className={"form_header"}>
                  <h1 className={"form_header_welcome"}> Chào mừng đến Cuoidi Cuoidi</h1>
                  <p>Hãy tận hưởng đám cưới của bạn</p>
                  <h1 className={"form_header_register-text"}>Đăng nhập</h1>
              </div>
              <div className={"form-login"}>
                  <Form
                  >

                      <div className={"label-form-register-login"}>Email:
                      <Form.Item
                          name="email"
                          rules={[{ required: true, message: 'Vui lòng điền tên của bạn' }]}
                      >
                          <Input className={"inputForm"}name="email" value={user.email}  onChange={handleInputChange} />
                      </Form.Item>
                      </div>

                      <div className={"label-form-register-login"}> Mật khẩu:
                      <Form.Item
                          name="password"
                          rules={[{ required: true, message: 'Vui lòng điền mật khẩu của bạn' }]}
                      >
                          <Input.Password className={"inputForm-password"} name="password" value={user.password} onChange={handleInputChange}/>
                      </Form.Item>
                      </div>

                      <button className={"btn-login"} onClick={handleSubmit}>Đăng nhập</button>
                  </Form>
              </div>
                  <div className={"Login-Btn"}>
                      <button className="line" onClick={moveRegister}>Đăng ký</button>
                  </div>

          </section>
    </div>
  );
};

export default LoginPage;
