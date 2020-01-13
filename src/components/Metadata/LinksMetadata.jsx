import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const LinksMetadata = ({ canonicalUrl, alternateLinks }) => (
  <Helmet>
    <link rel="canonical" href={canonicalUrl} />
    {alternateLinks.map(link => (
      <link
        key={link.lang}
        rel="alternate"
        hrefLang={link.lang}
        href={link.href}
      />
    ))}
  </Helmet>
);

LinksMetadata.propTypes = {
  canonicalUrl: PropTypes.string.isRequired,
  alternateLinks: PropTypes.arrayOf(
    PropTypes.shape({
      lang: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

LinksMetadata.defaultProps = {};

export default LinksMetadata;
