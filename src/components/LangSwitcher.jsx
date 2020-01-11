import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyLink from 'gatsby-link';

export const Context = createContext();

export const Provider = ({ locale, alternates, children }) => (
  <Context.Provider value={{ locale, alternates }}>{children}</Context.Provider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string.isRequired,
  alternates: PropTypes.arrayOf(
    PropTypes.shape({
      current: PropTypes.bool.isRequired,
      locale: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const ContainerStyled = styled.div`
  height: 25px;

  > a {
    height: 24px;
    line-height: 17px;
    display: block;
  }
`;

const LangStyled = styled.div`
  text-transform: uppercase;
  font-size: 0.7rem;
  display: inline-block;
  padding: 3px;
  font-weight: bold;
  transition: all 230ms ease;
  border: 1px solid ${({ theme }) => theme.white};

  ${ContainerStyled}.has-light-background & {
    border-color: ${({ color }) => color};
  }

  &:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    border-right: none;
  }

  &:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-left: none;
  }

  &,
  ${ContainerStyled}:hover &.is-current {
    background: ${({ theme }) => theme.white};
    color: ${({ color }) => color};
  }

  &.is-current,
  ${ContainerStyled}:hover &:not(.is-current) {
    background: ${({ color }) => color};
    color: ${({ theme }) => theme.white};
  }
`;

const LangSwitcher = ({ color, hasLightBackground, onClick }) => {
  const { locale, alternates } = useContext(Context);

  const { path: alternateUrl } = alternates.find(({ current }) => !current);
  const locales = ['fr', 'en'];

  return (
    <ContainerStyled
      className={`${hasLightBackground ? 'has-light-background' : ''}`}
    >
      <GatsbyLink to={alternateUrl} onClick={onClick}>
        {locales.map(aLang => (
          <LangStyled
            key={aLang}
            color={color}
            className={`${locale === aLang ? 'is-current' : ''}`}
          >
            {aLang}
          </LangStyled>
        ))}
      </GatsbyLink>
    </ContainerStyled>
  );
};

LangSwitcher.propTypes = {
  color: PropTypes.string.isRequired,
  hasLightBackground: PropTypes.bool,
  onClick: PropTypes.func,
};

LangSwitcher.defaultProps = {
  hasLightBackground: false,
  onClick: () => {},
};

export default LangSwitcher;
