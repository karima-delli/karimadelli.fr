import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import FacebookIcon from './Icons/Facebook';
import InstagramIcon from './Icons/Instagram';
import TwitterIcon from './Icons/Twitter';
import YoutubeIcon from './Icons/Youtube';
import IconLink from './IconLink';

const TextStyled = styled.p`
  font-size: 1.3rem;
  text-align: center;
`;

const IconLinksStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 2rem;
`;

const IconLinkStyled = styled(IconLink)`
  display: flex;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const ContactUs = ({ text, socialLinks }) => (
  <section className="section">
    <div className="container">
      <TextStyled>{text}</TextStyled>
      <IconLinksStyled>
        <IconLinkStyled url={socialLinks.twitter}>
          <TwitterIcon />
        </IconLinkStyled>
        <IconLinkStyled url={socialLinks.instagram}>
          <InstagramIcon />
        </IconLinkStyled>
        <IconLinkStyled url={socialLinks.facebook}>
          <FacebookIcon />
        </IconLinkStyled>
        <IconLinkStyled url={socialLinks.youtube}>
          <YoutubeIcon />
        </IconLinkStyled>
      </IconLinksStyled>
    </div>
  </section>
);

ContactUs.propTypes = {
  text: PropTypes.string.isRequired,
  socialLinks: PropTypes.shape({
    facebook: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    instagram: PropTypes.string.isRequired,
    youtube: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactUs;

export const query = graphql`
  fragment FollowUs on Query {
    followUs: followUsYaml(lang: { eq: $lang }) {
      text
    }
    followUsSocialLinks: socialLinksYaml {
      facebook
      twitter
      instagram
      youtube
    }
  }
`;
