import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const CampaignsPage = ({ data }) => (
  <div>
    campaigns page
    <div>{data.page.title}</div>
  </div>
);

CampaignsPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CampaignsPage;

export const pageQuery = graphql`
  query CampaignsPageQuery($locale: String!, $id: String!) {
    ...Header
    ...Footer
    page: contentfulCampaignsPage(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
      title
    }
  }
`;
