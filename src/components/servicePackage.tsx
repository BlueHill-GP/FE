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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YwNDUyZGE0Y2FjZjEwMWUzMDVmNTQiLCJpYXQiOjE2NzY5NTQyMTYsImV4cCI6MTY3Njk2MTQxNn0.SF1hztHbJnWnx3QiuGDCRomm5Qi35rIk_os-WLtI60A";

const servicePackage = ({ post }: any) => {
  const handleSubmitDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`http://13.211.252.242/api/service-packages/${post?._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          // props.onDelete(postId);
        } else {
          throw new Error("Failed to delete post");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(post);

  if (!post || !post.image) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmitDelete}>
        <label>Enter the ID of the post you want to delete:</label>
        <button type="submit">Delete Post</button>
      </form>
      <p>{post.title}</p>
      <p>{post.price}</p>
      <p>{post.description}</p>
      {post.image.map((imageUrl: string, index: number) => (
        <img key={index} src={imageUrl} alt={`Post image ${index}`} />
      ))}
      <p>Star: {post.star.length}</p>
      <p>User: {post.user}</p>
      <p>Posted at: {new Date(post.createAt).toLocaleString()}</p>
    </div>
  );
};

export default servicePackage;
