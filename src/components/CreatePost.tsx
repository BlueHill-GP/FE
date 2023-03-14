import React, { useState } from "react";
import Post from "../container/PostContainer"
import api from "../api/api";
import { createPost } from "../api/postApi";
import "../assets/css/CreatePosts.css"
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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div>
      <form className="create-post" onSubmit={handleSubmit}>
        <div className="caption">
          <textarea
            name=""
            placeholder="Type your caption"
            id="description-input"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <label htmlFor="chooseImg">
            <i className="fa-solid fa-image"></i>
          </label>
        </div>

        {files.map((file, index) => (
          <div key={index}>
            <span>{file.name}</span>
            <button type="button" onClick={() => handleRemoveFile(index)}>
              Remove
            </button>
          </div>
        ))}
        <div>
          <input
            className="choose-img"
            id="chooseImg"
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <button type="submit" className="create-btn">
          Create
        </button>
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
