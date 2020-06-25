import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import TextMarkdown from '../TextMarkdown';
import Link from '../Link';

const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  margin-top: -4.7rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
  min-height: 500px;
  max-height: 800px;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    min-height: 600px;
  }
`;

const ImageContainerStyled = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;

  .container {
    height: 100%;
  }

  .gatsby-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ContentContainerStyled = styled.div`
  width: 100%;
  > .container {
    padding: 2rem;
    text-align: center;
    font-family: ${({ theme }) => theme.fontFamiliesAlternate};
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.officeGreen};
  }
`;

const TextStyled = styled(TextMarkdown)`
  font-size: 1.1rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.3rem;
  }
`;

const LogoLinkStyled = styled(Link)`
  &:hover {
    transition: opacity 230ms ease;
    opacity: 0.9;
  }
`;

const LogoStyled = styled.img`
  width: 75px;
`;

const LogosContainerStyled = styled.div`
  position: absolute;
  top: 4.7rem;
  width: 100%;

  > .container {
    padding: 1rem;
  }

  ${LogoLinkStyled} {
    display: block;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
      display: inline-block;
      margin-bottom: 0;

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    text-align: right;
  }
`;

const HomeHero = ({ image, text, logos }) => {
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
        <div className="container is-flex">
          <GatsbyImage
            fluid={sources}
            imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
      </ImageContainerStyled>

      <ContentContainerStyled>
        <div className="container">
          <TextStyled>{text}</TextStyled>
        </div>
      </ContentContainerStyled>

      <LogosContainerStyled>
        <div className="container">
          {logos.map(({ url, image: logoImage, title }) => (
            <LogoLinkStyled key={url} url={url}>
              <LogoStyled src={logoImage} alt={title} />
            </LogoLinkStyled>
          ))}
        </div>
      </LogosContainerStyled>
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
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HomeHero;
