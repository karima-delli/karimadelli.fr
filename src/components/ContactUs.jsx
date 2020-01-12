import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';
import SectionTitle from './SectionTitle';
import TextMarkdown from './TextMarkdown';
import Button from './Button';

const TextStyled = styled(TextMarkdown)`
  font-size: 1rem;
  margin: 1rem 0;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.5rem;
  }
`;

const ContactUs = ({ title, text, button }) => {
  const theme = useContext(ThemeContext);

  return (
    <section className="section">
      <SectionTitle>{title}</SectionTitle>
      <div className="has-text-centered">
        <TextStyled>{text}</TextStyled>
        <Button
          {...button}
          color={theme.white}
          background={theme.officeGreen}
        />
      </div>
    </section>
  );
};

ContactUs.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.shape({}).isRequired,
};

export default ContactUs;

export const query = graphql`
  fragment ContactBlock on Query {
    contactBlock: contentfulContactBlock(node_locale: { eq: $locale }) {
      text {
        text
      }
      title
      button {
        title
        url
      }
    }
  }
`;
