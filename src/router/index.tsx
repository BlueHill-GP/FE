import { Route, Routes, useNavigate } from "react-router-dom";
import ChooseTime from "../components/ChooseTime";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PostsPage from "../pages/PostsPage";
import ProfilePage from "../pages/ProfilePage";
import { RegisterPage } from "../pages/RegisterPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<PostsPage />} />
        <Route path="/set-time" element={<ChooseTime />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};
