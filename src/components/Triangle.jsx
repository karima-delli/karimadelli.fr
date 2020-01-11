import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

const PolygonStyled = styled.polygon`
  fill: ${({ color }) => color};
`;

const Triangle = ({ color, direction, ...rest }) => {
  const theme = useContext(ThemeContext);

  const width = 320;
  const angleDegrees = theme.angle;
  const angleRadians = angleDegrees * (Math.PI / 180);
  const height = Math.round(
    Math.sin(angleRadians) * (width / Math.cos(angleRadians))
  );

  const points = [];
  points.push('0,0');
  points.push(`${width},0`);

  if (direction === 'left') {
    points.push(`0,${height}`);
  } else {
    points.push(`${width},${height}`);
  }

  return (
    <svg version="1.1" viewBox={`0 0 ${width} ${height}`} {...rest}>
      <PolygonStyled points={points.join(' ')} fill={color} />
    </svg>
  );
};

Triangle.propTypes = {
  color: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['right', 'left']).isRequired,
};

export default Triangle;
