import React, { useEffect, useState } from "react";
import { updateBookingStatus } from "../../api/bookingApi";
import { getServicePackageById } from "../../api/servicePackage";

const Booking = (props: any) => {
  const [servicePackage, setServicePackage] = useState<any>();
  useEffect(() => {
    async function fetchData() {
      const response = await getServicePackageById(props.booking.serviceId);
      if (response.data.data) {
        setServicePackage(response.data.data);
      }
    }
    fetchData();
  }, []);

  const handleUpdateBookingStatus = async (status: string) => { 
    try {
      const response = await updateBookingStatus(props.booking._id, status);
      if (response.status === 200) {
        console.log("update bookings status: " + response.status);
        
      } else {
        console.log("update bookings status: " + response.status);
        
      }
      
    } catch (error) {
      
    }
    
  }
  return (
    <div>
      <br />
      <div className="">name: {props.booking.customerName}</div>
      <div className="">bookingTime: {props.booking.bookingTime}</div>
      <div className="">bookingAddress: {props.booking.bookingAddress}</div>
      <hr />
      {servicePackage && (
        <>
          <img src={servicePackage.image[0]} alt="" />
          <p>{servicePackage.title}</p>
          <p>{servicePackage.description}</p>
          <p>{servicePackage.price}</p>
        </>
      )}
      <br />

      <div className="">
        {props.booking.bookingStatus === "waiting" ? (
          <>
            <button onClick={() => handleUpdateBookingStatus("accepted")}>
              accept
            </button>
            <button onClick={() => handleUpdateBookingStatus("rejected")}>
              reject
            </button>
          </>
        ) : (
          <button>{props.booking.bookingStatus}</button>
        )}
      </div>
      <br />
    </div>
  );
};

export default Booking;
