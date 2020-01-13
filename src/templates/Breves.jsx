import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const BrevesPage = ({ data }) => (
  <div>
    breves page
    <div>{data.page.title}</div>
  </div>
);

BrevesPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BrevesPage;

export const pageQuery = graphql`
  query BrevesPageQuery($locale: String!) {
    ...Header
    ...Footer
    page: brevesYaml(lang: { eq: $locale }) {
      metadata {
        title
        description
      }
    }
  }
`;
