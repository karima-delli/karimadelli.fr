import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import HeroSection from '../components/home/Hero';
import LogosSection from '../components/home/Logos';
import CarouselSection from '../components/home/Carousel';
import NewsSection from '../components/home/News';
import ContactUs from '../components/ContactUs';
import Metadata from '../components/Metadata';

const HomePage = ({ data, pageContext }) => (
  <>
    <Metadata
      metadata={data.page.metadata}
      locale={pageContext.locale}
      lang={pageContext.lang}
      url={pageContext.url}
      alternates={pageContext.alternates}
    />
    <HeroSection
      image={data.page.hero.image.childImageSharp}
      text={data.page.hero.text}
      button={data.page.hero.button}
    />
    <LogosSection
      logos={data.page.logos.map(logo => {
        return {
          ...logo,
          title: logo.title,
          image: logo.image.publicURL,
        };
      })}
    />
    <CarouselSection
      button={data.page.slider.button}
      slides={data.slider.slides.map(slide => {
        return {
          ...slide,
          text: slide.text.text,
          image: slide.image.localFile.childImageSharp,
        };
      })}
    />
    <section className="section">
      <div className="container">
        <h2>Nos campagnes</h2>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <h2>Newsletter</h2>
      </div>
    </section>
    <NewsSection
      title={data.page.newsSection.title}
      text={data.page.newsSection.text}
      readMoreButtonTitle={data.page.newsSection.readMoreButtonTitle}
      parliamentTitle={data.page.newsSection.parliamentTitle}
      parliamentaryActivities={data.parliamentaryActivities.activities}
      parliamentaryActivitiesUrl={data.parliamentaryActivities.url}
      twitterTitle={data.page.newsSection.twitterTitle}
      calendarUrl={data.site.siteMetadata.calendarUrlPublicUrl}
      calendarTitle={data.page.newsSection.calendarTitle}
      calendarEvents={data.events.nodes}
    />
    <ContactUs
      title={data.contactUs.title}
      text={data.contactUs.text}
      button={data.contactUs.button}
    />
  </>
);

HomePage.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alternates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        calendarUrlPublicUrl: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    contactUs: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      button: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    page: PropTypes.shape({
      metadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      hero: PropTypes.shape({
        image: PropTypes.shape({
          childImageSharp: PropTypes.shape({}).isRequired,
        }).isRequired,
        text: PropTypes.string.isRequired,
        button: PropTypes.shape({}).isRequired,
      }).isRequired,
      logos: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.shape({
            publicURL: PropTypes.string.isRequired,
          }).isRequired,
          title: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
      slider: PropTypes.shape({
        button: PropTypes.shape({}).isRequired,
      }).isRequired,
      newsSection: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        readMoreButtonTitle: PropTypes.string.isRequired,
        parliamentTitle: PropTypes.string.isRequired,
        twitterTitle: PropTypes.string.isRequired,
        calendarTitle: PropTypes.string.isRequired,
      }).isRequired,
    }),
    slider: PropTypes.shape({
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
    parliamentaryActivities: PropTypes.shape({
      url: PropTypes.string.isRequired,
      activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    events: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
  }).isRequired,
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery($lang: String!) {
    ...Header
    ...Footer
    ...ContactBlock
    site {
      siteMetadata {
        calendarUrlPublicUrl
      }
    }
    page: homeYaml(lang: { eq: $lang }) {
      metadata {
        title
        description
      }
      hero {
        image {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        text
        button {
          title
          url
        }
      }
      logos {
        image {
          publicURL
        }
        title
        url
      }
      slider {
        button {
          title
          url
        }
      }
      campaignsSection {
        title
        text
        readMoreButtonTitle
        allButton {
          title
          url
        }
      }
      newsSection {
        title
        text
        readMoreButtonTitle
        parliamentTitle
        calendarTitle
        twitterTitle
      }
    }
    slider: contentfulSlider(
      title: { eq: "Home Slider" }
      node_locale: { eq: $lang }
    ) {
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
    parliamentaryActivities(lang: { eq: $lang }) {
      url
      activities {
        category
        date
        title
        url
      }
    }
    events: allIcal(
      limit: 3
      sort: { fields: start, order: ASC }
      filter: { isFuture: { eq: true }, summary: { ne: "" } }
    ) {
      nodes {
        id
        dateFormattedFr: start(formatString: "DD/MM/YYYY")
        dateFormattedEn: start(formatString: "MM/DD/YYYY")
        hour: start(formatString: "HH:mm")
        summary
        location
        description
      }
    }
  }
`;
