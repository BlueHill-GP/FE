
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
        } catch (error) {}
    };

    const cardClassName = `booking-card ${props.booking.bookingStatus}`;

    return (
        <div className="booking-container">
            <div className="content">
                <div className={cardClassName}>
                    <h3>{servicePackage?.title}</h3>
                    <img className={"image-booking"} src={servicePackage?.image[0]} alt="" />
                    <p>{servicePackage?.description}</p>
                    <p className="price">{servicePackage?.price}</p>
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
        </div>
    );
};

export default Booking;