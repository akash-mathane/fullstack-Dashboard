// Calendar.js
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]); // Store your events here

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([...events, { start, end, title, completed: false }]);
    }
  };

  const handleEventDelete = (eventToDelete) => {
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
  };

  const handleEventToggleCompleted = (eventToToggle) => {
    const updatedEvents = events.map((event) =>
      event === eventToToggle ? { ...event, completed: !event.completed } : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelect}
        selectable
        style={{ height: 500 }}
        eventPropGetter={(event) => {
          const eventStyle = {
            backgroundColor: event.completed ? 'green' : 'blue', // Customize completed events' appearance
          };
          return { style: eventStyle };
        }}
        onSelectEvent={(event) => {
          // Show options to delete or mark as completed
          if (window.confirm('Do you want to delete or mark this event as completed?')) {
            const action = window.prompt(
              'Type "delete" to delete this event or "complete" to mark it as completed.'
            );

            if (action === 'delete') {
              handleEventDelete(event);
            } else if (action === 'complete') {
              handleEventToggleCompleted(event);
            }
          }
        }}
      />
    </div>
  );
};

export default MyCalendar;
