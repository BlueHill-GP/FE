import React, { useState } from "react";
import EventUpdateForm from "./EventUpdateForm";
import EventForm from "./EventForm";
import EventList from "./EventList";

import "./SetCalendar.css"

function Calendar() {
  const [events, setEvents] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter((event) => event !== eventToDelete));
  };

  const handleUpdateEvent = (eventToUpdate) => {
    setEvents(
      events.map((event) =>
        event.id === eventToUpdate.id ? eventToUpdate : event
      )
    );
  };

  const handleShowUpdateForm = (eventToUpdate) => {
    setEventToUpdate(eventToUpdate);
    setShowUpdateForm(true);
  };

  const handleCancelUpdate = () => {
    setEventToUpdate(null);
    setShowUpdateForm(false);
  };

  return (
    <div className="calendar">
      {showUpdateForm ? (
        <EventUpdateForm
          event={eventToUpdate}
          onUpdateEvent={handleUpdateEvent}
          onCancelUpdate={handleCancelUpdate}
        />
      ) : (
        <EventForm onAddEvent={handleAddEvent} />
      )}
      <EventList
        events={events}
        onDeleteEvent={handleDeleteEvent}
        onUpdateEvent={handleShowUpdateForm}
      />
    </div>
  );
}

export default Calendar;
