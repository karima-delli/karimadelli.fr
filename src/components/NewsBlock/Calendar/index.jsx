import React from 'react';
import PropTypes from 'prop-types';
import CalendarEvent from './Event';

const Calendar = ({ events }) => {
  return (
    <div>
      {events.map(event => (
        <CalendarEvent key={event.id} {...event} />
      ))}
    </div>
  );
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Calendar;
