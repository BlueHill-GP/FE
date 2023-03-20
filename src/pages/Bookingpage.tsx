import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingFormData, createBooking } from "../api/bookingApi";
import { getServicePackageById } from "../api/servicePackage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../assets/css/bookingPage.css"
const BookingForm = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [servicePackage, setServicePackage] = useState<any>();

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

  return (

    // <div className="booking-page">
    //   <form onSubmit={handleSubmit}>
    //     <label>

    <div className={"container-per-infor"}>
      {servicePackage && (
        <div className={"container"}>
          <div className={"infor-contact"}>
            {/*<div className=""></div>*/}
            <p className={"service-package-title"}>{servicePackage.title}</p>
            <p className={"service-package-price"}>{servicePackage.price}</p>
            <p className={"service-package-description"}>
              {servicePackage.description}
            </p>
            {servicePackage &&
              servicePackage.image.map((imageUrl: string, index: number) => (
                <img
                  className={"image-service-paka"}
                  key={index}
                  src={imageUrl}
                  alt={`Hình ảnh ${index} của bài đăng`}
                />
              ))}
            <p className={"service-package-star"}>
              Số sao: {servicePackage.star.length}
            </p>
            <p className={"service-package-user"}>
              Người dùng: {servicePackage.user.username}
            </p>
            <p className={"service-package-creteAt"}>
              Đã đăng vào lúc:{" "}
              {new Date(servicePackage.createAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
      <form className={"form-per-infor"} onSubmit={handleSubmit}>
        <p className={"title-per-infor"}>Thông tin liên hệ</p>
        <label className={"label-form-infor"}>
          Tên khách hàng:
          <input
            className={"per-infor-type-text"}
            type="text"
            value={bookingData.customerName}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerName: event.target.value,
              })
            }
          />
        </label>
        <label className={"label-form-infor"}>
          Địa chỉ khách hàng:
          <input
            className={"per-infor-type-text"}
            type="text"
            value={bookingData.customerAddress}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerAddress: event.target.value,
              })
            }
          />
        </label>
        <label className={"label-form-infor"}>
          Số điện thoại:
          <input
            className={"per-infor-type-text"}
            type="text"
            value={bookingData.customerPhone}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerPhone: event.target.value,
              })
            }
          />
        </label>
        <label className={"label-form-infor"}>
          Email:
          <input
            className={"per-infor-type-email"}
            type="email"
            value={bookingData.customerEmail}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerEmail: event.target.value,
              })
            }
          />
        </label>
        <label className={"label-form-infor"}>
          Giới tính:
          <input
            className={"per-infor-type-text"}
            type="text"
            value={bookingData.customerGender}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerGender: event.target.value,
              })
            }
          />
        </label>
        <label className={"label-form-infor"}>
          Tuổi:
          <input
            className={"per-infor-type-number"}
            type="number"
            value={bookingData.customerAge}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerAge: Number(event.target.value),
              })
            }
          />
        </label>
        <label className={"label-form-infor"}>
          Thời gian đặt gói:
          <input
            className={"per-infor-datetime-local"}
            type="datetime-local"
            value={bookingData.bookingTime}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                bookingTime: event.target.value,
              })
            }
          />
        </label>
        <label className={"label-form-infor"}>
          Địa chỉ đặt gói:
          <input
            className={"per-infor-type-text"}
            type="text"
            value={bookingData.bookingAddress}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                bookingAddress: event.target.value,
              })
            }
          />
        </label>

        <label className={"label-form-infor"}>
          Ghi chú:
          <textarea
            className={"per-infor-type-textrea"}
            value={bookingData.notes}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                notes: event.target.value,
              })
            }
          />
        </label>
        <button className={"form-submit-per-infor"} type="submit">
          Tiếp tục
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
