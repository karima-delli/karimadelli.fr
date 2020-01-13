import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import HeroSection from '../components/home/Hero';
import LogosSection from '../components/home/Logos';
import CarouselSection from '../components/home/Carousel';
import CampaignsSection from '../components/home/Campaigns';
import NewsBlock from '../components/NewsBlock';
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
    <CampaignsSection
      title={data.page.campaignsSection.title}
      text={data.page.campaignsSection.text}
      readMoreButtonTitle={data.page.campaignsSection.readMoreButtonTitle}
      campaignsSlug={data.page.campaignsSection.campaignsSlug}
      allButton={data.page.campaignsSection.allButton}
      campaigns={data.campaigns.nodes.map(node => {
        return {
          ...node,
          image: node.image.localFile.childImageSharp,
        };
      })}
    />

    <section className="section">
      <div className="container">
        <h2>Newsletter</h2>
      </div>
    </section>

    <NewsBlock
      title={data.newsBlock.title}
      text={data.newsBlock.text}
      readMoreButtonTitle={data.newsBlock.readMoreButtonTitle}
      parliamentTitle={data.newsBlock.parliamentTitle}
      parliamentaryActivities={data.parliamentaryActivities.activities}
      parliamentaryActivitiesUrl={data.parliamentaryActivities.url}
      twitterTitle={data.newsBlock.twitterTitle}
      calendarUrl={data.site.siteMetadata.calendarUrlPublicUrl}
      calendarTitle={data.newsBlock.calendarTitle}
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
      campaignsSection: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        readMoreButtonTitle: PropTypes.string.isRequired,
        campaignsSlug: PropTypes.string.isRequired,
        allButton: PropTypes.shape({
          title: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired,
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
    campaigns: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.shape({
            localFile: PropTypes.shape({
              childImageSharp: PropTypes.shape({}).isRequired,
            }).isRequired,
          }).isRequired,
          title: PropTypes.string.isRequired,
          subTitle: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          category: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    contactUs: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      button: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    newsBlock: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      readMoreButtonTitle: PropTypes.string.isRequired,
      parliamentTitle: PropTypes.string.isRequired,
      calendarTitle: PropTypes.string.isRequired,
      twitterTitle: PropTypes.string.isRequired,
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
    ...NewsBlock
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
        campaignsSlug
        allButton {
          title
          url
        }
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
    campaigns: allContentfulCampaign(
      limit: 3
      filter: { node_locale: { eq: $lang } }
    ) {
      nodes {
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 2000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        slug
        title
        subTitle
        category
      }
    }
  }
`;
