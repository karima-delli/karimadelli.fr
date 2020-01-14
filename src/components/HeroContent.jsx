import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import Triangle from './Triangle';

const RATIO_MOBILE = 120 / 160;
const RATIO_DESKTOP = 308 / 720;

const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  &.has-image {
    padding-top: ${RATIO_MOBILE * 100 * 0.6}%;
    @media (min-width: 500px) {
      padding-top: ${RATIO_DESKTOP * 100 * 0.5}%;
    }
  }
`;

const ImageContainerStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: ${RATIO_MOBILE * 100}%;

  @media (min-width: 500px) {
    padding-bottom: ${RATIO_DESKTOP * 100}%;
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
    margin: auto;
    padding: 0 !important;
    width: 90%;

    @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
      width: 80%;
    }
  }
`;

const ContentStyled = styled.div`
  background: white;
  padding: 1.5rem;
`;

const TriangleStyled = styled(Triangle)`
  display: block;
  width: 100%;
`;

const TitleStyled = styled.h1`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  font-size: 2rem;
  line-height: 100%;
  text-align: center;
  margin-bottom: 1rem;
`;

const SubTitleStyled = styled.h2`
  color: #505050;
  text-align: center;
`;

const SeparatorStyled = styled.div`
  width: 3rem;
  height: 0.3rem;
  background: ${({ theme }) => theme.licorice};
  margin: auto;
  margin-top: 2rem;
  transform: rotate(-${({ theme }) => theme.angle}deg);
`;

const ReadingTimeStyled = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.brownGrey};
`;

const Hero = ({
  image,
  title,
  subTitle,
  displayShareButtons,
  displayReadingTime,
  readingTime,
  readingTimeStr,
}) => (
  <ContainerStyled className={`${image ? 'has-image' : ''}`}>
    {image && (
      <ImageContainerStyled>
        <GatsbyImage
          fluid={image.fluid}
          style={{ position: 'absolute' }}
          imgStyle={{ 'object-position': 'center top' }}
        />
      </ImageContainerStyled>
    )}

    <SectionStyled className={`section ${image ? 'has-image' : ''}`}>
      <div className="container">
        <TriangleStyled color="#ffffff" direction="right" reverse />
      </div>
      <ContentStyled className="container">
        <TitleStyled>{title}</TitleStyled>
        <SubTitleStyled>{subTitle}</SubTitleStyled>
        <SeparatorStyled />
        {displayReadingTime && readingTime && readingTimeStr && (
          <ReadingTimeStyled>
            {readingTime} {readingTimeStr}
          </ReadingTimeStyled>
        )}
        {displayShareButtons && <div>share tools</div>}
      </ContentStyled>
    </SectionStyled>
  </ContainerStyled>
);

Hero.propTypes = {
  image: PropTypes.shape({
    fluid: PropTypes.shape({}).isRequired,
  }),
  title: PropTypes.string.isRequired,
  displayShareButtons: PropTypes.bool,
  displayReadingTime: PropTypes.bool,
  readingTime: PropTypes.number,
  readingTimeStr: PropTypes.string,
  subTitle: PropTypes.string,
};

Hero.defaultProps = {
  image: null,
  displayShareButtons: true,
  displayReadingTime: true,
  readingTime: null,
  readingTimeStr: null,
  subTitle: null,
};

export default Hero;

export const query = graphql`
  fragment HeroContent on Query {
    heroContent: heroContentYaml(lang: { eq: $lang }) {
      readingTime
    }
  }
`;
