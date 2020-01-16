import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { graphql } from 'gatsby';
import Button from '../Button';
import TextMarkdown from '../TextMarkdown';
import TwitterTimelineWidget from '../TwitterTimelineWidget';
import Title from '../Title';
import ParliamentaryActivities from './ParliamentaryActivities';
import Calendar from './Calendar';

const SectionStyled = styled.section`
  background: ${({ theme }) => theme.grey};
`;

const TitleWrapperStyled = styled.div`
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

const TwitterColumnStyled = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    display: flex !important;
    flex-direction: column;
  }
`;

const TwitterWidgetContainer = styled.div`
  height: 80vh;
  min-height: 500px;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    flex-grow: 1;
  }
`;

const NewsBlock = ({
  baseTitleTag,
  title,
  text,
  readMoreButtonTitle,
  parliamentTitle,
  parliamentaryActivities,
  parliamentaryActivitiesUrl,
  twitterTitle,
  calendarEnabled,
  calendarUrl,
  calendarTitle,
  calendarEvents,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <SectionStyled className="section">
      <div className="container">
        <TitleWrapperStyled>
          <Title section as={`h${baseTitleTag}`}>
            {title}
          </Title>
        </TitleWrapperStyled>
        <TextStyled>{text}</TextStyled>
        <div className="columns">
          <div className="column">
            <BlockTitleStyled as={`h${baseTitleTag + 1}`}>
              {parliamentTitle}
            </BlockTitleStyled>
            <ParliamentaryActivities
              title={parliamentTitle}
              readMoreButtonTitle={readMoreButtonTitle}
              activities={parliamentaryActivities}
              titleTag={`h${baseTitleTag + 2}`}
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
            {calendarEnabled && (
              <>
                <BlockTitleStyled as={`h${baseTitleTag + 1}`}>
                  {calendarTitle}
                </BlockTitleStyled>
                <Calendar
                  events={calendarEvents}
                  baseTitleTag={baseTitleTag + 2}
                />
                <ReadMoreButtonContainerStyled>
                  <Button
                    title={readMoreButtonTitle}
                    url={calendarUrl}
                    color={theme.brownGrey}
                    underlined
                  />
                </ReadMoreButtonContainerStyled>
              </>
            )}
          </div>
          <TwitterColumnStyled className="column">
            <BlockTitleStyled as={`h${baseTitleTag + 1}`}>
              {twitterTitle}
            </BlockTitleStyled>
            <TwitterWidgetContainer>
              <TwitterTimelineWidget />
            </TwitterWidgetContainer>
          </TwitterColumnStyled>
        </div>
      </div>
    </SectionStyled>
  );
};

NewsBlock.propTypes = {
  baseTitleTag: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  readMoreButtonTitle: PropTypes.string.isRequired,
  parliamentTitle: PropTypes.string.isRequired,
  parliamentaryActivities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  parliamentaryActivitiesUrl: PropTypes.string.isRequired,
  twitterTitle: PropTypes.string.isRequired,
  calendarEnabled: PropTypes.bool.isRequired,
  calendarUrl: PropTypes.string.isRequired,
  calendarTitle: PropTypes.string.isRequired,
  calendarEvents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default NewsBlock;

export const query = graphql`
  fragment NewsBlock on Query {
    newsBlock: newsBlockYaml(lang: { eq: $lang }) {
      title
      text
      readMoreButtonTitle
      parliamentTitle
      calendarTitle
      twitterTitle
    }
    parliamentaryActivities(lang: { eq: $lang }) {
      url
      activities {
        category
        date
        title
        url
      }
    }
    events: allIcal(
      limit: 3
      sort: { fields: start, order: ASC }
      filter: { isFuture: { eq: true }, summary: { ne: "" } }
    ) {
      nodes {
        id
        dateFormattedFr: start(formatString: "DD/MM/YYYY")
        dateFormattedEn: start(formatString: "MM/DD/YYYY")
        hour: start(formatString: "HH:mm")
        summary
        location
        description
      }
    }
  }
`;
