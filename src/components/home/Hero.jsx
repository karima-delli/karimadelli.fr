import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import styled, { ThemeContext } from 'styled-components';
import Button from '../Button';
import TextMarkdown from '../TextMarkdown';

const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  margin-top: -4.7rem;
  height: 100vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ImageContainerStyled = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;

  > .gatsby-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ContentContainerStyled = styled.div`
  width: 100%;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  background-color: ${({ theme }) => theme.officeGreen};
  color: ${({ theme }) => theme.white};
  text-align: center;
`;

const TextStyled = styled(TextMarkdown)`
  font-size: 1.1rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.3rem;
  }
`;

const HomeHero = ({ image, text, button }) => {
  const theme = useContext(ThemeContext);

  const sources = [
    image.mobile.childImageSharp.fluid,
    {
      ...image.tablet.childImageSharp.fluid,
      media: `(min-width: 768px) and (max-width: 1023px)`,
    },
    {
      ...image.desktop.childImageSharp.fluid,
      media: `(min-width: 1024px)`,
    },
  ];

  return (
    <ContainerStyled>
      <ImageContainerStyled>
        <GatsbyImage
          fluid={sources}
          imgStyle={{ objectFit: 'contain', objectPosition: 'center bottom' }}
        />
      </ImageContainerStyled>

      <ContentContainerStyled>
        <div className="container">
          <Button
            {...button}
            color={theme.officeGreen}
            background={theme.white}
          />
          <TextStyled>{text}</TextStyled>
        </div>
      </ContentContainerStyled>
    </ContainerStyled>
  );
};

HomeHero.propTypes = {
  image: PropTypes.shape({
    mobile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
    tablet: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
    desktop: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.shape({}).isRequired,
};

export default HomeHero;
