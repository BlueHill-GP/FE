import React, { useEffect, useState } from 'react'
import { getAllBookingByUser } from '../api/bookingApi';
import Booking from './booking/Booking';
import "../assets/css/booking.css"

interface IProp {
  user: {
    userId: string;
    name: string;
    email: string;
    userType: string;
  };
}
const MyBooking = (props: IProp) => {
    const { user } = props;
     const [myBooking, setMyBooking] = useState([]);
     console.log(myBooking);
     useEffect(() => {
       async function fetchData() {
         const response = await getAllBookingByUser(user.userId);
         if (response.data.data) {
           setMyBooking(response.data.data);
         }
       }
       fetchData();

       return () => {
         setMyBooking([]);
       };
     }, []);

  return (
    <div className="booking">
      <div className={"title-booking"}>My Booking</div>
      <div className="list-booking">
          {myBooking &&
              myBooking.map((booking: any, index) => <Booking booking={booking} />)}
      </div>
    </div>
  );
}

export default MyBooking