import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const ContentPage = ({ data }) => (
  <div>
    content page
    <div>{data.page.title}</div>
  </div>
);

ContentPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ContentPage;

export const pageQuery = graphql`
  query ContentPageQuery($locale: String!, $id: String!) {
    ...Header
    ...Footer
    page: contentfulContentPage(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
      title
    }
  }
`;
