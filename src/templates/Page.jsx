import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const Page = ({ data }) => (
  <div>
    content page
    <div>{data.page.title}</div>
  </div>
);

Page.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Page;

export const pageQuery = graphql`
  query PageQuery($locale: String!, $id: String!) {
    ...Header
    ...Footer
    page: contentfulPage(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
      title
    }
  }
`;
