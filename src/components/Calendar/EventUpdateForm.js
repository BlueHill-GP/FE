import React, { useState } from "react";

function EventUpdateForm(props) {
  const [title, setTitle] = useState(props.event.title);
  const [date, setDate] = useState(props.event.date);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdateEvent({ id: props.event.id, title, date });
    props.onCancelUpdate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Event</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>
      <button type="submit">Update</button>
      <button onClick={props.onCancelUpdate}>Cancel</button>
    </form>
  );
}

export default EventUpdateForm;
