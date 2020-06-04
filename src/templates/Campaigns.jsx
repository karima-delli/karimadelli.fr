import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { useTheme } from 'styled-components';
import Metadata from '../components/Metadata';
import CampaignsBlock from '../components/CampaignsBlock';
import NewsletterForm from '../components/NewsletterForm';
import Hr from '../components/Hr';

const CampaignsPage = ({ data, pageContext }) => {
  const theme = useTheme();

  return (
    <>
      <Metadata
        metadata={{
          title: data.page.metadata.title,
          description: data.page.metadata.description,
        }}
        locale={pageContext.locale}
        lang={pageContext.lang}
        url={pageContext.url}
        alternates={pageContext.alternates}
      />
      <CampaignsBlock
        baseTitleTag={1}
        onePerLine
        {...data.campaignsBlock}
        allButton={null}
        campaigns={data.campaigns.nodes.map((node) => {
          return {
            ...node,
            image: node.image.localFile.childImageSharp,
          };
        })}
      />

      <Hr className="is-small" color={theme.officeGreen} />

      <NewsletterForm {...data.newsletterForm} />
    </>
  );
};

CampaignsPage.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alternates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    page: PropTypes.shape({
      metadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
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
    campaignsBlock: PropTypes.shape({}).isRequired,
    newsletterForm: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default CampaignsPage;

export const pageQuery = graphql`
  query CampaignsPageQuery($lang: String!) {
    ...Header
    ...Footer
    ...CampaignsBlock
    ...NewsletterForm
    page: campaignsYaml(lang: { eq: $lang }) {
      metadata {
        title
        description
      }
    }
    campaigns: allContentfulCampaign(filter: { node_locale: { eq: $lang } }) {
      nodes {
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 2000) {
                ...GatsbyImageSharpFluid_withWebp
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
