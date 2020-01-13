import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import Link from './Link';

const LogoStyled = styled.div``;

const LinkStyled = styled(Link)`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  position: relative;
  display: inline-block;
  padding: 0.3rem 0.7rem;
  text-transform: uppercase;
  color: ${({ reverse, theme }) => (reverse ? theme.officeGreen : theme.white)};
  transition: color 230ms ease;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transform: rotate(-${({ theme }) => theme.angle}deg);
    background-color: ${({ reverse, theme }) =>
      reverse ? theme.white : theme.officeGreen};
    transition: background-color 230ms ease;
  }

  &:hover {
    color: ${({ reverse, theme }) =>
      reverse ? lighten(0.05, theme.officeGreen) : theme.white};
    &::before {
      background: ${({ reverse, theme }) =>
        reverse ? theme.white : lighten(0.05, theme.officeGreen)};
    }
  }
`;

const Logo = ({ url, reverse, ...rest }) => (
  <LogoStyled {...rest}>
    <LinkStyled url={url} reverse={reverse ? 1 : undefined}>
      Karima Delli
    </LinkStyled>
  </LogoStyled>
);

Logo.propTypes = {
  url: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
};

Logo.defaultProps = {
  reverse: false,
};

export default Logo;
