import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from '../Link';

const SectionStyled = styled.section`
  text-align: center;
`;

const LinkStyled = styled(Link)`
  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:hover {
    transition: opacity 230ms ease;
    opacity: 0.9;
  }
`;

const LogoStyled = styled.img`
  width: 100px;
`;

const Logos = ({ logos }) => (
  <SectionStyled className="section">
    {logos.map(({ url, image, title }) => (
      <LinkStyled key={url} url={url}>
        <LogoStyled src={image} alt={title} />
      </LinkStyled>
    ))}
  </SectionStyled>
);

Logos.propTypes = {
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Logos;
