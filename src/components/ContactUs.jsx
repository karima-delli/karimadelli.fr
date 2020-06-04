import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { useTheme } from 'styled-components';
import Title from './Title';
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
  const theme = useTheme();

  return (
    <section className="section">
      <Title section as="h2">
        {title}
      </Title>
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
    contactUs: contactUsYaml(lang: { eq: $lang }) {
      text
      title
      button {
        title
        url
      }
    }
  }
`;
