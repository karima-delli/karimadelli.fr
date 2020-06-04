import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { useTheme } from 'styled-components';
import { transparentize } from 'polished';
import Link from './Link';
import Logo from './Logo';
import FacebookIcon from './Icons/Facebook';
import InstagramIcon from './Icons/Instagram';
import TwitterIcon from './Icons/Twitter';
import YoutubeIcon from './Icons/Youtube';
import IconLink from './IconLink';
import LangSwitcher from './LangSwitcher';

const FooterStyled = styled.footer``;

const FooterHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LangSwitcherContainerStyled = styled.div``;

const TextStyled = styled.p`
  margin-top: 2rem;
`;

const TitleStyled = styled.div`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  text-transform: uppercase;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => transparentize(0.5, theme.white)};
  margin-bottom: 1rem;
`;

const TitleMenuStyled = styled(TitleStyled)`
  margin-top: 2rem;
`;

const MenuStyled = styled.div`
  margin-bottom: 1rem;
`;

const MenuLinkStyled = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.white};

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &:hover {
    color: ${({ theme }) => theme.white};
    text-decoration: underline;
  }

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    display: inline-block;
    &:not(:last-child) {
      margin-bottom: 0;
      margin-right: 1rem;
    }
  }
`;

const TitleSocialLinksStyled = styled(TitleStyled)`
  margin-top: 2rem;
`;

const IconLinksStyled = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const IconLinkStyled = styled(IconLink)`
  display: flex;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Footer = ({ footer, socialLinks }) => {
  const theme = useTheme();

  return (
    <FooterStyled className="footer">
      <div className="container">
        <FooterHeaderStyled>
          <Logo reverse url={footer.logo.url} />
          <LangSwitcherContainerStyled>
            <LangSwitcher color={theme.officeGreen} />
          </LangSwitcherContainerStyled>
        </FooterHeaderStyled>

        <TextStyled>{footer.text}</TextStyled>

        <TitleMenuStyled>{footer.menu.title}</TitleMenuStyled>
        <MenuStyled>
          {footer.menu.links.map((link) => (
            <MenuLinkStyled key={link.url} url={link.url}>
              {link.title}
            </MenuLinkStyled>
          ))}
        </MenuStyled>

        <TitleSocialLinksStyled>
          {footer.socialLinks.title}
        </TitleSocialLinksStyled>

        <IconLinksStyled>
          <IconLinkStyled url={socialLinks.twitter} reverse>
            <TwitterIcon />
          </IconLinkStyled>
          <IconLinkStyled url={socialLinks.instagram} reverse>
            <InstagramIcon />
          </IconLinkStyled>
          <IconLinkStyled url={socialLinks.facebook} reverse>
            <FacebookIcon />
          </IconLinkStyled>
          <IconLinkStyled url={socialLinks.youtube} reverse>
            <YoutubeIcon />
          </IconLinkStyled>
        </IconLinksStyled>
      </div>
    </FooterStyled>
  );
};

Footer.propTypes = {
  footer: PropTypes.shape({
    logo: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
    menu: PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    socialLinks: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  socialLinks: PropTypes.shape({
    facebook: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    instagram: PropTypes.string.isRequired,
    youtube: PropTypes.string.isRequired,
  }).isRequired,
};

export default Footer;

export const query = graphql`
  fragment Footer on Query {
    footer: footerYaml(lang: { eq: $lang }) {
      logo {
        url
      }
      text
      menu {
        title
        links {
          title
          url
        }
      }
      socialLinks {
        title
      }
    }
    footerSocialLinks: socialLinksYaml {
      facebook
      twitter
      instagram
      youtube
    }
  }
`;
