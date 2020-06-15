import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import ExternalLinkIcon from '../Icons/ExternalLink';
import Link from '../Link';

const ActivityHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActivityDateStyled = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
`;

const ActivityLinkStyled = styled.div`
  svg {
    color: ${({ theme }) => theme.veryLightPink};
  }
  a:hover svg {
    color: ${({ theme }) => darken(0.5, theme.veryLightPink)};
  }
`;

const ActivityTitleStyled = styled.h4`
  font-weight: bold;
  margin: 0.5rem 0;
`;

const ActivityTextStyled = styled.p`
  font-weight: 300;
`;

const ActivityContainerStyled = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.white};
  padding: 0.75rem;
  color: ${({ theme }) => theme.licorice};
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &:hover {
    svg {
      color: ${({ theme }) => darken(0.5, theme.veryLightPink)};
    }

    ${ActivityTitleStyled} {
      text-decoration: underline;
    }
  }
`;

const FUNCTION_ENDPOINT = '/.netlify/functions/parliamentary-activities';

const ParliamentaryActivities = ({ titleTag }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(FUNCTION_ENDPOINT);
      if (!response.ok) {
        return;
      }
      const text = await response.text();
      try {
        const data = text ? JSON.parse(text) : {};
        setActivities(data.activities);
      } catch (err) {
        //
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {activities.map((activity) => {
        const url =
          activity.url || activity.docUrls.pdf || activity.docUrls.doc;

        return (
          <ActivityContainerStyled url={url} key={url}>
            <ActivityHeaderStyled>
              <ActivityDateStyled>{activity.date}</ActivityDateStyled>
              <ActivityLinkStyled>
                <ExternalLinkIcon />
              </ActivityLinkStyled>
            </ActivityHeaderStyled>
            <ActivityTitleStyled as={titleTag}>
              {activity.title}
            </ActivityTitleStyled>
            <ActivityTextStyled>{activity.category}</ActivityTextStyled>
          </ActivityContainerStyled>
        );
      })}
    </div>
  );
};

ParliamentaryActivities.propTypes = {
  titleTag: PropTypes.string.isRequired,
};

export default ParliamentaryActivities;
