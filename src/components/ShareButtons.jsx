import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import FacebookIcon from './Icons/Facebook';
import LinkedinIcon from './Icons/Linkedin';
import TwitterIcon from './Icons/Twitter';
import EmailIcon from './Icons/Email';

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
`;

const ShareButtonContainerStyled = styled.div`
  &:not(:last-child) {
    margin-right: 2rem;
  }

  button {
    padding: 0 !important;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 230ms ease;
    border: none;
    cursor: pointer;
    background: #e3e3e3;
    color: ${({ theme }) => theme.licorice};
    &:hover {
      background: ${lighten(0.05, '#e3e3e3')};
      color: ${({ theme }) => lighten(0.05, theme.licorice)};
    }
  }
`;

const ShareButtons = ({ url }) => (
  <ContainerStyled>
    <ShareButtonContainerStyled>
      <FacebookShareButton url={url} resetButtonStyle={false}>
        <FacebookIcon />
      </FacebookShareButton>
    </ShareButtonContainerStyled>
    <ShareButtonContainerStyled>
      <TwitterShareButton url={url} resetButtonStyle={false}>
        <TwitterIcon />
      </TwitterShareButton>
    </ShareButtonContainerStyled>
    <ShareButtonContainerStyled>
      <EmailShareButton url={url} resetButtonStyle={false}>
        <EmailIcon />
      </EmailShareButton>
    </ShareButtonContainerStyled>
    <ShareButtonContainerStyled>
      <LinkedinShareButton url={url} resetButtonStyle={false}>
        <LinkedinIcon />
      </LinkedinShareButton>
    </ShareButtonContainerStyled>
  </ContainerStyled>
);

ShareButtons.propTypes = {
  url: PropTypes.string.isRequired,
};

ShareButtons.defaultProps = {};

export default ShareButtons;
