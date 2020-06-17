import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { useTheme } from 'styled-components';
import RichText from '../components/RichText';
import HeroContent from '../components/HeroContent';
import Metadata from '../components/Metadata';
import ReadingProgressBar from '../components/ReadingProgressBar';

const HeroContentStyled = styled(HeroContent)`
  margin-top: -7px;
`;

const Page = ({ data, pageContext }) => {
  const theme = useTheme();
  const readingTime = Math.ceil(data.page.content.readingTime);
  const articleRef = useRef();

  return (
    <article ref={articleRef}>
      <ReadingProgressBar ref={articleRef} color={theme.officeGreen} />
      <Metadata
        metadata={{
          title: data.page.title,
          description: data.page.description
            ? data.page.description.description
            : null,
        }}
        locale={pageContext.locale}
        lang={pageContext.lang}
        url={pageContext.url}
        alternates={pageContext.alternates}
      />
      <HeroContentStyled
        image={
          data.page.image ? data.page.image.localFile.childImageSharp : null
        }
        url={pageContext.url}
        title={data.page.title}
        subTitle={data.page.subTitle}
        displayReadingTime={data.page.displayReadingTime}
        displayShareButtons={data.page.displayShareButtons}
        readingTime={readingTime}
        readingTimeStr={data.heroContent.readingTime}
      />
      <section className="section">
        <div className="container">
          <RichText
            json={data.page.content.json}
            richTextAssets={data.richTextAssets.nodes}
          />
        </div>
      </section>
    </article>
  );
};

Page.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alternates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    heroContent: PropTypes.shape({
      readingTime: PropTypes.shape({}).isRequired,
    }).isRequired,
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string,
      description: PropTypes.shape({
        description: PropTypes.string.isRequired,
      }),
      image: PropTypes.shape({
        localFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.shape({}).isRequired,
          }).isRequired,
        }).isRequired,
      }),
      displayReadingTime: PropTypes.bool,
      displayShareButtons: PropTypes.bool,
      content: PropTypes.shape({
        json: PropTypes.shape({}).isRequired,
        readingTime: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    richTextAssets: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Page;

export const pageQuery = graphql`
  query PageQuery($lang: String!, $id: String!, $assetIds: [String!]!) {
    ...Header
    ...Footer
    ...HeroContent
    richTextAssets: allContentfulAsset(
      filter: { contentful_id: { in: $assetIds }, node_locale: { eq: $lang } }
    ) {
      nodes {
        contentful_id
        file {
          contentType
        }
        localFile {
          publicURL
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    page: contentfulPage(
      contentful_id: { eq: $id }
      node_locale: { eq: $lang }
    ) {
      title
      description {
        description
      }
      subTitle
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      displayReadingTime
      displayShareButtons
      content {
        json
        readingTime
      }
    }
  }
`;
