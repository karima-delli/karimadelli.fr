import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { useTheme } from 'styled-components';
import RichText from '../components/RichText';
import HeroContent from '../components/HeroContent';
import ShortContent from '../components/campaign/ShortContent';
import Metadata from '../components/Metadata';
import NewsletterForm from '../components/NewsletterForm';
import Hr from '../components/Hr';
import ReadingProgressBar from '../components/ReadingProgressBar';

const HeroContentStyled = styled(HeroContent)`
  margin-top: -7px;
`;

const Campaign = ({ data, pageContext }) => {
  const theme = useTheme();
  const articleRef = useRef();

  const readingTime = Math.ceil(
    data.content.shortContent.readingTime + data.content.content.readingTime
  );

  const { siteUrl } = data.site.siteMetadata;
  const defaultImageUrl =
    data.content.defaultSocialImage.localFile.childImageSharp.fixed.src;
  const twitterImageUrl =
    data.content.twitterSocialImage.localFile.childImageSharp.fixed.src;

  return (
    <>
      <article ref={articleRef}>
        <ReadingProgressBar ref={articleRef} color={theme.officeGreen} />
        <Metadata
          metadata={{
            title: data.content.title,
            description: data.content.description || data.content.subTitle,
            socialImages: {
              default: siteUrl + defaultImageUrl,
              twitter: siteUrl + twitterImageUrl,
            },
          }}
          locale={pageContext.locale}
          lang={pageContext.lang}
          url={pageContext.url}
          alternates={pageContext.alternates}
        />
        <HeroContentStyled
          image={data.content.image.localFile.childImageSharp}
          url={pageContext.url}
          readingTime={readingTime}
          readingTimeStr={data.heroContent.readingTime}
          title={data.content.title}
          subTitle={data.content.subTitle}
        />
        <ShortContent
          title={data.page.shortContentTitle}
          content={data.content.shortContent}
          richTextAssets={data.contentRichTextAssets.nodes}
        />

        <section className="section">
          <div className="container">
            <RichText
              json={data.content.content.json}
              assets={data.contentRichTextAssets.nodes}
            />
          </div>
        </section>
        <Hr className="is-small" color={theme.officeGreen} />
      </article>
      <NewsletterForm {...data.newsletterForm} />
    </>
  );
};

Campaign.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alternates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    heroContent: PropTypes.shape({
      readingTime: PropTypes.shape({}).isRequired,
    }).isRequired,
    page: PropTypes.shape({
      shortContentTitle: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.shape({
      image: PropTypes.shape({
        localFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.shape({}).isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
      defaultSocialImage: PropTypes.shape({
        localFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fixed: PropTypes.shape({
              src: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
      twitterSocialImage: PropTypes.shape({
        localFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fixed: PropTypes.shape({
              src: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      subTitle: PropTypes.string.isRequired,
      shortContent: PropTypes.shape({
        readingTime: PropTypes.number.isRequired,
        json: PropTypes.shape({}).isRequired,
      }).isRequired,
      content: PropTypes.shape({
        readingTime: PropTypes.number.isRequired,
        json: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
    contentRichTextAssets: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    newsletterForm: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default Campaign;

export const pageQuery = graphql`
  query CampaignQuery($lang: String!, $id: String!, $assetIds: [String!]!) {
    ...Header
    ...Footer
    ...HeroContent
    ...NewsletterForm
    site {
      siteMetadata {
        siteUrl
      }
    }
    page: campaignYaml(lang: { eq: $lang }) {
      shortContentTitle
    }
    contentRichTextAssets: allContentfulAsset(
      filter: { contentful_id: { in: $assetIds }, node_locale: { eq: $lang } }
    ) {
      nodes {
        contentful_id
        file {
          contentType
        }
        localFile {
          publicURL
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    content: contentfulCampaign(
      contentful_id: { eq: $id }
      node_locale: { eq: $lang }
    ) {
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      defaultSocialImage: image {
        localFile {
          childImageSharp {
            fixed(width: 1200, height: 630) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
      }
      twitterSocialImage: image {
        localFile {
          childImageSharp {
            fixed(width: 880, height: 440) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
      }
      title
      description
      subTitle
      shortContent {
        json
        readingTime
      }
      content {
        json
        readingTime
      }
    }
  }
`;
