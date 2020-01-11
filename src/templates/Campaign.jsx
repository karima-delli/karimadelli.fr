import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const Campaign = ({ data }) => (
  <div>
    page campagn
    <div>{data.page.title}</div>
  </div>
);

Campaign.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Campaign;

export const pageQuery = graphql`
  query CampaignQuery($locale: String!, $id: String!) {
    ...Header
    ...Footer
    page: contentfulCampaign(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
      title
    }
  }
`;
