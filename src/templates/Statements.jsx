import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Metadata from '../components/Metadata';
import StatementsBlock from '../components/StatementsBlock';

const StatementsPage = ({ data, pageContext }) => (
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
    <StatementsBlock
      {...data.statementsBlock}
      baseTitleTag={1}
      allButton={null}
      statements={data.statements.nodes}
    />
  </>
);

StatementsPage.propTypes = {
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
    statements: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    statementsBlock: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default StatementsPage;

export const pageQuery = graphql`
  query StatementsPageQuery($lang: String!) {
    ...Header
    ...Footer
    ...StatementsBlock
    page: statementsYaml(lang: { eq: $lang }) {
      metadata {
        title
        description
      }
    }
    statements: allContentfulStatement(
      sort: { fields: date, order: DESC }
      filter: { node_locale: { eq: $lang } }
    ) {
      nodes {
        slug
        title
        date(formatString: "DD/MM/YYYY")
      }
    }
  }
`;
