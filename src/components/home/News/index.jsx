import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import Button from '../../Button';
import TextMarkdown from '../../TextMarkdown';
import SectionTitle from '../SectionTitle';
import ParliamentaryActivities from './ParliamentaryActivities';
import Calendar from './Calendar';

const SectionStyled = styled.section`
  background: ${({ theme }) => theme.grey};
`;

const TitleStyled = styled(SectionTitle)`
  margin-bottom: 1rem;
`;

const TextStyled = styled(TextMarkdown)`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;
`;

const BlockTitleStyled = styled.h3`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  color: ${({ theme }) => theme.fluorescentOrange};
  font-size: 1.5rem;
  text-align: center;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.white};
  margin-bottom: 1rem;
`;

const ReadMoreButtonContainerStyled = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const NewsSection = ({
  title,
  text,
  readMoreButtonTitle,
  parliamentTitle,
  parliamentaryActivities,
  parliamentaryActivitiesUrl,
  twitterTitle,
  calendarUrl,
  calendarTitle,
  calendarEvents,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <SectionStyled className="section">
      <div className="container">
        <TitleStyled>{title}</TitleStyled>
        <TextStyled>{text}</TextStyled>
        <div className="columns">
          <div className="column">
            <BlockTitleStyled>{parliamentTitle}</BlockTitleStyled>
            <ParliamentaryActivities
              title={parliamentTitle}
              readMoreButtonTitle={readMoreButtonTitle}
              activities={parliamentaryActivities}
              parliamentActivitiesUrl={parliamentaryActivitiesUrl}
            />
            <ReadMoreButtonContainerStyled>
              <Button
                title={readMoreButtonTitle}
                url={parliamentaryActivitiesUrl}
                color={theme.brownGrey}
                underlined
              />
            </ReadMoreButtonContainerStyled>
            <BlockTitleStyled>{calendarTitle}</BlockTitleStyled>
            <Calendar events={calendarEvents} />
            <ReadMoreButtonContainerStyled>
              <Button
                title={readMoreButtonTitle}
                url={calendarUrl}
                color={theme.brownGrey}
                underlined
              />
            </ReadMoreButtonContainerStyled>
          </div>
          <div className="column">
            <BlockTitleStyled>{twitterTitle}</BlockTitleStyled>
          </div>
        </div>
      </div>
    </SectionStyled>
  );
};

NewsSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  readMoreButtonTitle: PropTypes.string.isRequired,
  parliamentTitle: PropTypes.string.isRequired,
  parliamentaryActivities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  parliamentaryActivitiesUrl: PropTypes.string.isRequired,
  twitterTitle: PropTypes.string.isRequired,
  calendarUrl: PropTypes.string.isRequired,
  calendarTitle: PropTypes.string.isRequired,
  calendarEvents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default NewsSection;
