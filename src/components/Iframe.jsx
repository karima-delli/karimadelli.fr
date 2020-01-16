import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getYouTubeId from 'get-youtube-id';

const ContainerStyled = styled.div`
  position: relative;
  overflow: hidden;
`;

const ResponsiveContainerStyled = styled(ContainerStyled)`
  height: 0;
  width: 100%;
  padding-bottom: ${({ percentage }) => percentage}%;
`;

const ContainerWidthFixedDimensionsStyled = styled(ContainerStyled)`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const IframeStyled = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Iframe = ({ url, title, width, height, ...rest }) => {
  let src = url;
  let Container;

  const youtubeId = getYouTubeId(url);

  if (youtubeId) {
    src = `https://www.youtube.com/embed/${youtubeId}`;
  }

  let ratio = 9 / 16;

  if (width && height) {
    ratio = width / height;
    Container = ContainerWidthFixedDimensionsStyled;
  } else {
    Container = ResponsiveContainerStyled;
  }

  const percentage = Math.round(ratio * 10000) / 100;

  return (
    <Container percentage={percentage} width={width} height={height} {...rest}>
      <IframeStyled
        title={title}
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Container>
  );
};

Iframe.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

Iframe.defaultProps = {
  width: null,
  height: null,
};

export default Iframe;
