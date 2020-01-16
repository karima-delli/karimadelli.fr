import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import HeroSection from '../components/home/Hero';
import LogosSection from '../components/home/Logos';
import CarouselSection from '../components/home/Carousel';
import CampaignsBlock from '../components/CampaignsBlock';
import StatementsBlock from '../components/StatementsBlock';
import NewsBlock from '../components/NewsBlock';
import ContactUs from '../components/ContactUs';
import Hr from '../components/Hr';
import Metadata from '../components/Metadata';
import NewsletterForm from '../components/NewsletterForm';

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
      image={data.page.hero.image}
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

    {data.campaigns.nodes.length && (
      <CampaignsBlock
        {...data.campaignsBlock}
        campaigns={data.campaigns.nodes.map(node => {
          return {
            ...node,
            image: node.image.localFile.childImageSharp,
          };
        })}
      />
    )}

    <Hr />

    <NewsletterForm {...data.newsletterForm} />

    {data.statements.nodes.length && (
      <>
        <Hr />

        <StatementsBlock
          {...data.statementsBlock}
          statements={data.statements.nodes}
        />
      </>
    )}

    <NewsBlock
      {...data.newsBlock}
      parliamentaryActivitiesUrl={data.parliamentaryActivities.url}
      parliamentaryActivities={data.parliamentaryActivities.activities}
      calendarUrl={data.site.siteMetadata.calendarUrlPublicUrl}
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
        image: PropTypes.shape({}).isRequired,
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
        })
      ).isRequired,
    }).isRequired,
    statements: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    contactUs: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      button: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    newsBlock: PropTypes.shape({}).isRequired,
    campaignsBlock: PropTypes.shape({}).isRequired,
    statementsBlock: PropTypes.shape({}).isRequired,
    newsletterForm: PropTypes.shape({}).isRequired,
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
    ...CampaignsBlock
    ...StatementsBlock
    ...ContactBlock
    ...NewsletterForm
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
          mobile {
            childImageSharp {
              fluid(maxWidth: 1600, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          tablet {
            childImageSharp {
              fluid(maxWidth: 2190, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          desktop {
            childImageSharp {
              fluid(maxWidth: 2800, quality: 100) {
                ...GatsbyImageSharpFluid
              }
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
    statements: allContentfulStatement(
      limit: 1
      filter: { node_locale: { eq: $lang } }
    ) {
      nodes {
        slug
        title
        date(formatString: "DD/MM/YYYY")
      }
    }
  }
`;
