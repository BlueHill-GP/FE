import { useState } from "react";
import "../../src/assets/css/register.css";
import {
  registerApi,
  RegisterData,
  ResendOtpData,
  VerifyOtpData,
} from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { messageError, messageSuccess } from "../utils/notifi";
import { Button, Select, Form, Input } from "antd";
const { Option } = Select;

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
  const [showPwd, setShowPwd] = useState(false);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleOTPInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOtp(value);
  };

  const handleOtpVerification = async () => {
    console.log('sfsdf');
    
    verifyOtpRegister({ email: user.email, otp }, navigate);
  };

  const handleResendOtp = async () => {
    resendOtp({ email: user.email });
  };
  const onFinish = async () => {
    try {
      const response = await registerApi(user);
      if (response.status === 200) {
        setErrorMessage("");
        setShowOtpInput(true);
        messageSuccess(response.data.message);
      }
    } catch (error) {
      messageError(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleClick = () => {
    onFinish();
  };
  return (
    <div className={"container-register"}>
      <>
        {!showOtpInput ? (
          <section className={"register-section"}>
            <div className={"form_header"}>
              <h1 className={"form_header_welcome"}>
                {" "}
                Chào mừng đến Cuoidi Cuoidi
              </h1>
              <p> Hãy tận hưởng đám cưới của bạn</p>
              <h1 className={"form_header_register-text"}>Đăng ký</h1>
            </div>
            <div className={"form-login"}>
              <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <div className={"label-form-register-login"}>
                  {" "}
                  Tên đầy đủ:
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: "Vui lòng nhập tên của bạn" },
                    ]}
                  >
                    <Input
                      name="username"
                      value={user.username}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </div>

                <div className={"label-form-register-login"}>
                  {" "}
                  Email
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
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </div>

                <div className={"label-form-register-login"}>
                  Số điện thoại
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
                      value={user.phone}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </div>

                <div className={"label-form-register-login"}>
                  {" "}
                  Mật khẩu
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
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </div>
                <div className={"label-form-register-login"}>
                  Đăng ký với tư cách:
                  <Form.Item name="userType" rules={[{ required: true }]}>
                    <Select
                      className={"userType"}
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
                <button className={"btn-login"}>Đăng ký</button>
                <button
                  className="line"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Đăng nhập
                </button>
              </Form>
            </div>
          </section>
        ) : (
          <div>
            <div className={"form-verify"}>
              <Form
                name="basic"
                labelCol={{ span: 15 }}
                wrapperCol={{ span: 30 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleOtpVerification}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <div>
                  <div className={"OTP-code"}>
                    {" "}
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
                        className={"test-otp"}
                        name="otp"
                        value={otp}
                        onChange={handleOTPInputChange}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      onClick={handleOtpVerification}
                      className={"verifi-OTP"}
                    >
                      Xác thực mã OTP
                    </Button>

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

                    <Button
                      className={"verifi-OTP"}
                      onClick={handleResendOtp}
                      type="primary"
                      htmlType="button"
                    >
                      Gửi lại mã OTP
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
