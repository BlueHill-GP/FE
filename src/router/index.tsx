import { Route, Routes, useNavigate } from "react-router-dom";
import ChooseTime from "../components/ChooseTime";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../container/LoginPageContainer";
import PostsPage from "../pages/PostsPage";
import ProfilePartnerPage from "../container/ProfilePageContainer";
import RegisterPage from "../container/RegisterPageContainer";
import { getAccessToken } from "../utils/storage";
import { useEffect, useState } from "react";
import ProfilePage from "../pages/ProfilePage";
import ErrorPage from "../pages/ErrorPage";
import BookingForm from "../pages/Bookingpage";
import VNPay from "../pages/Payment";
import MyBooking from "../container/MyBookingContainer";
import { socket } from "../App";
// import socket from "../SocketIo";

interface IProps {
  isLogin: boolean;
  userType: string;
  userId: string;
  setLoginState: () => void;
}
const Router = (props: IProps) => {
  const { isLogin, setLoginState, userType, userId } = props;

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      socket.emit("user-connect", userId);
      setLoginState();
    }
  }, []);
  return (
    <Routes>
      {isLogin ? (
        <>
          <Route path="" element={<MainLayout />}>
            <Route path="/" index element={<HomePage />} />
            <Route path="/new" element={<PostsPage />} />
            <Route path="/booking" element={<ChooseTime />} />
            <Route path="/payment" element={<VNPay />} />
            <Route path="/booking/:id" element={<BookingForm />} />
            {userType === "photographer" || userType === "makeup" ? (
              <>
                <Route path="/profile" element={<ProfilePartnerPage />} />
                <Route path="/my-booking" element={<MyBooking />} />
              </>
            ) : null}
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="*" element={<LoginPage />} index />
          <Route path="register" element={<RegisterPage />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
