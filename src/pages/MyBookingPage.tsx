import React, { useEffect, useState } from "react";
import { getAllBookingByUser } from "../api/bookingApi";
import Booking from "../components/booking/Booking";
// import "../assets/css/booking.css";
import { updateAvatarApi } from "../api/userApi";
import { setUser } from "../redux/slide/profileSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IProp {
  user: {
    userId: string;
    name: string;
    email: string;
    userType: string;
  };
}
const MyBooking = (props: IProp) => {
 const user = useSelector((state:RootState) => state.user);
  const [myBooking, setMyBooking] = useState([]);
  console.log(myBooking);
  useEffect(() => {
    async function fetchData() {
      const response = await getAllBookingByUser(user.userId);
      if (response.data.data) {
        setMyBooking(response.data.data);
      }
    }
    fetchData();

    return () => {
      setMyBooking([]);
    };
  }, []);

  const [avatar, setAvatar] = useState<File[]>([]);
  const [posts, setPosts] = useState([]);
  const [servicePackages, setPServicePackages] = useState([]);
  console.log(servicePackages);

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
  return (
    <div className="profile-container">
      <div className="profile-page">
        <div className="info">
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
        </div>

        <div className="booking">
          <div className="list-booking">
            {myBooking &&
              myBooking.map((booking: any, index) => (
                <Booking booking={booking} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
