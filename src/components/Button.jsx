import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import Link from './Link';

const ButtonBaseStyled = styled(Link)`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  padding: 0.5rem 1rem;
  display: inline-block;
  margin: auto;
  margin-bottom: 1rem;
  color: ${({ color }) => color};
  text-transform: uppercase;

  &:hover {
    transition: all 230ms ease;
    color: ${({ color }) => lighten(0.1, color)};
  }
`;

const ButtonDefaultStyled = styled(ButtonBaseStyled)`
  background-color: ${({ background }) => background};

  &:hover {
    background-color: ${({ background }) => lighten(0.1, background)};
  }
`;

const ButtonUnderlinedStyled = styled(ButtonBaseStyled)`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 1rem;
    right: 1rem;
    height: 2px;
    background: ${({ color }) => color};
  }

  &:hover {
    &::after {
      background: ${({ color }) => lighten(0.1, color)};
    }
  }
`;

const Button = ({ title, url, color, background, underlined }) => {
  let Component = ButtonDefaultStyled;

  if (underlined) {
    Component = ButtonUnderlinedStyled;
  }

  return (
    <Component url={url} color={color} background={background}>
      {title}
    </Component>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  background: PropTypes.string,
  underlined: PropTypes.bool,
};

Button.defaultProps = {
  background: null,
  underlined: false,
};

export default Button;
