import React, { useState } from "react";
import axios from "axios";
import ServicePackage from "../container/servicePackageContainer";
import api from "../api/api";
import { createServicePackage } from "../api/servicePackage";
import "../assets/css/CreatePackages.css";
import { Select, Space, Image } from "antd";
import { Spin } from "antd";
import { messageError, messageSuccess } from "../utils/notifi";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#e39797" }} spin />
);

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
  const [servicePackages, setServicePackages] = useState<IPost[] | null[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("dn");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("description", description);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("location", selectedLocation);
    try {
      const response = await createServicePackage(formData);
      if (response.status === 200) {
        setFiles([]);
        setTitle("");
        setPrice("");
        setDescription("");

        setServicePackages([
          response.data.newServicePackage,
          ...servicePackages,
        ]);
      } else {
        throw new Error("Error in request.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  // show package form
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleChangeLocation = (value: string) => {
    setSelectedLocation(value);
    console.log(`selected ${value}`);
  };

  return (
    <div className="createPackageContainer">
      {/* <div className="create-package">
        <h3>Create package</h3>
        <button className="create-package-btn" onClick={handleOpenModal}>
          <i className="fa-regular fa-square-plus"></i>
        </button>
      </div> */}

      <form className="package-form-create" onSubmit={handleSubmit}>
        <div className="big-title">
          <h3>Tạo các gói</h3>
        </div>

        <div className="create-package-item">
          <label htmlFor="title-input">Tiêu đề:</label>
          <input
            required
            type="text"
            id="title-input"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="create-package-item">
          <label htmlFor="price-input">Giá:</label>

          <input
            required
            type="text"
            id="price-input"
            value={price}
            onChange={handlePriceChange}
          />
        </div>

        <label htmlFor="description-input" className="descLabel">
          Mô tả:
        </label>

        <textarea
          required
          className="desc-input"
          id="description-input"
          value={description}
          onChange={handleDescriptionChange}
        />
        <div className="select-location">
          <Space wrap>
            <Select
              defaultValue={selectedLocation}
              style={{ width: 120 }}
              onChange={handleChangeLocation}
              options={[
                { value: "hn", label: "Hà Nội" },
                { value: "dn", label: "Đà Nẵng" },
                { value: "sg", label: "Sài Gòn" },
              ]}
            />
          </Space>
        </div>

        {/* {files.map((file, index) => (
          <div key={index}>
            <span>{file.name}</span>
            <button
              className="remove-btn"
              type="button"
              onClick={() => handleRemoveFile(index)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ))} */}

        {
          <div className="row justify-center wrap">
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
        }
        <div className="iconsPackage">
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
          <button className="save-btn" type="submit">
            {loading ? <Spin indicator={antIcon} /> : "Lưu"}
          </button>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <div>
            <span className="close" onClick={handleCloseModal}>
              <i className="fa-solid fa-circle-xmark"></i>
            </span>
          </div>
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="title-input">Tiêu đề:</label>
            <input
              type="text"
              id="title-input"
              value={title}
              onChange={handleTitleChange}
            />
            <label htmlFor="price-input">Giá:</label>

            <input
              type="text"
              id="price-input"
              value={price}
              onChange={handlePriceChange}
            />
            <label htmlFor="description-input">Mô tả:</label>

            <textarea
              className="desc-input"
              id="description-input"
              value={description}
              onChange={handleDescriptionChange}
            />
            <div>
              <Space wrap>
                <Select
                  defaultValue={selectedLocation}
                  style={{ width: 120 }}
                  onChange={handleChangeLocation}
                  options={[
                    { value: "hn", label: "Hà Nội" },
                    { value: "dn", label: "Đà Nẵng" },
                    { value: "sg", label: "Sài Gòn" },
                  ]}
                />
              </Space>
            </div>

            {files.map((file, index) => (
              <div key={index}>
                <span>{file.name}</span>
                <button type="button" onClick={() => handleRemoveFile(index)}>
                  Xóa
                </button>
              </div>
            ))}
            <div className="iconsPackage">
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
              <button className="save-btn" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      {servicePackages &&
        servicePackages.map((servicePackage: any, index: number) => (
          <ServicePackage servicePackage={servicePackage} key={index} />
        ))}
    </div>
  );
}

export default CreateServicePackage;
