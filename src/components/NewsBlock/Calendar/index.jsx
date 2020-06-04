import React from 'react';
import PropTypes from 'prop-types';
import CalendarEvent from './Event';

const Calendar = ({ baseTitleTag, events }) => {
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
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Calendar;
