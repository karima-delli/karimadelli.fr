import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import ShareButtons from './ShareButtons';
import Triangle from './Triangle';
import Hr from './Hr';

const RATIO_MOBILE = 120 / 160;
const RATIO_DESKTOP = 308 / 720;
const RATIO_WIDE = 208 / 720;

const CONTENT_OFFSET_MOBILE = 7;
const CONTENT_OFFSET_TABLET = 6;
const CONTENT_OFFSET_DESKTOP = 10;
const CONTENT_OFFSET_WIDESCREEN = 10;

const ContainerStyled = styled.div`
  width: 100%;
  &.has-image {
    margin-bottom: -${CONTENT_OFFSET_MOBILE}rem;

    @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
      margin-bottom: -${CONTENT_OFFSET_TABLET}rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
      margin-bottom: -${CONTENT_OFFSET_DESKTOP}rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpointWidescreen}) {
      margin-bottom: -${CONTENT_OFFSET_WIDESCREEN}rem;
    }
  }
`;

const ImageContainerStyled = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: ${RATIO_MOBILE * 100}%;

  @media (min-width: 500px) {
    padding-bottom: ${RATIO_DESKTOP * 100}%;
  }

  @media (min-width: 1300px) {
    padding-bottom: ${RATIO_WIDE * 100}%;
  }

  .gatsby-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const SectionStyled = styled.section`
  &.has-image {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    position: relative;
    top: -${CONTENT_OFFSET_MOBILE}rem;

    @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
      top: -${CONTENT_OFFSET_TABLET}rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
      top: -${CONTENT_OFFSET_DESKTOP}rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpointWidescreen}) {
      top: -${CONTENT_OFFSET_WIDESCREEN}rem;
    }
  }
`;

const ContentStyled = styled.div`
  background: white;
  padding: 1.5rem;
  text-align: center;
`;

const TriangleContainerStyled = styled.div`
  position: relative;
  top: 0.5px;
`;

const TriangleStyled = styled(Triangle)`
  display: block;
  width: 100%;
`;

const DateStyled = styled.div`
  color: ${({ theme }) => theme.brownGrey};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const TitleStyled = styled.h1`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  font-size: 2rem;
  line-height: 100%;
  margin-bottom: 1rem;
`;

const SubTitleStyled = styled.h2`
  color: #505050;
`;

const HrStyled = styled(Hr)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ReadingTimeStyled = styled.div`
  color: ${({ theme }) => theme.brownGrey};
`;

const Hero = ({
  image,
  url,
  date,
  title,
  subTitle,
  displayShareButtons,
  displayReadingTime,
  readingTime,
  readingTimeStr,
  ...rest
}) => (
  <ContainerStyled className={`${image ? 'has-image' : ''}`} {...rest}>
    {image && (
      <ImageContainerStyled>
        <GatsbyImage
          fluid={image.fluid}
          style={{ position: 'absolute' }}
          imgStyle={{ objectPosition: 'center top' }}
        />
      </ImageContainerStyled>
    )}

    <SectionStyled className={`section ${image ? 'has-image' : ''}`}>
      {image && (
        <TriangleContainerStyled className="container">
          <TriangleStyled color="#ffffff" direction="right" reverse />
        </TriangleContainerStyled>
      )}
      <ContentStyled className="container">
        {date && <DateStyled>{date}</DateStyled>}
        <TitleStyled>{title}</TitleStyled>
        {subTitle && <SubTitleStyled>{subTitle}</SubTitleStyled>}

        {((displayReadingTime && readingTime && readingTimeStr) ||
          displayShareButtons) && <HrStyled className="is-small" />}

        {displayReadingTime && readingTime && readingTimeStr && (
          <ReadingTimeStyled>
            {readingTime}{' '}
            {readingTime > 1 ? readingTimeStr.plural : readingTimeStr.singular}
          </ReadingTimeStyled>
        )}
        {displayShareButtons && url && <ShareButtons url={url} />}
      </ContentStyled>
    </SectionStyled>
  </ContainerStyled>
);

Hero.propTypes = {
  image: PropTypes.shape({
    fluid: PropTypes.shape({}).isRequired,
  }),
  url: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  displayShareButtons: PropTypes.bool,
  displayReadingTime: PropTypes.bool,
  readingTime: PropTypes.number,
  readingTimeStr: PropTypes.shape({
    plural: PropTypes.string.isRequired,
    singular: PropTypes.string.isRequired,
  }),
};

Hero.defaultProps = {
  image: null,
  url: null,
  date: null,
  subTitle: null,
  displayReadingTime: true,
  readingTime: null,
  readingTimeStr: null,
  displayShareButtons: true,
};

export default Hero;

export const query = graphql`
  fragment HeroContent on Query {
    heroContent: heroContentYaml(lang: { eq: $lang }) {
      readingTime {
        plural
        singular
      }
    }
  }
`;
