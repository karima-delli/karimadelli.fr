import React from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

const Link = ({ url, children, ...rest }) => {
  const fixedUrl = `${url === 'home' ? '' : url}`;
  const isExternal = url.substr(0, 4) === 'http';

  if (isExternal) {
    return (
      <a href={fixedUrl} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <GatsbyLink to={fixedUrl} {...rest}>
      {children}
    </GatsbyLink>
  );
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Link.defaultProps = {
  children: null,
};

export default Link;
