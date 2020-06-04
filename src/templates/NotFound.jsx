import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { useTheme } from 'styled-components';
import Button from '../components/Button';
import Title from '../components/Title';
import TextMarkdown from '../components/TextMarkdown';
import Metadata from '../components/Metadata';

const TitleStyled = styled(Title)`
  margin-bottom: 1rem;
`;

const TextStyled = styled(TextMarkdown)`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;
`;

const NotFound = ({ data, pageContext }) => {
  const theme = useTheme();
  return (
    <>
      <Metadata
        metadata={{
          title: data.page.title,
        }}
        locale={pageContext.locale}
        lang={pageContext.lang}
        url={pageContext.url}
        alternates={pageContext.alternates}
      />
      <section className="section">
        <div className="container has-text-centered">
          <TitleStyled page>{data.page.title}</TitleStyled>
          <TextStyled>{data.page.text}</TextStyled>
          <div>
            <Button
              {...data.page.button}
              color={theme.white}
              background={theme.officeGreen}
            />
          </div>
        </div>
      </section>
    </>
  );
};

NotFound.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alternates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      button: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default NotFound;

export const pageQuery = graphql`
  query NotFoundQuery($lang: String!) {
    ...Header
    ...Footer
    page: notFoundYaml(lang: { eq: $lang }) {
      title
      text
      button {
        title
        url
      }
    }
  }
`;
