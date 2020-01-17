import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerStyled = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 7px;
`;

const BarStyled = styled.div`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background: ${({ color }) => color};
`;

// eslint-disable-next-line react/display-name
const ReadingProgressBar = forwardRef(({ color, ...rest }, ref) => {
  const [percentage, setPercentage] = useState(0);

  const listener = () => {
    const box = ref.current.getBoundingClientRect();

    if (box.top < 0 && box.bottom > 0) {
      const value = Math.round((-box.top / box.height) * 10000) / 100;

      setPercentage(value);
    } else {
      setPercentage(0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return (
    <ContainerStyled {...rest}>
      <BarStyled percentage={percentage} color={color} />
    </ContainerStyled>
  );
});

ReadingProgressBar.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ReadingProgressBar;
