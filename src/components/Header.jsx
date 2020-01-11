import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';
import { darken } from 'polished';
import FacebookIcon from './Icons/Facebook';
import InstagramIcon from './Icons/Instagram';
import TwitterIcon from './Icons/Twitter';
import YoutubeIcon from './Icons/Youtube';
import Logo from './Logo';
import Link from './Link';
import IconLink from './IconLink';
import LangSwitcher from './LangSwitcher';

const LogoTwitterWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpointDesktopBefore}) {
    width: 100%;
    padding-right: 1rem;
  }
`;

const LogoWrapperStyled = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    text-align: left;
  }
`;

const BurgerStyled = styled.a`
  color: ${({ navbarStyle, theme }) =>
    navbarStyle === 1 ? theme.officeGreen : theme.white} !important;

  span {
    height: 2px !important;
  }
`;

const LangSwitcherContainerStyled = styled.div``;

const NavbarStartStyled = styled.div`
  flex-grow: 1;
  justify-content: center !important;

  ${LangSwitcherContainerStyled} {
    position: absolute;
    top: ${3.25 + 1}rem;
    right: 1rem;
  }
`;

const LinkStyled = styled(Link)`
  color: ${({ theme }) => theme.officeGreen} !important;
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  font-size: 1.2rem;

  &:hover {
    color: ${({ theme }) => darken(0.05, theme.officeGreen)} !important;
  }
`;

const NavbarEndStyled = styled.div`
  align-items: center !important;

  ${LangSwitcherContainerStyled} {
    margin-left: 2rem;
  }
`;

const ContainerStyled = styled.div``;

const NavbarBrandStyled = styled.div`
  background-color: ${({ navbarStyle, theme }) =>
    navbarStyle === 1 ? 'transparent' : theme.officeGreen} !important;
`;

const NavbarMenuStyled = styled.div``;

const NavbarStyled = styled.nav`
  background-color: transparent !important;

  @media (max-width: ${({ theme }) => theme.breakpointDesktopBefore}) {
    &.is-active {
      > ${ContainerStyled} {
        transition: background-color 230ms ease;
        background-color: ${({ theme }) => theme.fluorescentOrange} !important;
        position: absolute;
        height: 100vh;
        display: flex !important;
        flex-direction: column;

        ${NavbarBrandStyled} {
          flex: none;
        }

        ${NavbarMenuStyled} {
          background: transparent !important;
          display: flex !important;
          justify-content: center;
          align-items: center;
          flex-basis: 0;
          flex-grow: 1;
          text-align: center;

          ${LinkStyled} {
            color: ${({ theme }) => theme.white} !important;

            &:hover {
              color: ${({ theme }) => darken(0.05, theme.white)} !important;
            }
          }
        }

        ${NavbarStartStyled} {
          flex-grow: 0;
        }

        ${NavbarEndStyled} {
          display: none;
        }
      }
    }
  }
`;

