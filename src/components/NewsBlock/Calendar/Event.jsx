import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EventContainerStyled = styled.div`
  display: block;
  background: ${({ theme }) => theme.white};
  padding: 0.75rem;
  border-left: 10px solid ${({ theme }) => theme.fluorescentOrange};
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &.has-description {
    cursor: pointer;
  }
`;

const EventDateStyled = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
`;

const EventHourStyled = styled.span`
  font-size: 0.7rem;
`;

const EventLocationStyled = styled.div`
  font-weight: 300;
  font-style: italic;
`;

const EventSummaryStyled = styled.div`
  font-weight: bold;
  margin-top: 0.5rem;
`;

const EventDescriptionStyled = styled.div`
  margin-top: 0.5rem;
`;

const CalendarEvent = ({
  dateFormattedFr,
  hour,
  location,
  summary,
  description,
  ...rest
}) => {
  const [descriptionVisible, setDescriptionVisibility] = useState(false);

  return (
    <EventContainerStyled
      {...rest}
      className={`${description ? 'has-description' : ''}`}
      onClick={() => setDescriptionVisibility(!descriptionVisible)}
    >
      <EventDateStyled>
        {dateFormattedFr} - <EventHourStyled>{hour}</EventHourStyled>
      </EventDateStyled>
      {location && <EventLocationStyled>{location}</EventLocationStyled>}
      {summary && <EventSummaryStyled>{summary}</EventSummaryStyled>}
      {description && descriptionVisible && (
        <EventDescriptionStyled>{description}</EventDescriptionStyled>
      )}
    </EventContainerStyled>
  );
};

CalendarEvent.propTypes = {
  id: PropTypes.string.isRequired,
  dateFormattedFr: PropTypes.string.isRequired,
  dateFormattedEn: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CalendarEvent;
