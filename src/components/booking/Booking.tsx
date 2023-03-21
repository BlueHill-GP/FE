import React, { useEffect, useState } from "react";
import { updateBookingStatus } from "../../api/bookingApi";
import { getServicePackageById } from "../../api/servicePackage";
import {
  Card,
  Col,
  Row,
  Image,
  Space,
  Button,
  MenuProps,
  Dropdown,
  message,
} from "antd";

import "../../assets/css/booking.css";
import { getTime } from "../../utils/gettime";

const Booking = (props: any) => {
  const { bookings } = props;
  const [openBooking, setOpenBooking] = useState(true)

  const [visible, setVisible] = useState(false);
  const [servicePackage, setServicePackage] = useState<any>();
  const [loadings, setLoadings] = useState<boolean[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getServicePackageById(props.booking.serviceId);
      if (response.data.data) {
        setServicePackage(response.data.data);
      }
    }
    fetchData();

   
  }, [props]);

  const handleUpdateBookingStatus = async (status: string) => {
    try {
      const response = await updateBookingStatus(props.booking._id, status);
      if (response.status === 200) {
        setOpenBooking(false)
        console.log("update bookings status: " + response.status);
      } else {
        console.log("update bookings status: " + response.status);
      }
    } catch (error) {}
  };

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const items: MenuProps["items"] = [
    {
      label: "accept",
      key: "1",
    },
    {
      label: "reject",
      key: "2",
    },
  ];
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") {
      handleUpdateBookingStatus("accepted");
    } else {
      handleUpdateBookingStatus("rejected");
    }
  };
  return (
    <div className="container-slider">
      {openBooking && (
        <Card hoverable className="slider mg-b-10">
          <Row gutter={16} className="space-align-container">
            <Col span={9} className="row align-items-center">
              <div className="row align-items-center">
                <Col>
                  <p style={{ fontWeight: 600 }}>
                    {props.booking.customerName}
                  </p>
                  <p>{props.booking.bookingAddress}</p>
                  <p>{getTime(props.booking.bookingTime)}</p>
                  <p>{props.booking.notes}</p>
                </Col>
              </div>
            </Col>
            <Col span={10} className="row ">
              <div className="row justify-left">
                <>
                  <Image
                    className="img-card"
                    preview={{ visible: false }}
                    width={70}
                    height={110}
                    src={servicePackage?.image[0]}
                    onClick={() => setVisible(true)}
                  />
                  <div style={{ display: "none" }}>
                    <Image.PreviewGroup
                      preview={{
                        visible,
                        onVisibleChange: (vis) => setVisible(vis),
                      }}
                    >
                      <Image src={servicePackage?.image[0]} />
                    </Image.PreviewGroup>
                  </div>
                </>
                <Col>
                  <h3>{servicePackage?.title}</h3>
                  <p>{servicePackage?.description}</p>
                  <p className="price">{servicePackage?.price}</p>
                </Col>
              </div>
            </Col>
            <Col span={4} className="row justify-right">
              <div>
                {props.booking.bookingStatus === "waiting" ? (
                  <Dropdown menu={{ items, onClick }}>
                    <Button onClick={(e) => e.preventDefault()}>waiting</Button>
                  </Dropdown>
                ) : (
                  <Button
                    className={
                      props.booking.bookingStatus === "accepted"
                        ? "btn-accept"
                        : "btn-reject"
                    }
                  >
                    {props.booking.bookingStatus}
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default Booking;
