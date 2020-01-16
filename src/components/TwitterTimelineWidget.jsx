import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerStyled = styled.div`
  position: relative;

  iframe {
    z-index: 1;
  }
`;

const AdblockWarningStyled = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.8rem;
  text-align: center;
`;

const TwitterTimelineWidget = ({
  adblockMessage,
  adblockDetected,
  ...rest
}) => (
  <ContainerStyled {...rest}>
    {adblockDetected && (
      <AdblockWarningStyled style={{ opacity: 1 }}>
        {adblockMessage}
      </AdblockWarningStyled>
    )}
    <a
      className="twitter-timeline"
      data-dnt="false"
      data-height="100%"
      href="https://twitter.com/KarimaDelli"
    >
      Tweets by KarimaDelli
    </a>
  </ContainerStyled>
);

TwitterTimelineWidget.propTypes = {
  adblockMessage: PropTypes.string.isRequired,
  adblockDetected: PropTypes.bool.isRequired,
};

export default TwitterTimelineWidget;
