import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { parseISO, format } from 'date-fns';

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
  titleTag,
  startDate,
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
        {format(parseISO(startDate), 'dd/MM/yyyy')} -{' '}
        <EventHourStyled>
          {format(parseISO(startDate), 'HH:mm')}
        </EventHourStyled>
      </EventDateStyled>
      {location && <EventLocationStyled>{location}</EventLocationStyled>}
      {summary && (
        <EventSummaryStyled as={titleTag}>{summary}</EventSummaryStyled>
      )}
      {description && descriptionVisible && (
        <EventDescriptionStyled dangerouslySetInnerHTML={{__html: description}} />
      )}
    </EventContainerStyled>
  );
};

CalendarEvent.propTypes = {
  titleTag: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CalendarEvent;
