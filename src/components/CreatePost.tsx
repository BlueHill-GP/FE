import React, { useState } from "react";
import { createPost } from "../api/postApi";
import "../assets/css/CreatePosts.css";
import Post from "../container/PostContainer";
import { Image } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { messageError, messageSuccess } from "../utils/notifi";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#e39797" }} spin />
);
function CreatePost() {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("description", description);
    try {
      const response = await createPost(formData);

      if (response.status === 200) {
        setFiles([]);
        setDescription("");
        messageSuccess('Tạo post thành công!')
        setPosts([response.data.post, ...posts]);

      }
    } catch (error) {
      console.log(error);
      messageError('Lỗi mất rồi...')
    }
    finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles: File[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        newFiles.push(selectedFiles[i]);
      }
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="createPostContainer">
      <form className="create-post" onSubmit={handleSubmit}>
        <div className="caption">
          <textarea
            required
            name=""
            placeholder="Bạn đang nghĩ gì..."
            id="description-input"
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
          ></textarea>
        </div>
        <div className="create-bottom">
          <div className="icons">
            <div className="icon_container">
              <label htmlFor="chooseImg">
                <i className="fa-solid fa-image"></i>
              </label>
            </div>
            <div className="icon_container">
              <i className="fa-solid fa-location-dot"></i>
            </div>

            <div className="icon_container">
              <i className="fa-solid fa-link"></i>
            </div>
            <div className="icon_container">
              <i className="fa-solid fa-user-group"></i>
            </div>
          </div>

          <button type="submit" className="create-btn">
            {loading ? <Spin indicator={antIcon} /> : "Lưu"}
          </button>
        </div>
        <div>
          <input
            className="choose-img"
            id="chooseImg"
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <div className="row justify-center ">
          {files &&
            Array.from(files).map((image, index) => (
              <div className="review-img" key={index}>
                <Image
                  className=""
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                  width={100}
                  height={100}
                  src={URL.createObjectURL(image)}
                />
                <div
                  className="remove-img "
                  onClick={() => handleRemoveFile(index)}
                >
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            ))}
        </div>
      </form>

      {posts &&
        posts.map((post: any, index: number) => (
          <Post post={post} key={index} />
        ))}
    </div>
  );
}

export default CreatePost;
