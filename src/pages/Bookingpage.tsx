import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingFormData, createBooking } from "../api/bookingApi";
import { getServicePackageById } from "../api/servicePackage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../assets/css/bookingPage-User.css"
import { Button, Checkbox, Form, Input, Select,DatePicker,  } from 'antd';
import {config} from "@fortawesome/fontawesome-svg-core";

const BookingForm = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [servicePackage, setServicePackage] = useState<any>();
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <option value="84">+84</option>
            </Select>
        </Form.Item>
    );
  const [bookingData, setBookingData] = useState<BookingFormData>({
    customerId: user.userId,
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: user.email,
    customerGender: "",
    customerAge: 0,
    bookingTime: "",
    bookingAddress: "",
    serviceId: "",
    notes: "",
  });

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(bookingData);

    const response = await createBooking(bookingData);
    if (response.data.data) {
      console.log(response.data);

      navigate("/payment", {
        state: {
          data: {
            servicePackage: servicePackage._id,
            price: servicePackage.price,
            bookingId: response.data.data,
          },
        },
      });
    } else {
    }
  };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
  return (
    <div className={"container-per-infor"}>
        <Form className={"form-per-infor"}
              wrapperCol={{ span: 20}}
              style={{ maxWidth: 600 }}
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
                        rules={[{ required: true, message: 'Vui lòng điền tên của bạn: ' }]}
                    >
                        <Input />
                    </Form.Item>
                    </div>

                    <div className={"label-form-infor"}>
                        Địa chỉ khách hàng:
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng điền địa chỉ của bạn' }]}
                    >
                        <Input />
                    </Form.Item>
                    </div>

                    <div className={"label-form-infor"}>
                        Email:
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Email không hợp lý',
                            },
                            {
                                required: true,
                                message: 'Vui lòng điền email của bạn',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    </div>

                    <div className={"label-form-infor"}>
                            Thời gian đặt gói:
                    <Form.Item
                        name="date-time-picker"
                               /*{...config}*/
                               rules={[
                                   {
                                       required: true,
                                       message: 'Vui lòng chọn thời gian đặt gói',
                                   },
                               ]}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    </div>

                    <div className={"label-form-infor"}>
                        Địa chỉ đặt hàng:
                    <Form.Item
                        name="address-book"
                        rules={[{ required: true, message: 'Vui lòng điền địa chỉ đặt hàng của bạn' }]}
                    >
                        <Input />
                    </Form.Item>
                    </div>

                    <div className={"label-form-infor"}>
                        Số điện thoại:
                    <Form.Item
                        name="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                    </div>

                    <div className={"label-form-infor"}>
                        Giới tính:
                    <Form.Item
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn giới tính',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn giới tính của bạn">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </Select>
                    </Form.Item>
                    </div>

                    <div className={'label-form-infor'}>
                        Ghi chú
                    <Form.Item
                        name="Intro"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Intro',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                    </div>

                    <Form.Item >
                        <button className={"form-submit-per-infor"} >
                            Submit
                        </button>
                    </Form.Item>
                </div>

        </Form>
      {servicePackage && (

        <div className={"container"}>
            {servicePackage &&
                servicePackage.image.map((imageUrl: string, index: number) => (
                    <img
                        className={"image-service-paka"}
                        key={index}
                        src={imageUrl}
                        alt={`Hình ảnh ${index} của bài đăng`}
                    />
                ))}
          <div className={"infor-contact"}>
            <p className={"service-package-title"}>{servicePackage.title}</p>
            <p className={"service-package-price"}>{servicePackage.price}</p>
            <p className={"service-package-description"}>{servicePackage.description}</p>
              <p className={"service-package-star"}>Số sao: {servicePackage.star.length}</p>
              <p className={"service-package-user"}>Người dùng: {servicePackage.user.username}</p>
              <p className={"service-package-createAt"}>Đã đăng vào lúc:{" "}{new Date(servicePackage.createAt).toLocaleString()}</p>

          </div>
        </div>
      )}

      {/*<form className={"form-per-infor"} onSubmit={handleSubmit}>*/}
      {/*  <p className={"title-per-infor"}>Thông tin liên hệ</p>*/}
      {/*  <label className={"label-form-infor"}>*/}
      {/*    Tên khách hàng:*/}
      {/*    <input*/}
      {/*      className={"per-infor-type-text"}*/}
      {/*      type="text"*/}
      {/*      value={bookingData.customerName}*/}
      {/*      onChange={(event) =>*/}
      {/*        setBookingData({*/}
      {/*          ...bookingData,*/}
      {/*          customerName: event.target.value,*/}
      {/*        })*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <label className={"label-form-infor"}>*/}
      {/*    Địa chỉ khách hàng:*/}
      {/*    <input*/}
      {/*      className={"per-infor-type-text"}*/}
      {/*      type="text"*/}
      {/*      value={bookingData.customerAddress}*/}
      {/*      onChange={(event) =>*/}
      {/*        setBookingData({*/}
      {/*          ...bookingData,*/}
      {/*          customerAddress: event.target.value,*/}
      {/*        })*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <label className={"label-form-infor"}>*/}
      {/*    Số điện thoại:*/}
      {/*    <input*/}
      {/*      className={"per-infor-type-text"}*/}
      {/*      type="text"*/}
      {/*      value={bookingData.customerPhone}*/}
      {/*      onChange={(event) =>*/}
      {/*        setBookingData({*/}
      {/*          ...bookingData,*/}
      {/*          customerPhone: event.target.value,*/}
      {/*        })*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <label className={"label-form-infor"}>*/}
      {/*    Email:*/}
      {/*    <input*/}
      {/*      className={"per-infor-type-email"}*/}
      {/*      type="email"*/}
      {/*      value={bookingData.customerEmail}*/}
      {/*      onChange={(event) =>*/}
      {/*        setBookingData({*/}
      {/*          ...bookingData,*/}
      {/*          customerEmail: event.target.value,*/}
      {/*        })*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <label className={"label-form-infor"}>*/}
      {/*    Giới tính:*/}
      {/*    <input*/}
      {/*      className={"per-infor-type-text"}*/}
      {/*      type="text"*/}
      {/*      value={bookingData.customerGender}*/}
      {/*      onChange={(event) =>*/}
      {/*        setBookingData({*/}
      {/*          ...bookingData,*/}
      {/*          customerGender: event.target.value,*/}
      {/*        })*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <label className={"label-form-infor"}>*/}
      {/*    Tuổi:*/}
      {/*    <input*/}
      {/*      className={"per-infor-type-number"}*/}
      {/*      type="number"*/}
      {/*      value={bookingData.customerAge}*/}
      {/*      onChange={(event) =>*/}
      {/*        setBookingData({*/}
      {/*          ...bookingData,*/}
      {/*          customerAge: Number(event.target.value),*/}
      {/*        })*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <label className={"label-form-infor"}>*/}
      {/*    Thời gian đặt gói:*/}
      {/*    <input*/}
      {/*      className={"per-infor-datetime-local"}*/}
      {/*      type="datetime-local"*/}
      {/*      value={bookingData.bookingTime}*/}
      {/*      onChange={(event) =>*/}
      {/*        setBookingData({*/}
      {/*          ...bookingData,*/}
      {/*          bookingTime: event.target.value,*/}
      {/*        })*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <label className={"label-form-infor"}>*/}
      {/*    Địa chỉ đặt gói:*/}
      {/*    <input*/}
      {/*      className={"per-infor-type-text"}*/}
      {/*      type="text"*/}
      {/*      value={bookingData.bookingAddress}*/}
      {/*      onChange={(event) =>*/}
      {/*        setBookingData({*/}
      {/*          ...bookingData,*/}
      {/*          bookingAddress: event.target.value,*/}
      {/*        })*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  <label className={"label-form-infor"}>*/}
      {/*    Ghi chú:*/}
      {/*    <textarea*/}
      {/*      className={"per-infor-type-textrea"}*/}
      {/*      value={bookingData.notes}*/}
      {/*      onChange={(event) =>*/}
      {/*        setBookingData({*/}
      {/*          ...bookingData,*/}
      {/*          notes: event.target.value,*/}
      {/*        })*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <button className={"form-submit-per-infor"} type="submit">*/}
      {/*    Tiếp tục*/}
      {/*  </button>*/}
      {/*</form>*/}
    </div>
  );
};

export default BookingForm;
