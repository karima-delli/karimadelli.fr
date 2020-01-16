import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { ThemeContext } from 'styled-components';
import RichText from '../components/RichText';
import HeroContent from '../components/HeroContent';
import ShortContent from '../components/campaign/ShortContent';
import Metadata from '../components/Metadata';
import NewsletterForm from '../components/NewsletterForm';
import Hr from '../components/Hr';

const Campaign = ({ data, pageContext }) => {
  const theme = useContext(ThemeContext);
  const readingTime = Math.ceil(
    data.content.shortContent.readingTime + data.content.content.readingTime
  );

  return (
    <article>
      <Metadata
        metadata={{
          title: data.content.title,
          description: data.content.description || data.content.subTitle,
        }}
        locale={pageContext.locale}
        lang={pageContext.lang}
        url={pageContext.url}
        alternates={pageContext.alternates}
      />
      <HeroContent
        image={data.content.image.localFile.childImageSharp}
        url={pageContext.url}
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
      <Hr className="is-small" color={theme.officeGreen} />

      <NewsletterForm {...data.newsletterForm} />

      {/* autres campaigns */}
    </article>
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
    ...NewsletterForm
    page: campaignYaml(lang: { eq: $lang }) {
      readingTime
      shortContentTitle
    }
    contentRichTextAssets: allContentfulAsset(
      filter: { contentful_id: { in: $assetIds }, node_locale: { eq: $lang } }
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
      node_locale: { eq: $lang }
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
