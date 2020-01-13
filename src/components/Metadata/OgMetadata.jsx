import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const OgMetadata = ({
  siteName,
  type,
  title,
  description,
  url,
  locales,
  imageUrl,
}) => (
  <Helmet>
    <meta property="og:site_name" content={siteName} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    {locales.map(({ locale, current }) => (
      <meta
        key={locale}
        property={`og:locale${current ? '' : ':alternate'}`}
        content={locale}
      />
    ))}
    {imageUrl && <meta property="og:image" content={imageUrl} />}
  </Helmet>
);

OgMetadata.propTypes = {
  siteName: PropTypes.string.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  locales: PropTypes.arrayOf(
    PropTypes.shape({
      locale: PropTypes.string.isRequired,
      current: PropTypes.bool.isRequired,
    })
  ).isRequired,
  imageUrl: PropTypes.string,
};

OgMetadata.defaultProps = {
  type: 'website',
  imageUrl: null,
};

export default OgMetadata;
