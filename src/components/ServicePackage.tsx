import React, { useState } from "react";

interface servicePackageProps {
  post: {
    _id: string;
    title: string;
    price: number;
    description: string;
    image: string[];
    star: string[];
    user: string;
    createAt: string;
  } | null;
}

const ServicePackage = (props: any) => {
  console.log(props);
  
  // const handleSubmitDelete = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   fetch(`http://13.211.252.242/api/service-packages/${servicePackage?._id}`, {
  //     method: "DELETE",
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         // props.onDelete(postId);
  //       } else {
  //         throw new Error("Failed to delete post");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <div>
      {/* <form onSubmit={handleSubmitDelete}> */}
      <label>Enter the ID of the post you want to delete:</label>
      <button type="submit">Delete Post</button>
      {/* </form> */}
      <p>{props.servicePackage.title}</p>
      <p>{props.servicePackage.price}</p>
      <p>{props.servicePackage.description}</p>
      {props.servicePackage.image.map((imageUrl: string, index: number) => (
        <img key={index} src={imageUrl} alt={`Post image ${index}`} />
      ))}
      <p>Star: {props.servicePackage.star.length}</p>
      <p>User: {props.servicePackage.user.username || props.user.name}</p>
      <p>
        Posted at: {new Date(props.servicePackage.createAt).toLocaleString()}
      </p>
    </div>
  );
};

export default ServicePackage;
