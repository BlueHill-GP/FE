import { request } from "http";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByUser } from "../api/postApi";
import { getServicePackageByUser } from "../api/servicePackage";
import { getUserByIdpApi } from "../api/userApi";

import Post from "../components/Post";
import ServicePackage from "../container/servicePackageContainer";
import "../assets/css/ProfilePage.css"


import "../assets/css/ProfilePartnerPage.css";
import { updateAvatarApi, updateDescApi } from "../api/userApi";
import { Image } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Rate } from "antd";
import { messageError, messageSuccess } from "../utils/notifi";
const antIcon = (
  <LoadingOutlined style={{ fontSize: 40, color: "#e39797" }} spin />
);



const ProfilePage = () => {
  const { id }: any = useParams();
  const initialUser = {
    username: "",
    avatar: "",
    userType: "",
    desc: '',
  }

    const [star, setStar] = useState(5);
    const descStar = ["terrible", "bad", "normal", "good", "wonderful"];
  const [user, setUser] = useState(initialUser);
  const [posts, setPosts] = useState([]);
  const [servicePackages, setPServicePackages] = useState([]);
  
   useEffect(() => {
     async function fetchData() {
       const response = await getUserByIdpApi(id);
       if (response.data.data) {
         setUser({
           username: response.data.data.username,
           avatar: response.data.data.userId.avatar,
           userType: response.data.data.userType,
           desc: response.data.data.desc,
         });

       }
     }
     fetchData();

     return () => {
       setUser(initialUser);
     };
   }, []);
  
  useEffect(() => {
    async function fetchData() {
      const response = await getPostByUser(id);
      if (response.data.data) {
        
        setPosts(response.data.data);
      }
    }
    fetchData();

    return () => {
      setPosts([]);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getServicePackageByUser(id);
      if (response.data.data) {
        setPServicePackages(response.data.data);
      }
    }
    fetchData();
    return () => {
      setPServicePackages([]);
    };
  }, []);


  return (
    // <div className="profile-page">
    //   {!user.userType || user.userType === "" ? (
    //     <Spin indicator={antIcon} />
    //   ) : (
    //     <div className="">
    //       <div className="info">
    //         <h2 className="">Tên: {user.username}</h2>
    //         <h2 className="">Thợ: {user.userType}</h2>
    //       </div>
    //       <div>
    //         {posts &&
    //           posts.map((post, index) => <Post post={post} key={index} />)}
    //       </div>
    //     </div>
    //   )}

    //   <div>
    //     {servicePackages &&
    //       servicePackages.map((servicePackage, index) => (
    //         <ServicePackage servicePackage={servicePackage} key={index} />
    //       ))}
    //   </div>
    // </div>

    <div className="profile-container">
      <div className="profile-page">
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
                  <h2 className="profile-name-text">{user.username}</h2>
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
                  {user.desc ? (
                    <p>
                      {user.desc}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            {posts ? (
              posts.map((post, index) => <Post post={post} key={index} />)
            ) : (
              <Spin indicator={antIcon} />
            )}
          </div>
        </div>

        <div className="packageForPartner">
          <div>
            {servicePackages ? (
              servicePackages.map((servicePackage, index) => (
                <ServicePackage servicePackage={servicePackage} key={index} />
              ))
            ) : (
              <Spin indicator={antIcon} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
