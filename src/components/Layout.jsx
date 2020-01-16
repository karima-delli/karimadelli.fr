import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import { Provider as LangSwitchProvider } from './LangSwitcher';
import '../styles/app.scss';

const Layout = ({ data, children, pageContext, location }) => (
  <LangSwitchProvider
    lang={pageContext.lang}
    alternates={pageContext.alternates}
  >
    <Header
      header={data.header}
      socialLinks={data.headerSocialLinks}
      isTransparent={pageContext.name === 'Home'}
      currentPath={location.pathname}
    />
    {children}
    <Footer footer={data.footer} socialLinks={data.footerSocialLinks} />
  </LangSwitchProvider>
);

Layout.propTypes = {
  pageContext: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alternates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    header: PropTypes.shape({}).isRequired,
    headerSocialLinks: PropTypes.shape({}).isRequired,
    footer: PropTypes.shape({}).isRequired,
    footerSocialLinks: PropTypes.shape({}).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
