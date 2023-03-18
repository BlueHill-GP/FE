import React from "react";
import "./EventList.css"

function EventList(props) {
  const handleDeleteClick = (event, index) => {
    event.preventDefault();
    props.onDeleteEvent(props.events[index]);
  };

  const handleUpdate = (eventToUpdate) => {
    props.onUpdateEvent(eventToUpdate);
  };

  return (
    <ul className="event-list">
      {props.events.map((event, index) => (
        <li key={event.id}>
          <div className="event-item">
            <div className="event-details">
              <div className="event-title">{event.title}</div>
              <div className="event-date">{event.date}</div>
            </div>
            <button onClick={() => handleUpdate(event)}>Update</button>
            <button
              className="delete-button"
              onClick={(event) => handleDeleteClick(event, index)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default EventList;
