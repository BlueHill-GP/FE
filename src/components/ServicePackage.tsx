import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ServicePackageProps {
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
  const navigate = useNavigate();

  const handleBooking = (id: string) => {
    navigate("/booking/" + id);
  };
  // console.log(props.user);

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
    <div className="packages-container">
      <div className="">
        {props.user && props.user.userType === "couple" ? (
          <button onClick={() => handleBooking(props.servicePackage._id)}>
            Booking now
          </button>
        ) : (
          <button>...</button>
        )}
      </div>
      <div className="package_Item">
        <div className="package_Img">
          {props.servicePackage.image.map((imageUrl: string, index: number) => (
            <img key={index} src={imageUrl} alt={`Post image ${index}`} />
          ))}
        </div>
        <div className="package_Content">
          <p className="package-title">{props.servicePackage.title}</p>
          <p className="package-price">{props.servicePackage.price} vnd</p>
          <p className="package-desc">{props.servicePackage.description}</p>

          <p>Star: {props.servicePackage.star.length}</p>
          {/* <p className="package-userName">User: {props.servicePackage.user.username || props.user.name}</p> */}
          <p className="time-create-package">
            {" "}
            {new Date(props.servicePackage.createAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicePackage;
