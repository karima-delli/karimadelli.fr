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

const Statement = ({ data, pageContext }) => {
  const theme = useTheme();
  const articleRef = useRef();

  return (
    <>
      <article ref={articleRef}>
        <ReadingProgressBar ref={articleRef} color={theme.officeGreen} />
        <Metadata
          metadata={{
            title: data.content.title,
            description: data.content.description,
          }}
          locale={pageContext.locale}
          lang={pageContext.lang}
          url={pageContext.url}
          alternates={pageContext.alternates}
        />
        <HeroContentStyled
          image={
            data.content.image && data.content.image.localFile.childImageSharp
          }
          url={pageContext.url}
          date={data.content.date}
          title={data.content.title}
        />
        <section className="section">
          <div className="container">
            <RichText
              json={data.content.content.json}
              assets={data.contentRichTextAssets.nodes}
            />
          </div>
        </section>
      </article>
    </>
  );
};

Statement.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alternates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    content: PropTypes.shape({
      image: PropTypes.shape({
        localFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.shape({}).isRequired,
          }).isRequired,
        }).isRequired,
      }),
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      content: PropTypes.shape({
        json: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
    contentRichTextAssets: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Statement;

export const pageQuery = graphql`
  query StatementQuery($lang: String!, $id: String!, $assetIds: [String!]!) {
    ...Header
    ...Footer
    contentRichTextAssets: allContentfulAsset(
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
    content: contentfulStatement(
      contentful_id: { eq: $id }
      node_locale: { eq: $lang }
    ) {
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      date(formatString: "DD/MM/YYYY")
      title
      description
      content {
        json
      }
    }
  }
`;
