import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { graphql } from 'gatsby';
import Button from '../Button';
import TextMarkdown from '../TextMarkdown';
import TwitterTimelineWidget from '../TwitterTimelineWidget';
import useAdblockDetect from '../useAdblockDetect';
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

const TwitterTimelineWidgetStyled = styled(TwitterTimelineWidget)`
  &:not(.has-adblock-detected) {
    height: 80vh;
    min-height: 500px;
    overflow: hidden;
  }

  &.has-adblock-detected {
    min-height: 200px;
  }

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    flex-grow: 1;
    display: flex;
  }
`;

const NewsBlock = ({
  baseTitleTag,
  title,
  text,
  readMoreButtonTitle,
  parliamentTitle,
  europarlPageUrl,
  twitterTitle,
  calendarEnabled,
  calendarTitle,
  adblockMessage,
}) => {
  const theme = useTheme();
  const adblockDetected = useAdblockDetect();

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
              titleTag={`h${baseTitleTag + 2}`}
            />
            <ReadMoreButtonContainerStyled>
              <Button
                title={readMoreButtonTitle}
                url={europarlPageUrl}
                color={theme.brownGrey}
                underlined
              />
            </ReadMoreButtonContainerStyled>
            {calendarEnabled && (
              <>
                <BlockTitleStyled as={`h${baseTitleTag + 1}`}>
                  {calendarTitle}
                </BlockTitleStyled>
                <Calendar baseTitleTag={baseTitleTag + 2} />
              </>
            )}
          </div>
          <TwitterColumnStyled className="column">
            <BlockTitleStyled as={`h${baseTitleTag + 1}`}>
              {twitterTitle}
            </BlockTitleStyled>
            <TwitterTimelineWidgetStyled
              adblockMessage={adblockMessage}
              adblockDetected={adblockDetected}
              className={`${adblockDetected ? 'has-adblock-detected' : ''}`}
            />
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
  europarlPageUrl: PropTypes.string.isRequired,
  twitterTitle: PropTypes.string.isRequired,
  calendarEnabled: PropTypes.bool.isRequired,
  calendarTitle: PropTypes.string.isRequired,
  adblockMessage: PropTypes.string.isRequired,
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
      adblockMessage
    }
    site {
      siteMetadata {
        europarlPageUrl
      }
    }
  }
`;
