import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import NewsBlock from '../components/NewsBlock';
import Metadata from '../components/Metadata';

const NewsPage = ({ data, pageContext }) => (
  <>
    <Metadata
      metadata={data.page.metadata}
      locale={pageContext.locale}
      lang={pageContext.lang}
      url={pageContext.url}
      alternates={pageContext.alternates}
    />
    <NewsBlock
      baseTitleTag={1}
      {...data.newsBlock}
      parliamentaryActivities={data.parliamentaryActivities.activities}
      parliamentaryActivitiesUrl={data.parliamentaryActivities.url}
      calendarEnabled
      calendarUrl={data.site.siteMetadata.calendarUrlPublicUrl}
      calendarEvents={data.events.nodes}
    />
  </>
);

NewsPage.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alternates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        calendarUrlPublicUrl: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    page: PropTypes.shape({
      metadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    newsBlock: PropTypes.shape({}).isRequired,
    parliamentaryActivities: PropTypes.shape({
      url: PropTypes.string.isRequired,
      activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    events: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
  }).isRequired,
};

export default NewsPage;

export const pageQuery = graphql`
  query NewsPageQuery($lang: String!) {
    ...Header
    ...Footer
    ...NewsBlock
    site {
      siteMetadata {
        calendarUrlPublicUrl
      }
    }
    page: newsYaml(lang: { eq: $lang }) {
      metadata {
        title
        description
      }
    }
  }
`;
