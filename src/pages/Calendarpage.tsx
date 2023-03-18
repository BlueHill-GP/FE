import React, { useState } from "react";
import "./EventForm.css";

function EventForm() {


  return (
    <form  className="event-form">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
 
        required
      />
      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
   
       
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
