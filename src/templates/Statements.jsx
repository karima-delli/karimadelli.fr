import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const StatementsPage = ({ data }) => (
  <div>
    statements page
    <div>{data.page.title}</div>
  </div>
);

StatementsPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default StatementsPage;

export const pageQuery = graphql`
  query StatementsPageQuery($lang: String!) {
    ...Header
    ...Footer
    page: statementsYaml(lang: { eq: $lang }) {
      metadata {
        title
        description
      }
    }
  }
`;
