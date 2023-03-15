// import React, { useState } from "react";
// import axios from "axios";
// import ServicePackage from "../container/servicePackageContainer";
// import api from "../api/api";
// import { createServicePackage } from "../api/servicePackage";
// import { Select, Space } from "antd";
// import "../assets/css/CreatePackages.css"


// interface IPost {
//   _id: string;
//   title: string;
//   price: number;
//   description: string;
//   images: string[];
// }

// interface IFormData {
//   images: File[];
//   title: string;
//   price: number;
//   description: string;
// }

// const  CreateServicePackage = () =>{
//   const [files, setFiles] = useState<File[]>([]);
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [servicePackages, setServicePackages] = useState<IPost[] | null[]>([]);
//   const [selectedLocation, setSelectedLocation] = useState<string>("dn");


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       formData.append("images", files[i]);
//     }
//     formData.append("description", description);
//     formData.append("title", title);
//     formData.append("price", price);
//     formData.append("location", selectedLocation);
//     try {
//       const response = await createServicePackage(formData);
//       if (response.status === 200) {
//         setFiles([]);
//         setTitle("");
//         setPrice("");
//         setDescription("");

//         setServicePackages([
//           response.data.newServicePackage,
//           ...servicePackages,
//         ]);
//       } else {
//         throw new Error("Error in request.");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = e.target.files;
//     if (selectedFiles) {
//       const newFiles = Array.from(selectedFiles);
//       setFiles([...files, ...newFiles]);
//     }
//   };

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.target.value);
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPrice(e.target.value);
//   };

//   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setDescription(e.target.value);
//   };

//   const handleRemoveFile = (index: number) => {
//     const newFiles = [...files];
//     newFiles.splice(index, 1);
//     setFiles(newFiles);
//   };

//     const handleChangeLocation = (value: string) => {
//       setSelectedLocation(value);
//       console.log(`selected ${value}`);
//     };
//   // show package form
//   const [showModal, setShowModal] = useState(false);

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//     <div>
//       <div className="create-package">
//         <h3>Create your package</h3>
//         <button onClick={handleOpenModal}>
//           <i className="fa-regular fa-square-plus"></i>
//         </button>
//       </div>
//       {showModal && (
//         <div className="modal">
//           <span className="close" onClick={handleCloseModal}>
//             <i className="fa-solid fa-circle-xmark"></i>
//           </span>
//           <form className="modal-form" onSubmit={handleSubmit}>
//             <label htmlFor="title-input">title:</label>
//             <input
//               type="text"
//               id="title-input"
//               value={title}
//               onChange={handleTitleChange}
//             />
//             <label htmlFor="price-input">price:</label>

//             <input
//               type="text"
//               id="price-input"
//               value={price}
//               onChange={handlePriceChange}
//             />
//             <label htmlFor="description-input">Description:</label>

//         <input
//           type="text"
//           id="description-input"
//           value={description}
//           onChange={(e)=>handleDescriptionChange}
//         />

//         <Space wrap>
//           <Select
//             defaultValue={selectedLocation}
//             style={{ width: 120 }}
//             onChange={handleChangeLocation}
//             options={[
//               { value: "hn", label: "Hà Nội" },
//               { value: "dn", label: "Đà Nẵng" },
//               { value: "sg", label: "Sài Gòn" },
//             ]}
//           />
//               </Space>
//                </form>
//         </div>
//       //   {files.map((file, index) => (
//       //     <div key={index}>
//       //       <span>{file.name}</span>
//       //       <button type="button" onClick={() => handleRemoveFile(index)}>
//       //         Remove

//       //       </button>
         
//       // )}
    
//       {servicePackages &&
//         servicePackages.map((servicePackage: any, index: number) => (
//           <ServicePackage servicePackage={servicePackage} key={index} />
//         ))}
//     </div>
//     </div>
   
    
//   )
// }

// {/* export default CreateServicePackage; */}



import React, { useState } from "react";
import axios from "axios";
import ServicePackage from "../container/servicePackageContainer";
import api from "../api/api";
import { createServicePackage } from "../api/servicePackage";
import "../assets/css/CreatePackages.css";
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
  const [price, setPrice] = useState("0");
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

        setServicePackages([
          response.data.newServicePackage,
          ...servicePackages,
        ]);
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
    <div>
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