import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Modal } from "antd";
import { groupByComma } from "../utils/numberUtils";
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

  // modal detail package

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="packages-container">
      <div className="modal-detail">
        <Modal
          title="Chi tiết gói"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="package-item-detail-modal">
            <div className="package_Img-detail-modal">
              <img src={props.servicePackage.image[0]} />
            </div>
            <div className="package-content-detail-modal">
              <h3 className="package-title-detail-modal">
                {props.servicePackage.title}
              </h3>
              <p className="package-price-detail-modal">
                {groupByComma(props.servicePackage.price)} vnd
              </p>
              <p className="package-desc-detail-modal">
                {props.servicePackage.description}
              </p>

              <p>Đánh giá: {props.servicePackage.star.length}</p>
              <p className="package-userName">
                Người đăng:
                <Link to={"/profile/" + props.servicePackage.user._id}>
                  {props.servicePackage.user.username || props.user.name}
                </Link>
              </p>
              <p className="time-create-package">
                {" "}
                {new Date(props.servicePackage.createAt).toLocaleString()}
              </p>
              <div className="package-option-detail-modal">
                {props.user ? (
                  props.user && props.user.userType === "couple" ? (
                    <button
                      className="booking-btn-detail-modal"
                      onClick={() => handleBooking(props.servicePackage._id)}
                    >
                      Đặt ngay
                    </button>
                  ) : (
                    <button className="photographer-option">
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                  )
                ) : (
                  <button
                    className="booking-btn-detail-modal"
                    onClick={() => handleBooking(props.servicePackage._id)}
                  >
                    Đặt ngay
                  </button>
                )}
                {}
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <div className="package_Item">
        <div className="package_Img">
          {/* {props.servicePackage.image.map((imageUrl: string, index: number) => ( */}
          <img
            // key={index}
            src={props.servicePackage.image[0]}
            // alt={`Post image ${index}`}
          />
          {/* ))} */}
        </div>
        <div className="package_Content">
          <p className="package-title" onClick={showModal}>
            {props.servicePackage.title}
          </p>
          <p className="package-price" onClick={showModal}>
            {groupByComma(props.servicePackage.price)} vnd
          </p>
          <p className="package-desc" onClick={showModal}>
            {props.servicePackage.description}
          </p>

          <p onClick={showModal}>
            Đánh giá: {props.servicePackage.star.length}
          </p>
          <p onClick={showModal} className="package-userName">
            Người đăng: {props.servicePackage.user.username || props.user.name}
          </p>
          <p className="time-create-package">
            {" "}
            {new Date(props.servicePackage.createAt).toLocaleString()}
          </p>
          <div className="package-option">
            {props.user ? (
              props.user && props.user.userType === "couple" ? (
                <button
                  className="booking-btn"
                  onClick={() => handleBooking(props.servicePackage._id)}
                >
                  Đặt ngay
                </button>
              ) : (
                <button className="photographer-option">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              )
            ) : (
              <button
                className="booking-btn"
                onClick={() => handleBooking(props.servicePackage._id)}
              >
                Đặt ngay
              </button>
            )}
            {}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePackage;
