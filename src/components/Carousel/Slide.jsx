import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SlideWrapperStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 750ms ease;

  &.is-current {
    opacity: 1;
  }
`;

const Slide = ({ children, ...rest }) => {
  return <SlideWrapperStyled {...rest}>{children}</SlideWrapperStyled>;
};

Slide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Slide;
