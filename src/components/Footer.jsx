import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';
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
  margin: 1rem auto;
`;

const TitleStyled = styled.div`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  text-transform: uppercase;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => transparentize(0.5, theme.white)};
  margin-bottom: 1rem;
`;

const MenuStyled = styled.div`
  margin-bottom: 1rem;
`;

const MenuLinkStyled = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.white};
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.white};
    text-decoration: underline;
  }

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    display: inline-block;
    &:not(:last-child) {
      margin-bottom: 0;
      margin-right: 0.5rem;
    }
  }
`;

const IconLinksStyled = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const IconLinkStyled = styled(IconLink)`
  display: flex;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Footer = ({ menu, content, socialLinks }) => {
  const theme = useContext(ThemeContext);
  const getSocialLinkUrl = platform => {
    return socialLinks.find(link => link.platform === platform).url;
  };
  return (
    <FooterStyled className="footer">
      <FooterHeaderStyled>
        <Logo reverse />
        <LangSwitcherContainerStyled>
          <LangSwitcher color={theme.officeGreen} />
        </LangSwitcherContainerStyled>
      </FooterHeaderStyled>

      <TextStyled>{content.text.text}</TextStyled>
      <TitleStyled>{content.titleMenu}</TitleStyled>
      <MenuStyled>
        {menu.links.map(link => (
          <MenuLinkStyled key={link.path} url={link.path}>
            {link.title}
          </MenuLinkStyled>
        ))}
      </MenuStyled>
      <TitleStyled>{content.titleSocialLinks}</TitleStyled>

      <IconLinksStyled>
        <IconLinkStyled url={getSocialLinkUrl('Twitter')} reverse>
          <TwitterIcon />
        </IconLinkStyled>
        <IconLinkStyled url={getSocialLinkUrl('Instagram')} reverse>
          <InstagramIcon />
        </IconLinkStyled>
        <IconLinkStyled url={getSocialLinkUrl('Facebook')} reverse>
          <FacebookIcon />
        </IconLinkStyled>
        <IconLinkStyled url={getSocialLinkUrl('Youtube')} reverse>
          <YoutubeIcon />
        </IconLinkStyled>
      </IconLinksStyled>
    </FooterStyled>
  );
};

Footer.propTypes = {
  menu: PropTypes.shape({
    links: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  content: PropTypes.shape({
    titleMenu: PropTypes.string.isRequired,
    titleSocialLinks: PropTypes.string.isRequired,
    text: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  socialLinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Footer;

export const query = graphql`
  fragment Footer on Query {
    footerMenu: contentfulMenu(
      name: { eq: "Footer menu" }
      node_locale: { eq: $locale }
    ) {
      links {
        title
        path
      }
    }
    footer: contentfulFooter(node_locale: { eq: $locale }) {
      titleMenu
      titleSocialLinks
      text {
        text
      }
    }
    footerSocialLinks: allContentfulSocialLink {
      nodes {
        platform
        url
      }
    }
  }
`;
