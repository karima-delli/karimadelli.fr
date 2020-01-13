import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const TwitterMetdata = ({ card, site, title, description, imageUrl }) => (
  <Helmet>
    <meta name="twitter:card" content={card} />
    <meta name="twitter:site" content={site} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {imageUrl && <meta property="twitter:image" content={imageUrl} />}
  </Helmet>
);

TwitterMetdata.propTypes = {
  card: PropTypes.string,
  site: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

TwitterMetdata.defaultProps = {
  card: 'card',
  imageUrl: null,
};

export default TwitterMetdata;
