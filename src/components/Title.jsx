import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TitleStyled = styled.div`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  text-transform: uppercase;
  text-align: center;
`;

const SectionTitleStyled = styled(TitleStyled)`
  font-size: 2rem;
  line-height: 2rem;
`;

const PageTitleStyled = styled(TitleStyled)`
  font-size: 2.5rem;
  line-height: 2.5rem;
`;

const SectionTitle = ({ section, page, children, as, ...rest }) => {
  let Component = TitleStyled;

  if (section) {
    Component = SectionTitleStyled;
  } else if (page) {
    Component = PageTitleStyled;
  }

  return (
    <Component as={as} {...rest}>
      {children}
    </Component>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  section: PropTypes.bool,
  page: PropTypes.bool,
  as: PropTypes.oneOf(['h1', 'h2', 'h3']),
};

SectionTitle.defaultProps = {
  as: null,
  section: false,
  page: false,
};

export default SectionTitle;
