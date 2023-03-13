import React, { useEffect, useState } from 'react'
import { getAllBookingByUser } from '../api/bookingApi';

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
    <div>MyBooking</div>
  )
}

export default MyBooking