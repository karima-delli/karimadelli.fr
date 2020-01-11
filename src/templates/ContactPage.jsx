import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const ContactPage = ({ data }) => (
  <div>
    contact page
    <div>{data.page.title}</div>
  </div>
);

ContactPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ContactPage;

export const pageQuery = graphql`
  query ContactPageQuery($locale: String!, $id: String!) {
    ...Header
    ...Footer
    page: contentfulContactPage(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
      title
    }
  }
`;
