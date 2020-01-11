import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import Link from './Link';

const IconLinkStyled = styled(Link)`
  padding: 0 !important;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 230ms ease;
  background: ${({ reverse, theme }) =>
    reverse ? theme.white : theme.officeGreen} !important;
  color: ${({ reverse, theme }) =>
    reverse ? theme.officeGreen : theme.white} !important;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  &:hover {
    background: ${({ reverse, theme }) =>
      reverse ? theme.white : lighten(0.05, theme.officeGreen)} !important;
    color: ${({ reverse, theme }) =>
      reverse ? lighten(0.05, theme.officeGreen) : theme.white} !important;
  }
`;

const IconLink = ({ reverse, children, ...rest }) => (
  <IconLinkStyled {...rest} reverse={reverse ? 1 : undefined}>
    {children}
  </IconLinkStyled>
);

IconLink.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

IconLink.defaultProps = {
  reverse: false,
};

export default IconLink;
