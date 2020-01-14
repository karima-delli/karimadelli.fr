import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import styled, { ThemeContext } from 'styled-components';
import Button from '../Button';

const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  margin-top: -3.25rem;
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

const HomeHero = ({ image, text, button }) => {
  const theme = useContext(ThemeContext);

  const sources = [
    image.mobile.childImageSharp.fluid,
    {
      ...image.tablet.childImageSharp.fluid,
      media: `(min-width: 768px)`,
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
          imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </ImageContainerStyled>

      <ContentContainerStyled>
        <div className="container">
          <Button
            {...button}
            color={theme.officeGreen}
            background={theme.white}
          />
          <p>{text}</p>
        </div>
      </ContentContainerStyled>
    </ContainerStyled>
  );
};

HomeHero.propTypes = {
  image: PropTypes.shape({
    mobile: PropTypes.shape({}).isRequired,
    tablet: PropTypes.shape({}).isRequired,
    desktop: PropTypes.shape({}).isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.shape({}).isRequired,
};

export default HomeHero;
