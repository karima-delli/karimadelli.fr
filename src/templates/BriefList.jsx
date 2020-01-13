import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const BriefListPage = ({ data }) => (
  <div>
    breves page
    <div>{data.page.title}</div>
  </div>
);

BriefListPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BriefListPage;

export const pageQuery = graphql`
  query BriefListPageQuery($lang: String!) {
    ...Header
    ...Footer
    page: briefListYaml(lang: { eq: $lang }) {
      metadata {
        title
        description
      }
    }
  }
`;
