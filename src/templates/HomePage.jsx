import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import HeroSection from '../components/home/Hero';
import LogosSection from '../components/home/Logos';
import CarouselSection from '../components/home/Carousel';

const HomePage = ({ data }) => (
  <>
    <HeroSection
      image={data.page.heroImage.localFile.childImageSharp}
      text={data.page.heroText.heroText}
      button={data.page.heroButton}
      logos={data.page.logos}
    />
    <LogosSection
      logos={data.page.logos.map(logo => {
        return {
          ...logo,
          title: logo.alt,
          image: logo.image.localFile.publicURL,
        };
      })}
    />
    <CarouselSection
      button={data.page.sliderButton}
      slides={data.page.slides.map(slide => {
        return {
          ...slide,
          text: slide.text.text,
          image: slide.image.localFile.childImageSharp,
        };
      })}
    />
  </>
);

HomePage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      heroImage: PropTypes.shape({
        localFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({}).isRequired,
        }).isRequired,
      }).isRequired,
      heroText: PropTypes.shape({
        heroText: PropTypes.string.isRequired,
      }).isRequired,
      heroButton: PropTypes.shape({}).isRequired,
      logos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      sliderButton: PropTypes.shape({}).isRequired,
      slides: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.shape({
            localFile: PropTypes.shape({
              childImageSharp: PropTypes.shape({}).isRequired,
            }).isRequired,
          }).isRequired,
          title: PropTypes.string.isRequired,
          text: PropTypes.shape({
            text: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery($locale: String!, $id: String!) {
    ...Header
    ...Footer
    page: contentfulHomePage(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
      title
      heroImage {
        localFile {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      heroText {
        heroText
      }
      heroButton {
        title
        url
      }
      logos {
        url
        alt
        image {
          localFile {
            publicURL
          }
        }
      }
      sliderButton {
        url
        title
      }
      slides {
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 2000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        title
        text {
          text
        }
      }
    }
  }
`;
