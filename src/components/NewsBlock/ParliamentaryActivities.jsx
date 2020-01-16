import React from 'react';
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

const ParliamentaryActivities = ({ titleTag, activities }) => (
  <div>
    {activities.map(activity => (
      <ActivityContainerStyled url={activity.url} key={activity.url}>
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
    ))}
  </div>
);

ParliamentaryActivities.propTypes = {
  titleTag: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ParliamentaryActivities;
