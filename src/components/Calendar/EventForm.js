import React, { useState } from "react";
import "./EventForm.css"

function EventForm(props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventObject = {
      id: Date.now(),
      title,
      date,
    };
    props.onAddEvent(eventObject);
    setTitle("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={handleDateChange}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
