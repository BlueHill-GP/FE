import React, { useState } from "react";
import axios from "axios";
import ServicePackage from "../container/servicePackageContainer";
import api from "../api/api";
import { createServicePackage } from "../api/servicePackage";
import { Select, Space } from "antd";

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
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [servicePackages, setServicePackages] = useState<IPost[] | null[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("dn");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

        setServicePackages([response.data.newServicePackage, ...servicePackages]);
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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

    const handleChangeLocation = (value: string) => {
      setSelectedLocation(value);
      console.log(`selected ${value}`);
    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <input
          type="text"
          id="description-input"
          value={description}
          onChange={handleDescriptionChange}
        />

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
      {servicePackages &&
        servicePackages.map((servicePackage: any, index: number) => (
          <ServicePackage servicePackage={servicePackage} key={index} />
        ))}
    </div>
  );
}

export default CreateServicePackage;
