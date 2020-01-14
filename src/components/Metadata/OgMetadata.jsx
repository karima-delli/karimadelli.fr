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
    {siteName && <meta property="og:site_name" content={siteName} />}
    {type && <meta property="og:type" content={type} />}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {url && <meta property="og:url" content={url} />}
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
  siteName: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  locales: PropTypes.arrayOf(
    PropTypes.shape({
      locale: PropTypes.string.isRequired,
      current: PropTypes.bool.isRequired,
    })
  ),
  imageUrl: PropTypes.string,
};

OgMetadata.defaultProps = {
  siteName: null,
  type: 'website',
  title: null,
  description: null,
  url: null,
  locales: [],
  imageUrl: null,
};

export default OgMetadata;
