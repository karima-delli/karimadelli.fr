import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { useTheme } from 'styled-components';

import HeroContent from '../components/HeroContent';
import Metadata from '../components/Metadata';
import Form from '../components/contact/Form';
import NewsletterForm from '../components/NewsletterForm';
import FollowUs from '../components/FollowUs';
import Hr from '../components/Hr';

const SectionStyled = styled.section`
  padding-top: 0 !important;
`;

const ContactPage = ({ data, pageContext }) => {
  const theme = useTheme();
  return (
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
      <HeroContent
        title={data.page.title}
        subTitle={data.page.text}
        displayReadingTime={false}
        displayShareButtons={false}
      />
      <SectionStyled className="section">
        <div className="container">
          <Form {...data.page.form} />
        </div>
      </SectionStyled>

      <Hr className="is-small" color={theme.officeGreen} />
      <NewsletterForm {...data.newsletterForm} />

      <Hr className="is-small" color={theme.officeGreen} />
      <FollowUs {...data.followUs} socialLinks={data.followUsSocialLinks} />
    </>
  );
};

ContactPage.propTypes = {
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
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      form: PropTypes.shape({
        placeholders: PropTypes.shape({
          name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          message: PropTypes.string.isRequired,
        }).isRequired,
        messages: PropTypes.shape({
          success: PropTypes.string.isRequired,
          error: PropTypes.string.isRequired,
        }).isRequired,
        buttonSend: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    followUs: PropTypes.shape({}).isRequired,
    followUsSocialLinks: PropTypes.shape({}).isRequired,
    newsletterForm: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default ContactPage;

export const pageQuery = graphql`
  query ContactPageQuery($lang: String!) {
    ...Header
    ...Footer
    ...FollowUs
    ...NewsletterForm
    page: contactYaml(lang: { eq: $lang }) {
      metadata {
        title
        description
      }
      title
      text
      form {
        placeholders {
          name
          email
          message
        }
        messages {
          success
          error
        }
        buttonSend {
          title
        }
      }
    }
  }
`;
