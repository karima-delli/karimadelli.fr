import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const TextMarkdown = ({ children, ...rest }) => (
  <ReactMarkdown source={children} {...rest} />
);

TextMarkdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TextMarkdown;