const Header = ({ isTransparent, menu, socialLinks }) => {
  const theme = useContext(ThemeContext);
  const [navbarMenuActive, setNavbarActive] = useState(false);

  if (typeof document !== 'undefined') {
    const htmlEl = document.querySelector('html');
    // Disable scroll when the menu is active
    if (navbarMenuActive) {
      htmlEl.style.overflow = 'hidden';
    } else {
      htmlEl.style.overflow = '';
    }
  }

  if (typeof window !== 'undefined') {
    // Extract desktop breakpoint from theme
    const breakpointDesktop = Number.parseInt(theme.breakpointDesktop, 10);

    // Disable menu when the window is resizing
    useEffect(() => {
      const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (navbarMenuActive && windowWidth >= breakpointDesktop) {
          setNavbarActive(false);
        }
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
  }

  const navbarStyle = isTransparent && !navbarMenuActive ? 1 : 2;

  const getSocialLinkUrl = platform => {
    return socialLinks.nodes.find(link => link.platform === platform).url;
  };

  return (
    <NavbarStyled className={`navbar ${navbarMenuActive ? 'is-active' : ''}`}>
      <ContainerStyled className="container">
        <NavbarBrandStyled className="navbar-brand" navbarStyle={navbarStyle}>
          <BurgerStyled
            role="button"
            className={`navbar-burger is-marginless is-transparent ${
              navbarMenuActive ? 'is-active' : ''
            }`}
            onClick={() => setNavbarActive(!navbarMenuActive)}
            navbarStyle={navbarStyle}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </BurgerStyled>
          <LogoTwitterWrapperStyled>
            <LogoWrapperStyled>
              <Logo reverse={navbarStyle === 2} />
            </LogoWrapperStyled>

            <div className="is-hidden-desktop is-flex">
              <IconLink
                className="navbar-item"
                url={getSocialLinkUrl('Twitter')}
                onClick={() => setNavbarActive(false)}
                reverse={navbarStyle === 2}
              >
                <TwitterIcon />
              </IconLink>
              <IconLink
                className="navbar-item is-hidden-mobile"
                url={getSocialLinkUrl('Instagram')}
                onClick={() => setNavbarActive(false)}
                reverse={navbarStyle === 2}
              >
                <InstagramIcon />
              </IconLink>
              <IconLink
                className="navbar-item is-hidden-mobile"
                url={getSocialLinkUrl('Facebook')}
                onClick={() => setNavbarActive(false)}
                reverse={navbarStyle === 2}
              >
                <FacebookIcon />
              </IconLink>
              <IconLink
                className="navbar-item is-hidden-mobile"
                url={getSocialLinkUrl('Youtube')}
                onClick={() => setNavbarActive(false)}
                reverse={navbarStyle === 2}
              >
                <YoutubeIcon />
              </IconLink>
            </div>
          </LogoTwitterWrapperStyled>
        </NavbarBrandStyled>

        <NavbarMenuStyled
          className={`navbar-menu ${navbarMenuActive ? 'is-active' : ''}`}
        >
          <NavbarStartStyled className="navbar-start">
            {menu.links.map(link => (
              <LinkStyled
                key={link.path}
                className="navbar-item"
                url={link.path}
                onClick={() => setNavbarActive(false)}
              >
                {link.title}
              </LinkStyled>
            ))}
            <LangSwitcherContainerStyled className="is-hidden-desktop">
              <LangSwitcher color={theme.fluorescentOrange} />
            </LangSwitcherContainerStyled>
          </NavbarStartStyled>
          <NavbarEndStyled className="navbar-end">
            <IconLink
              className="navbar-item"
              url={getSocialLinkUrl('Twitter')}
              onClick={() => setNavbarActive(false)}
              reverse={navbarStyle === 2}
            >
              <TwitterIcon />
            </IconLink>
            <IconLink
              className="navbar-item"
              url={getSocialLinkUrl('Instagram')}
              onClick={() => setNavbarActive(false)}
              reverse={navbarStyle === 2}
            >
              <InstagramIcon />
            </IconLink>
            <IconLink
              className="navbar-item"
              url={getSocialLinkUrl('Facebook')}
              onClick={() => setNavbarActive(false)}
              reverse={navbarStyle === 2}
            >
              <FacebookIcon />
            </IconLink>
            <IconLink
              className="navbar-item"
              url={getSocialLinkUrl('Youtube')}
              onClick={() => setNavbarActive(false)}
              reverse={navbarStyle === 2}
            >
              <YoutubeIcon />
            </IconLink>

            <LangSwitcherContainerStyled>
              <LangSwitcher
                hasLightBackground={navbarStyle === 1}
                color={theme.officeGreen}
              />
            </LangSwitcherContainerStyled>
          </NavbarEndStyled>
        </NavbarMenuStyled>
      </ContainerStyled>
    </NavbarStyled>
  );
};

Header.propTypes = {
  isTransparent: PropTypes.bool.isRequired,
  menu: PropTypes.shape({
    links: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  socialLinks: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        platform: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Header;

export const query = graphql`
  fragment Header on Query {
    headerMenu: contentfulMenu(
      name: { eq: "Main menu" }
      node_locale: { eq: $locale }
    ) {
      links {
        title
        path
      }
    }
    headerSocialLinks: allContentfulSocialLink {
      nodes {
        platform
        url
      }
    }
  }
`;
