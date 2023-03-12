import React, { useState } from "react";
import { createServicePackage } from "../api/servicePackage";
import ServicePackage from "./servicePackage";
import "../assets/css/CreatePackages.css"
interface IPost {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
}

interface IFormData {
  images: File[];
  title: string;
  price: number;
  description: string;
}

function CreateServicePackage() {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState<IPost | null>(null);
  console.log("service package", post);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("description", description);
    formData.append("title", title);
    formData.append("price", price);
    try {
      const response = await createServicePackage(formData);
      if (response.status === 200) {
        setFiles([]);
        setTitle("");
        setPrice("");
        setDescription("");

        setPost(response.data.newServicePackage);
      } else {
        throw new Error("Error in request.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // show package form
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="packages">
      <div className="create-package">
        <h3>Create your package</h3>
        <button onClick={handleOpenModal}>
          <i className="fa-regular fa-square-plus"></i>
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <span className="close" onClick={handleCloseModal}>
            <i className="fa-solid fa-circle-xmark"></i>
          </span>
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="title-input">title:</label>
            <input
              type="text"
              id="title-input"
              value={title}
              onChange={handleTitleChange}
            />
            <label htmlFor="price-input">price:</label>

            <input
              type="text"
              id="price-input"
              value={price}
              onChange={handlePriceChange}
            />
            <label htmlFor="description-input">Description:</label>

            <textarea
              className="desc-input"
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
            <label htmlFor="file-input">
              <i className="fa-solid fa-image"></i>
            </label>
            <div className="chooseImg-package">
              <input
                type="file"
                id="file-input"
                onChange={handleFileChange}
                multiple
              />
            </div>
            <button className="save-btn" type="submit">Save</button>
          </form>
        </div>
      )}

      {post && <ServicePackage post={post} />}
    </div>
  );
}

export default CreateServicePackage;
