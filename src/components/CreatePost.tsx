import React, { useState } from "react";
import Post from "./Post";
import api from "../api/api";
import { createPost } from "../api/postApi";

function CreatePost() {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [post, setPost] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("description", description);
    try {
      const response =await createPost(formData);

      if (response.status === 200) {
        setFiles([]);
        setDescription("");
        console.log(response.data.post);

        setPost(response.data.post);
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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description-input">Description:</label>
        <input
          type="text"
          id="description-input"
          value={description}
          onChange={handleDescriptionChange}
        />
        {files.map((file, index) => (
          <div key={index}>
            <span>{file.name}</span>
            <button type="button" onClick={() => handleRemoveFile(index)}>
              Remove
            </button>
          </div>
        ))}
        <div>
          <label htmlFor="file-input">Upload Images:</label>
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {post && <Post post={post} />}
    </div>
  );
}

export default CreatePost;
