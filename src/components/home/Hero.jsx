import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import TextMarkdown from '../TextMarkdown';
import Link from '../Link';
import Logo from '../Logo';

const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  margin-top: -4.7rem;
  height: 100vh;
  min-height: 500px;
  max-height: 800px;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    min-height: 600px;
  }
`;

const ImageContainerStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .gatsby-image-wrapper {
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

  @media (min-width: 600px) {
    bottom: auto;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
  }
`;

const ContentWrapperStyled = styled.div`
  padding: 2rem;

  @media (min-width: 600px) {
    max-width: 300px;
  }

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    padding: 2rem;
    max-width: 400px;
  }
`;

const TextStyled = styled(TextMarkdown)`
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.officeGreen};
  padding: 1rem;

  @media (min-width: 600px) {
    color: ${({ theme }) => theme.officeGreen};
    background: transparent;
    padding: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.3rem;
  }
`;

const TitleStyled = styled.div`
  display: none;

  @media (min-width: 600px) {
    display: block;
    font-family: ${({ theme }) => theme.fontFamiliesAlternate};
    text-align: center;
    color: ${({ theme }) => theme.officeGreen};
    font-size: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 3rem;
  }
`;

const LogoLinkStyled = styled(Link)`
  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:hover {
    transition: opacity 230ms ease;
    opacity: 0.9;
  }
`;

const LogoStyled = styled.img`
  width: 75px;
`;

const LogosContainerStyled = styled.div`
  text-align: center;
  margin-top: 1rem;
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
        <GatsbyImage
          fluid={sources}
          imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </ImageContainerStyled>

      <ContentContainerStyled>
        <div className="container">
          <ContentWrapperStyled>
            {/* <Logo url="/" /> */}
            <TitleStyled>Karima Delli</TitleStyled>
            <TextStyled>{text}</TextStyled>
            <LogosContainerStyled>
              {logos.map(({ url, image: logoImage, title }) => (
                <LogoLinkStyled key={url} url={url}>
                  <LogoStyled src={logoImage} alt={title} />
                </LogoLinkStyled>
              ))}
            </LogosContainerStyled>
          </ContentWrapperStyled>
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
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HomeHero;
