// import React, { useEffect, useState } from "react";
// import { updateBookingStatus } from "../../api/bookingApi";
// import { getServicePackageById } from "../../api/servicePackage";
// import "../../assets/css/booking.css"
//
// const Booking = (props: any) => {
//   const [servicePackage, setServicePackage] = useState<any>();
//   useEffect(() => {
//     async function fetchData() {
//       const response = await getServicePackageById(props.booking.serviceId);
//       if (response.data.data) {
//         setServicePackage(response.data.data);
//       }
//     }
//     fetchData();
//   }, []);
//
//   const handleUpdateBookingStatus = async (status: string) => {
//     try {
//       const response = await updateBookingStatus(props.booking._id, status);
//       if (response.status === 200) {
//         console.log("update bookings status: " + response.status);
//
//       } else {
//         console.log("update bookings status: " + response.status);
//
//       }
//
//     } catch (error) {
//
//     }
//
//   }
//   return (
//     <div className={"booking-container"}>
//       <br />
//       <div className="">name: {props.booking.customerName}</div>
//       <div className="">bookingTime: {props.booking.bookingTime}</div>
//       <div className="">bookingAddress: {props.booking.bookingAddress}</div>
//       <hr />
//       {servicePackage && (
//         <>
//           <img src={servicePackage.image[0]} alt="" />
//           <p>{servicePackage.title}</p>
//           <p>{servicePackage.description}</p>
//           <p>{servicePackage.price}</p>
//         </>
//       )}
//       <br />
//
//       <div className="">
//         {props.booking.bookingStatus === "waiting" ? (
//           <>
//             <button onClick={() => handleUpdateBookingStatus("accepted")}>
//               accept
//             </button>
//             <button onClick={() => handleUpdateBookingStatus("rejected")}>
//               reject
//             </button>
//           </>
//         ) : (
//           <button>{props.booking.bookingStatus}</button>
//         )}
//       </div>
//       <br />
//     </div>
//   );
// };
//
// export default Booking;

import React, { useEffect, useState } from "react";
import { updateBookingStatus } from "../../api/bookingApi";
import { getServicePackageById } from "../../api/servicePackage";
import "../../assets/css/booking.css"

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

    const cardClassName = `booking-card ${props.booking.bookingStatus}`;

    return (
        <div className="booking-container">
            <div className={cardClassName}>
                <img className={"image-booking"} src={servicePackage?.image[0]} alt="" />
                <h3>{servicePackage?.title}</h3>
                <p>{servicePackage?.description}</p>
                <p>{servicePackage?.price}</p>
                <div className="btn-booking">
                    {props.booking.bookingStatus === "waiting" ? (
                        <>
                            <button className={"btn-accepted-booking"} onClick={() => handleUpdateBookingStatus("accepted")}>
                                accept
                            </button>
                            <button className={"btn-reject-booking"} onClick={() => handleUpdateBookingStatus("rejected")}>
                                reject
                            </button>
                        </>
                    ) : (
                        <button>{props.booking.bookingStatus}</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;
