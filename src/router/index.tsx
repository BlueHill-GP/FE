import { Route, Routes, useNavigate } from "react-router-dom";
import ChooseTime from "../components/ChooseTime";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../container/LoginPageContainer";
import PostsPage from "../pages/PostsPage";
import ProfilePage from "../container/ProfilePageContainer";
import RegisterPage  from "../container/RegisterPageContainer";
import { getAccessToken } from "../utils/storage";
import { useEffect } from "react";

interface IProps {
  route: string;
  changeRoute: (route: string) => void;
}
const Router = (props: IProps) => {
  const { route } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      if (route === "home") {
        navigate("/");
      } else if (route === "profile") {
        navigate("/profile");
      } else if (route === "new") {
        navigate("/new");
       }
        
    } else {
      navigate("/login");
      if (route === "register") {
        navigate("/register");
      }
    }
  }, [navigate, route]);
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

export default Router;
