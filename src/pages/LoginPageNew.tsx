import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../api/authApi";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { messageError, messageSuccess } from "../utils/notifi";
import {
  registerApi,
  RegisterData,
  ResendOtpData,
  VerifyOtpData,
} from "../api/authApi";
import "./style.css";
import { resendOtp, verifyOtpRegister } from "../redux/slide/authSlice";
const { Option } = Select;

interface LoginState {
  login: (user: LoginData) => void;
  changeRoute: (route: string) => void;
}
interface IProp {
  verifyOtpRegister: (data: VerifyOtpData, navigate: Function) => void;
  changeRoute: (route: string) => void;
  resendOtp: (email: ResendOtpData) => void;
}

function Login(props: LoginState) {
  const { login, changeRoute } = props;

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  function handlePanelChange() {
    setIsSignUp(!isSignUp);
  }

  const handleOTPInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOtp(value);
  };

  const handleOtpVerification = async () => {
    console.log("sfsdf");
    verifyOtpRegister({ email: user.email, otp }, navigate);
  };

  const handleResendOtp = async () => {
    resendOtp({ email: user.email });
  };
  const onFinish = async () => {
    try {
      const response = await registerApi(user);
      if (response.status === 200) {
        setShowOtpInput(true);
        console.log(response.data.message);

        messageSuccess(response.data.message);
      }
    } catch (error) {
      messageError(error);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [userLogin, setUserLogin] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [user, setUser] = useState<RegisterData>({
    username: "",
    password: "",
    email: "",
    phone: "",
    userType: "photographer",
  });

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleInputChangeLogin = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmitLogin = () => {
    login(user);
  };
  const moveRegister = () => {
    navigate("register");
  };

  return (
    <>
      <div className={isSignUp ? "container right-panel-active" : "container"}>
        <div className="">
          <>
            {!showOtpInput ? (
              <div className="form-container sign-up-container">
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className={"form-login"}
                >
                  <h1 className="head">Đăng Ký</h1>

                  <div>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên của bạn",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Tên bạn là gì?"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </div>

                  <div>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email của bạn",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Email của bạn?"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </div>

                  <div>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại của bạn",
                        },
                      ]}
                    >
                      <Input
                        name="phone"
                        placeholder="số điện thoại?"
                        value={user.phone}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </div>

                  <div>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu của bạn",
                        },
                      ]}
                    >
                      <Input.Password
                        className={"inputForm-password"}
                        placeholder="Mật khẩu?"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="userType" rules={[{ required: true }]}>
                      <Select
                        placeholder="Bạn là ai?"
                        id="userType"
                        onChange={(event) =>
                          setUser({
                            ...user,
                            userType: event,
                          })
                        }
                      >
                        <Option value="photographer">Nhiếp ảnh</Option>
                        <Option value="makeup">Trang điểm</Option>
                        <Option value="couple">Cặp đôi</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <button className={"button-login"}>Đăng ký</button>
                </Form>
              </div>
            ) : (
              <div className="form-container sign-up-container">
                <Form className="form-login" name="basic">
                  <div>
                    <div>
                      Nhập mã OTP
                      <Form.Item
                        name="OTP"
                        rules={[
                          {
                            required: true,
                            message:
                              "Vui lòng nhập mã OTP đã gửi về tài khoản email đăng ký của bạn",
                          },
                        ]}
                      >
                        <Input.Password
                          name="otp"
                          value={otp}
                          onChange={handleOTPInputChange}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div>
                   
                      <div className="row">
                        <Button
                          htmlType="button"
                          className={"verifi-OTP"}
                          onClick={() => handleOtpVerification}
                        >
                          Xác thực
                        </Button>

                        <Button
                          className={"verifi-OTP"}
                          onClick={() => handleResendOtp}
                          htmlType="button"
                        >
                          Gửi lại mã OTP
                        </Button>
                      </div>

                      <Button
                        className={"verifi-OTP"}
                        onClick={() => {
                          setShowOtpInput(!showOtpInput);
                          setOtp("");
                        }}
                        type="primary"
                        htmlType="button"
                      >
                        Quay lại
                      </Button>
                   
                  </div>
                </Form>
              </div>
            )}
          </>
        </div>
        <div className="form-container sign-in-container">
          <Form className="form-login">
            <h1 className="head">Đăng nhập</h1>
            <div>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng điền tên của bạn" },
                ]}
              >
                <Input
                  placeholder="Email của bạn?"
                  className={"input-login"}
                  name="email"
                  value={userLogin.email}
                  onChange={handleInputChangeLogin}
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền mật khẩu của bạn",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Mật khẩu?"
                  className={"input-login"}
                  name="password"
                  value={userLogin.password}
                  onChange={handleInputChangeLogin}
                />
              </Form.Item>
            </div>
            <a style={{ marginBottom: "10px" }} href="#">
              Quên mật khẩu?
            </a>
            <button className="button-login" onClick={handleSubmitLogin}>
              Đăng nhập
            </button>
          </Form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="hear-welcome-light">Chào mừng bạn!</h1>
              <p className="sub-he">
                Nhập thông tin cá nhân của bạn và để chúng tôi giúp bạn có một
                đám cưới tuyệt vời nhất!
              </p>
              <button
                onClick={handlePanelChange}
                className={"button-login btn-ghost"}
                id="signUp"
              >
                Đăng nhập
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <p className="hear-welcome mar-10">CuoiDi CuoiDi</p>
              <p className="mar-10">Welcome Back!</p>
              <p className="mar-10">Nếu chưa có tài khoản?</p>
              <button
                className={"button-login btn-ghost"}
                onClick={handlePanelChange}
                id="signIn"
              >
                Đăng ký ngay!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
function setErrorMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
