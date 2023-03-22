import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BookingFormData, createBooking } from "../api/bookingApi";
import { getServicePackageById } from "../api/servicePackage";
import "../assets/css/bookingPage-User.css";
import { RootState } from "../redux/store";
import { messageErrorLog } from "../utils/notifi";
import { groupByComma } from "../utils/numberUtils";

const BookingForm = () => {
  const user = useSelector((state: RootState) => state.user);
  const [servicePackage, setServicePackage] = useState<any>();

  const [bookingData, setBookingData] = useState<BookingFormData>({
    customerId: user.userId,
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: user.email,
    customerGender: "",
    customerAge: 20,
    bookingTime: "",
    bookingAddress: "",
    serviceId: "",
    notes: "",
  });
  const { id }: any = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await getServicePackageById(id);
      if (response.data.data) {
        setServicePackage(response.data.data);
        setBookingData({
          ...bookingData,
          serviceId: response.data.data._id,
        });
      }
    }
    fetchData();
  }, []);

  const onFinish = async () => {
    console.log(bookingData);

    const response = await createBooking(bookingData);
    if (response.data.data) {
      console.log(response.data);

      navigate("/payment", {
        state: {
          data: {
            bookingData: bookingData,
            servicePackageData: servicePackage,
            servicePackage: servicePackage._id,
            price: servicePackage.price,
            bookingId: response.data.data,
          },
        },
      });
    } else {
    }
  };

  const onFinishFailed = () => {
    messageErrorLog("Vui lòng nhập đầy đủ thông tin");
  };
  return (
    <div className={"container-per-infor"}>
      <Form
        className={"form-per-infor"}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600, maxHeight: 800, width: 500, padding: 0 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <p className={"title-per-infor"}>Thông tin liên hệ</p>
        <div className={"info-form-couple"}>
          <div className={"label-form-infor"}>
            Tên khách hàng:
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Vui lòng điền tên của bạn: " },
              ]}
            >
              <Input
                style={{ height: 30, width: 300 }}
                value={bookingData.customerName}
                onChange={(event) =>
                  setBookingData({
                    ...bookingData,
                    customerName: event.target.value,
                  })
                }
              />
            </Form.Item>
          </div>

          <div className={"label-form-infor"}>
            Địa chỉ khách hàng:
            <Form.Item
              style={{ height: 30 }}
              name="address"
              rules={[
                { required: true, message: "Vui lòng điền địa chỉ của bạn" },
              ]}
            >
              <Input
                style={{ height: 30, width: 300 }}
                value={bookingData.customerAddress}
                onChange={(event) =>
                  setBookingData({
                    ...bookingData,
                    customerAddress: event.target.value,
                  })
                }
              />
            </Form.Item>
          </div>

          <div className={"label-form-infor"}>
            Email:
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Email không hợp lý",
                },
                {
                  required: true,
                  message: "Vui lòng điền email của bạn",
                },
              ]}
            >
              <Input
                style={{ height: 30, width: 300 }}
                value={bookingData.customerEmail}
                onChange={(event) =>
                  setBookingData({
                    ...bookingData,
                    customerEmail: event.target.value,
                  })
                }
              />
            </Form.Item>
          </div>
          <div className={"label-form-infor"}>
            Số điện thoại:
            <Form.Item
              name="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại của bạn!",
                },
              ]}
            >
              <Input
                style={{ height: 30, width: 300 }}
                value={bookingData.customerPhone}
                onChange={(event) =>
                  setBookingData({
                    ...bookingData,
                    customerPhone: event.target.value,
                  })
                }
              />
            </Form.Item>
          </div>
          <div className="row">
            <div className={"label-form-infor"}>
              Thời gian đặt:
              <Form.Item
                name="date-time-picker"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian đặt gói",
                  },
                ]}
              >
                <DatePicker
                  style={{ height: 30, width: 140 }}
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  onChange={(date, dateString) => {
                    setBookingData({
                      ...bookingData,
                      bookingTime: dateString,
                    });
                  }}
                />
              </Form.Item>
            </div>

            <div className={"label-form-infor"}>
              Giới tính:
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn giới tính",
                  },
                ]}
              >
                <Select
                  style={{ height: 30, width: 100 }}
                  onChange={(value: string) =>
                    setBookingData({
                      ...bookingData,
                      customerGender: value,
                    })
                  }
                  placeholder="giới tính"
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác...</option>
                </Select>
              </Form.Item>
            </div>

            <div className={"label-form-infor"}>
              Tuổi:
              <Form.Item
                name="age"
                rules={[{ required: true, message: "Vui lòng điền tuổi: " }]}
              >
                <InputNumber
                  style={{ height: 30, width: 60 }}
                  onChange={() => (value: number) => {
                    setBookingData({
                      ...bookingData,
                      customerAge: value,
                    });
                  }}
                />
              </Form.Item>
            </div>
          </div>

          <div className={"label-form-infor"}>
            Địa chỉ đặt hàng:
            <Form.Item
              name="address-book"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền địa chỉ đặt hàng của bạn",
                },
              ]}
            >
              <Input
                style={{ height: 30, width: 300 }}
                value={bookingData.bookingAddress}
                onChange={(event) =>
                  setBookingData({
                    ...bookingData,
                    bookingAddress: event.target.value,
                  })
                }
              />
            </Form.Item>
          </div>

          <div className={"label-form-infor"}>
            Ghi chú:
            <Form.Item name="Intro">
              <Input.TextArea
                style={{ height: 30, width: 300 }}
                showCount
                maxLength={100}
                value={bookingData.notes}
                onChange={(event) =>
                  setBookingData({
                    ...bookingData,
                    notes: event.target.value,
                  })
                }
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item style={{ textAlign: "center" }}>
          <button className={"form-submit-per-infor"}>Tiếp tục</button>
        </Form.Item>
      </Form>

      {servicePackage && (
        <div className={"container"}>
          <div>
            {servicePackage &&
              servicePackage.image.map((imageUrl: string, index: number) => (
                <img
                  className={"image-service-paka"}
                  key={index}
                  src={imageUrl}
                  alt={`Hình ảnh ${index} của bài đăng`}
                />
              ))}
          </div>

          <div className={"infor-contact"}>
            <p className={"service-package-title"}>{servicePackage.title}</p>
            <p className={"service-package-price"}>
              {groupByComma(servicePackage.price)}vnđ
            </p>
            <p className={"service-package-description"}>
              {servicePackage.description}
            </p>
            <p className={"service-package-star"}>
              Số sao: {servicePackage.star.length}
            </p>
            <p className={"service-package-user"}>
              Người dùng: {servicePackage.user.username}
            </p>
            <p className={"service-package-createAt"}>
              Đã đăng vào lúc:{" "}
              {new Date(servicePackage.createAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
