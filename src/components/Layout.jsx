import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import { Provider as LangSwitchProvider } from './LangSwitcher';
import '../styles/app.scss';

const Layout = ({ data, children, pageContext }) => (
  <LangSwitchProvider
    locale={pageContext.locale}
    alternates={pageContext.alternates}
  >
    <Header
      menu={data.headerMenu}
      socialLinks={data.headerSocialLinks}
      isTransparent={pageContext.name === 'HomePage'}
    />
    {children}
    <Footer
      menu={data.footerMenu}
      content={data.footer}
      socialLinks={data.footerSocialLinks.nodes}
      {...data.footer}
    />
  </LangSwitchProvider>
);

Layout.propTypes = {
  pageContext: PropTypes.shape({
    name: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alternates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    headerMenu: PropTypes.shape({}).isRequired,
    headerSocialLinks: PropTypes.shape({}).isRequired,
    page: PropTypes.shape({}).isRequired,
    footerMenu: PropTypes.shape({}).isRequired,
    footer: PropTypes.shape({}).isRequired,
    footerSocialLinks: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
