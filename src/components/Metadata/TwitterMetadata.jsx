import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const TwitterMetadata = ({ card, site, title, description, imageUrl }) => (
  <Helmet>
    {card && <meta name="twitter:card" content={card} />}
    {site && <meta name="twitter:site" content={site} />}
    {title && <meta name="twitter:title" content={title} />}
    {description && <meta name="twitter:description" content={description} />}
    {imageUrl && <meta property="twitter:image" content={imageUrl} />}
  </Helmet>
);

TwitterMetadata.propTypes = {
  card: PropTypes.string,
  site: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};

TwitterMetadata.defaultProps = {
  card: 'card',
  site: null,
  title: null,
  description: null,
  imageUrl: null,
};

export default TwitterMetadata;
