/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import smoothscroll from 'smoothscroll-polyfill';
import 'whatwg-fetch';
import theme from './src/styles/styledComponentsTheme.module.scss';

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  // See https://github.com/timhagn/gatsby-background-image/tree/master/packages/gatsby-background-image#readme
  // See #2 https://github.com/gatsbyjs/gatsby/issues/4021#issuecomment-445238511
  if (typeof window.IntersectionObserver === 'undefined') {
    import('intersection-observer');
  }

  smoothscroll.polyfill();
};

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);
