import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyLink from 'gatsby-link';
import { localesEnabled } from '../../i18n.config';

export const Context = createContext();

export const Provider = ({ lang, alternates, children }) => (
  <Context.Provider value={{ lang, alternates }}>{children}</Context.Provider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  lang: PropTypes.string.isRequired,
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
  const { lang, alternates } = useContext(Context);

  const alternate = alternates.find(({ current }) => !current);

  if (!alternate) {
    return <></>;
  }

  const { path: alternateUrl } = alternate;
  const langs = Object.keys(localesEnabled);

  return (
    <ContainerStyled
      className={`${hasLightBackground ? 'has-light-background' : ''}`}
    >
      <GatsbyLink to={alternateUrl} onClick={onClick}>
        {langs.map((aLang) => (
          <LangStyled
            key={aLang}
            color={color}
            className={`${lang === aLang ? 'is-current' : ''}`}
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
