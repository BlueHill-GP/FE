import img from "../assets/images/profile.png";
import React, { useEffect, useRef, useState } from "react";
import { getPostByUser } from "../api/postApi";
import { getServicePackageByUser } from "../api/servicePackage";
import CreatePost from "../components/CreatePost";
import CreateServicePackage from "../components/CreateServicePackage";
import Post from "../components/Post";
import ServicePackage from "../container/servicePackageContainer";
import "../assets/css/ProfilePartnerPage.css";
import { updateAvatarApi, updateDescApi } from "../api/userApi";
import { Button, Image, Tour, TourProps } from "antd";
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
    avatar: string;
    desc: string;
  };
  setUser: (userId: string) => void;
}
const ProfilePage = (props: IProp) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  

  const [openTour, setOpenTour] = useState<boolean>(false);
  const { user, setUser } = props;
  const [avatar, setAvatar] = useState<File[]>([]);
  const [posts, setPosts] = useState([]);
  const [servicePackages, setPServicePackages] = useState([]);
  const [desc, setDesc] = useState(user.desc);
  const [openEditDesc, setOpenEditDesc] = useState(false);
  const [star, setStar] = useState(5);
  const descStar = ["terrible", "bad", "normal", "good", "wonderful"];
  const steps: TourProps["steps"] = [
    {
      title: "profile của bạn",
      description: "hãy xây dựng trang cá nhân của bạn đẹp nhất có thể ",
      //  cover: <img alt="tour.png" src={img} />,
      target: () => ref1.current,
    },
    {
      title: "Thêm avatar",
      description: "Chọn một bức ảnh đẹp nhất nào!!.",
      target: () => ref2.current,
    },
    {
      title: "Thêm giới thiệu",
      description: "vui lòng không để lộ thông tin cá nhân",
      target: () => ref3.current,
    },
    {
      title: "Tạo Bài Viết",
      description: "",
      target: () => ref4.current,
    },
    
    {
      title: "thêm gói dịch vụ",
      description: "",
      target: () => ref5.current,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const response = await getPostByUser(user.userId);
      if (response.data.data) {
        console.log(response.data.data);

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
      const response = await getServicePackageByUser(user.userId);
      if (response.data.data) {
        setPServicePackages(response.data.data);
      }
    }
    fetchData();
    return () => {
      setPServicePackages([]);
    };
  }, []);

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
        messageSuccess("thêm avatar thành công");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      messageError("Thêm avatar thất bại");

      console.log(error);
    }
  };

  const handleUpdateDesc = async () => {
    try {
      const response = await updateDescApi({ desc });
      if (response.status === 200) {
        console.log(response.data.data);

        messageSuccess("chỉnh sử thông tin thành công");
        setUser(user.userId);
        setOpenEditDesc(!openEditDesc);
      }
    } catch (error) {
      messageError("Chỉnh sửa thất bại");
    }
  };
  return (
    <div className="profile-container">
      <Button
        className="btm-tour-profile"
        type="primary"
        onClick={() => setOpenTour(true)}
      >
        Begin Tour
      </Button>
      <div className="profile-page">
        <div className="info">
          <div className="fixed-box">
            <div className="info-container" ref={ref1}>
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
                {avatar.map((file, index) => (
                  <div className="handle-img">
                    <div key={index}>
                      <Image
                        className="avatar-review"
                        width={100}
                        height={100}
                        src={URL.createObjectURL(file)}
                      />
                      <div className="row justify-center icon-handle-avatar ">
                        <div onClick={() => handleRemoveFile(index)}>
                          <i className="fa-solid fa-trash"></i>
                        </div>
                        <div onClick={handleUpdateAvatar}>
                          <i className="fa-solid fa-check"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <label
                  className="update-avatar"
                  htmlFor="chooseImg1"
                  ref={ref2}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </label>
                <input
                  className="choose-img"
                  id="chooseImg1"
                  type="file"
                  onChange={handleFileChangeProfile}
                />
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
                <div ref={ref3} className="row desc-profile justify-center col-row">
                  {desc ? (
                    <p>
                      {user.desc}
                      <i
                        onClick={() => setOpenEditDesc(!openEditDesc)}
                        className="fa-solid fa-pen-to-square"
                      ></i>
                    </p>
                  ) : (
                    <p >
                      Thêm châm ngôn làm việc của bạn?
                      <i
                        onClick={() => setOpenEditDesc(!openEditDesc)}
                        className="fa-solid fa-pen-to-square"
                      ></i>
                    </p>
                  )}

                  {openEditDesc ? (
                    <div className="handle-desc">
                      <div className="caption">
                        <textarea
                          required
                          name=""
                          placeholder="Thêm thông tin về  bạn..."
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          rows={4}
                        ></textarea>
                        <div className="func">
                          <i
                            onClick={() => setOpenEditDesc(!openEditDesc)}
                            className="fa-solid fa-xmark"
                          ></i>
                          <i
                            onClick={handleUpdateDesc}
                            className="fa-solid fa-check"
                          ></i>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div ref={ref4}>
            <CreatePost />
          </div>
          <div>
            {posts ? (
              posts.map((post, index) => <Post post={post} key={index} />)
            ) : (
              <Spin indicator={antIcon} />
            )}
          </div>
        </div>

        <div className="packageForPartner">
          <div ref={ref5}>
            <CreateServicePackage />
          </div>
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
      <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
    </div>
  );
};

export default ProfilePage;
