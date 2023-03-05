// import React, { useState, ChangeEvent, FormEvent } from "react";
// import api from "../api/api";

// interface Post {
//   post: any;
// }

// const CreatePost = () => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [description, setDescription] = useState<string>("");
//   const [post, setPost] = useState<Post | null>(null);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       formData.append("images", files[i]);
//     }
//     formData.append("description", description);
// console.log(formData);

//     const createPost = await api.post(
//       process.env.REACT_APP_API_BASE_URL + `/api/posts`,
//        formData,

//     );
//     if (createPost.status === 200) {
//       setFiles([]);
//       setDescription("");
//     }
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const selectedFiles = e.target.files;
//     const newFiles: File[] = [];
//     if (selectedFiles) {
//       for (let i = 0; i < selectedFiles.length; i++) {
//         newFiles.push(selectedFiles[i]);
//       }
//       setFiles([...files, ...newFiles]);
//     }
//   };

//   const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     setDescription(e.target.value);
//   };

//   const handleRemoveFile = (index: number): void => {
//     const newFiles = [...files];
//     newFiles.splice(index, 1);
//     setFiles(newFiles);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="description-input">Description:</label>
//         <input
//           type="text"
//           id="description-input"
//           value={description}
//           onChange={handleDescriptionChange}
//         />
//         {files.map((file: File, index: number) => (
//           <div key={index}>
//             <span>{file.name}</span>
//             <button type="button" onClick={() => handleRemoveFile(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <div>
//           <label htmlFor="file-input">Upload Images:</label>
//           <input
//             type="file"
//             id="file-input"
//             onChange={handleFileChange}
//             multiple
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState } from "react";
import Post from "./Post";
import api from "../api/api";

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
      const response = await api.post(
        "http://localhost:4000/api/posts/",
        formData
      );

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
