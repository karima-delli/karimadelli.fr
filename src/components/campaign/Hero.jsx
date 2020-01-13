import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';
import Triangle from '../Triangle';

const HeroStyled = styled.div`
  position: relative;
`;

const ImageContainerStyled = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: ${(120 / 160) * 100}%;

  @media (min-width: 500px) {
    padding-bottom: ${(308 / 720) * 100}%;
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
  position: relative;
  margin-top: -20vh;
  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    margin-top: -30vh;
  }
  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    margin-top: -40vh;
  }
`;

const ContainerStyled = styled.div`
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

const Hero = ({ image, title, subTitle, readingTime, readingTimeStr }) => (
  <HeroStyled>
    <ImageContainerStyled>
      <GatsbyImage fluid={image.fluid} style={{ position: 'absolute' }} />
    </ImageContainerStyled>
    <SectionStyled className="section">
      <div className="container">
        <TriangleStyled color="#ffffff" direction="right" reverse />
      </div>
      <ContainerStyled className="container">
        <TitleStyled>{title}</TitleStyled>
        <SubTitleStyled>{subTitle}</SubTitleStyled>
        <SeparatorStyled />
        <ReadingTimeStyled>
          {readingTime} {readingTimeStr}
        </ReadingTimeStyled>
        <div>share tools</div>
      </ContainerStyled>
    </SectionStyled>
  </HeroStyled>
);

Hero.propTypes = {
  image: PropTypes.shape({
    fluid: PropTypes.shape({}).isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
  readingTimeStr: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default Hero;
