import React, { useEffect, useState } from "react";
import { getAllBookingByUser } from "../api/bookingApi";
import Booking from "../components/booking/Booking";
// import "../assets/css/booking.css";
import { updateAvatarApi } from "../api/userApi";
import { setUser } from "../redux/slide/profileSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Col } from "antd";
import { socket } from "../App";

import { Image } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Rate } from "antd";
import { messageError, messageSuccess } from "../utils/notifi";
const antIcon = (
  <LoadingOutlined style={{ fontSize: 40, color: "#e39797" }} spin />
);

interface IProp {
  user: {
    userId: string;
    name: string;
    email: string;
    userType: string;
  };
}
const MyBooking = (props: IProp) => {
  const user = useSelector((state: RootState) => state.user);

  const [waitingBookings, setWaitingBookings] = useState<any[]>([]);
  const [acceptedBookings, setAcceptedBookings] = useState<any[]>([]);
  const [rejectedBookings, setRejectedBookings] = useState<any[]>([]);
  console.log("acc",acceptedBookings);
  console.log("rej",rejectedBookings);
  

  const [star, setStar] = useState(5);
  const descStar = ["terrible", "bad", "normal", "good", "wonderful"];
  console.log(waitingBookings);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllBookingByUser(user.userId);
      if (response.data.data) {
        const bookings = response.data.data;
        setWaitingBookings(
          bookings.filter((booking: any) => booking.bookingStatus === "waiting")
        );
        setAcceptedBookings(
          bookings.filter(
            (booking: any) => booking.bookingStatus === "accepted"
          )
        );
        setRejectedBookings(
          bookings.filter(
            (booking: any) => booking.bookingStatus === "rejected"
          )
        );
      }
    }
    fetchData();
  }, []);

  const [avatar, setAvatar] = useState<File[]>([]);

  const handleFileChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0];
      setAvatar([file]);
    }
  };
  const handleRemoveFile = (index: number) => {
    const newFiles = [...avatar];
    newFiles.splice(index, 1);
    setAvatar(newFiles);
  };

  const handleUpdateAvatar = async () => {
    const formData = new FormData();
    if (avatar) {
      formData.append("images", avatar[0]);
    }

    try {
      const response = await updateAvatarApi(formData);

      if (response.status === 200) {
        console.log(response.data.data);
        setUser(user.userId);
        setAvatar([]);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("err1");
      console.log(error);
    }
  };
  useEffect(() => {
    socket.on("update-booking", (data: any) => {
      console.log(data);
      // if(data.data.booking.)
      if (data.bookingStatus === "accepted") {
      setAcceptedBookings((prevMyBooking) => [data.data, ...prevMyBooking]);
      } else {
      setRejectedBookings((prevMyBooking) => [data.data, ...prevMyBooking]);
        
      }
    });
    socket.on("new-booking", (data: any) => {
      console.log(data);
      setWaitingBookings((prevMyBooking) => [data.data, ...prevMyBooking]);
    });
  }, []);
  return (
    <div className="profile-container">
      <div className="profile-page">
        {/* <div className="info">
          {user.avatar !== "" ? (
            <img className="avatar-profile" src={user.avatar} alt="" />
          ) : (
            <img
              className="avatar-profile"
              src={
                "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
              }
              alt=""
            />
          )}

          {avatar.map((file, index) => (
            <div key={index}>
              <span>{file.name}</span>
              <button type="button" onClick={() => handleRemoveFile(index)}>
                Xóa
              </button>
            </div>
          ))}

          <input
            className="choose-img"
            id="chooseImg1"
            type="file"
            onChange={handleFileChangeProfile}
          />
          <h2 className="">
            <i className="fa-solid fa-circle-user"></i> {user.name}
          </h2>
          <h2 className="">
            <i className="fa-solid fa-camera"></i> {user.userType}
          </h2>
          <div className="update-option">
            <button onClick={handleUpdateAvatar}>
              <i className="fa-solid fa-check"></i>
            </button>
            <label htmlFor="chooseImg1">
              <i className="fa-solid fa-pen-to-square"></i>
            </label>
          </div>
        </div> */}

        <div className="info">
          <div className="fixed-box">
            <div className="info-container">
              <div className="row justify-center col-row">
                <div className="img-avatar">
                  {user.avatar !== "" ? (
                    <Image
                      width={170}
                      height={170}
                      className="avatar-profile"
                      src={user.avatar}
                      alt=""
                    />
                  ) : (
                    <Image
                      className="avatar-profile"
                      src={
                        "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                      }
                      alt=""
                    />
                  )}
                </div>

                <div className="profile-text">
                  <h2 className="profile-name-text">{user.name}</h2>
                  <h2 className="user-tyle-text">
                    {user.userType === "makeup" ? (
                      <i className="fa-solid fa-paintbrush"></i>
                    ) : (
                      <i className="fa-solid fa-camera"></i>
                    )}

                    {user.userType}
                  </h2>
                </div>

                <div className="start-container">
                  <span>
                    <Rate tooltips={descStar} onChange={setStar} value={star} />
                    {star ? <span className="ant-rate-text"></span> : ""}
                  </span>
                </div>
                <div className="row desc-profile justify-center col-row">
                  {user.desc ? <p>{user.desc}</p> : <p></p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Col>
          <div className="">
            <div className="list-booking">
              {waitingBookings &&
                waitingBookings.map((booking: any, index) => (
                  <Booking booking={booking} />
                ))}
            </div>
          </div>
          <div className="">
            <div className="list-booking">
              {acceptedBookings &&
                acceptedBookings.map((booking: any, index) => (
                  <Booking booking={booking} />
                ))}
            </div>
          </div>
          <div className="">
            <div className="list-booking">
              {rejectedBookings &&
                rejectedBookings.map((booking: any, index) => (
                  <Booking booking={booking} />
                ))}
            </div>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default MyBooking;
