import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import RichText from '../components/RichText';
import Hero from '../components/campaign/Hero';
import ShortContent from '../components/campaign/ShortContent';

const Campaign = ({ data }) => {
  const readingTime = Math.ceil(
    data.content.shortContent.readingTime + data.content.content.readingTime
  );

  return (
    <article>
      <Hero
        image={data.content.image.localFile.childImageSharp}
        readingTime={readingTime}
        readingTimeStr={data.page.readingTime}
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
      {/* block newsletter */}
      {/* autres campaigns */}
    </article>
  );
};

Campaign.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      readingTime: PropTypes.string.isRequired,
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
      title: PropTypes.string.isRequired,
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
  }).isRequired,
};

export default Campaign;

export const pageQuery = graphql`
  query CampaignQuery($locale: String!, $id: String!, $assetIds: [String!]!) {
    ...Header
    ...Footer
    page: campaignYaml(lang: { eq: $locale }) {
      readingTime
      shortContentTitle
    }
    contentRichTextAssets: allContentfulAsset(
      filter: { contentful_id: { in: $assetIds }, node_locale: { eq: $locale } }
    ) {
      nodes {
        contentful_id
        localFile {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    content: contentfulCampaign(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
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
