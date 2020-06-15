import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CalendarEvent from './Event';

const FUNCTION_ENDPOINT = '/.netlify/functions/calendar-events';

const Calendar = ({ baseTitleTag }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(FUNCTION_ENDPOINT);
      if (!response.ok) {
        return;
      }
      const text = await response.text();
      try {
        const data = text ? JSON.parse(text) : {};
        setEvents(data.events);
      } catch (err) {
        //
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {events.map((event) => (
        <CalendarEvent
          key={event.id}
          {...event}
          titleTag={`h${baseTitleTag}`}
        />
      ))}
    </div>
  );
};

Calendar.propTypes = {
  baseTitleTag: PropTypes.number.isRequired,
};

export default Calendar;
