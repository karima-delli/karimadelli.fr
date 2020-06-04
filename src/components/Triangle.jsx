import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';

const PolygonStyled = styled.polygon`
  fill: ${({ color }) => color};
`;

const Triangle = ({ color, direction, reverse, ...rest }) => {
  const theme = useTheme();

  const width = 320;
  const angleDegrees = theme.angle;
  const angleRadians = angleDegrees * (Math.PI / 180);
  const height = Math.round(
    Math.sin(angleRadians) * (width / Math.cos(angleRadians))
  );

  const points = [];
  if (!reverse) {
    points.push('0,0');
    points.push(`${width},0`);

    if (direction === 'left') {
      points.push(`0,${height}`);
    } else {
      points.push(`${width},${height}`);
    }
  } else {
    points.push(`0,${height}`);
    points.push(`${width},${height}`);
    if (direction === 'left') {
      points.push('0,0');
    } else {
      points.push(`${width},0`);
    }
  }

  return (
    <svg
      version="1.1"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      {...rest}
    >
      <PolygonStyled points={points.join(' ')} fill={color} />
    </svg>
  );
};

Triangle.propTypes = {
  color: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['right', 'left']).isRequired,
  reverse: PropTypes.bool,
};

Triangle.defaultProps = {
  reverse: false,
};

export default Triangle;
