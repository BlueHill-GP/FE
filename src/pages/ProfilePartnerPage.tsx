import React, { useEffect, useState } from "react";
import { getPostByUser } from "../api/postApi";
import { getServicePackageByUser } from "../api/servicePackage";
import CreatePost from "../components/CreatePost";
import CreateServicePackage from "../components/CreateServicePackage";
import Post from "../components/Post";
import ServicePackage from "../container/servicePackageContainer";
import "../assets/css/ProfilePartnerPage.css";
import { updateAvatarApi } from "../api/userApi";

interface IProp {
  user: {
    userId: string;
    name: string;
    email: string;
    userType: string;
    avatar: string;
  };
  setUser: (userId: string) => void;
}
const ProfilePage = (props: IProp) => {
  const { user, setUser } = props;
  const [avatar, setAvatar] = useState<File[]>([]);
  const [posts, setPosts] = useState([]);
  const [servicePackages, setPServicePackages] = useState([]);
  console.log(servicePackages);
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
            <p>chuwa chra</p>
          )}
          <button onClick={handleUpdateAvatar}>update avatar</button>
          {avatar.map((file, index) => (
            <div key={index}>
              <span>{file.name}</span>
              <button type="button" onClick={() => handleRemoveFile(index)}>
                Remove
              </button>
            </div>
          ))}
          <label htmlFor="chooseImg1">
            <i className="fa-solid fa-image"></i>
          </label>
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
        </div>

        <div>
          <CreatePost />
          <div>
            {posts &&
              posts.map((post, index) => <Post post={post} key={index} />)}
          </div>
        </div>

        <div className="packageForPartner">
          <CreateServicePackage />
          <div>
            {servicePackages &&
              servicePackages.map((servicePackage, index) => (
                <ServicePackage servicePackage={servicePackage} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
