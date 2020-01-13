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
      header={data.header}
      socialLinks={data.headerSocialLinks}
      isTransparent={pageContext.name === 'HomePage'}
    />
    {children}
    <Footer footer={data.footer} socialLinks={data.footerSocialLinks} />
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
    header: PropTypes.shape({}).isRequired,
    headerSocialLinks: PropTypes.shape({}).isRequired,
    page: PropTypes.shape({}).isRequired,
    footer: PropTypes.shape({}).isRequired,
    footerSocialLinks: PropTypes.shape({}).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
