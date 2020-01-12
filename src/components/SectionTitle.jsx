import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TitleStyled = styled.h2`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  text-transform: uppercase;
  font-size: 2rem;
  text-align: center;
  line-height: 2rem;
`;

const SectionTitle = ({ children, ...rest }) => (
  <TitleStyled {...rest}>{children}</TitleStyled>
);

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionTitle;
