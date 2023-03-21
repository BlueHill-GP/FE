import React, { useState } from "react";
import { createPost } from "../api/postApi";
import "../assets/css/CreatePosts.css";
import Post from "../container/PostContainer";
function CreatePost() {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        setPosts([response.data.post, ...posts]);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("err1");
      console.log(error);
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
            Xong
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
        {files.map((file, index) => (
          <div key={index}>
            <span>{file.name}</span>
            <button type="button" onClick={() => handleRemoveFile(index)}>
              xóa
            </button>
          </div>
        ))}
      </form>

      {/* {posts
        ? posts.map((post: any, index: number) => (
            <Post post={post} key={index} />
          ))
        : ""} */}

      {posts &&
        posts.map((post: any, index: number) => (
          <Post post={post} key={index} />
        ))}
    </div>
  );
}

export default CreatePost;
