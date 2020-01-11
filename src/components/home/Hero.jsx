import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import styled, { ThemeContext } from 'styled-components';
import Button from '../Button';

const ContainerStyled = styled.div`
  position: relative;
  margin-top: -3.25rem;
  height: 100vh;
`;

const ImageContainerStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  > .gatsby-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ContentContainerStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  background-color: ${({ theme }) => theme.officeGreen};
  color: ${({ theme }) => theme.white};
  text-align: center;
`;

const HomeHero = ({ image, text, button }) => {
  const theme = useContext(ThemeContext);

  return (
    <ContainerStyled>
      <ImageContainerStyled>
        <GatsbyImage fluid={image.fluid} objectFit="cover" />
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
    fluid: PropTypes.shape({}).isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.shape({}).isRequired,
};

export default HomeHero;
