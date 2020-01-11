import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const timeout = 350;

const TransitionGroupStyled = styled(TransitionGroup)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .fade-enter-active {
    z-index: 1;
  }

  .fade-enter-active,
  .fade-exit-active {
    transition: all ${timeout}ms ease-in-out;
  }

  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0.5;
  }

  .slide-enter-active {
    z-index: 1;
  }

  .slide-enter-active,
  .slide-exit-active {
    transition: all ${timeout}ms ease-in-out;
  }

  &.from-right .slide-enter {
    opacity: 0;
    transform: translateX(50%);
  }
  &.from-right .slide-enter-active {
    transform: translateX(0);
    opacity: 1;
  }
  &.from-right .slide-exit {
    position: absolute;
    top: 0;
    transform: translateX(0);
    opacity: 1;
  }
  &.from-right .slide-exit-active {
    opacity: 0;
    transform: translateX(-30%);
  }

  &.from-left .slide-enter {
    opacity: 0;
    transform: translateX(-50%);
  }
  &.from-left .slide-enter-active {
    transform: translateX(0);
    opacity: 1;
  }
  &.from-left .slide-exit {
    position: absolute;
    top: 0;
    transform: translateX(0);
    opacity: 1;
  }
  &.from-left .slide-exit-active {
    opacity: 0;
    transform: translateX(30%);
  }
`;

const StepTransition = ({ children, id, transition, direction }) => (
  <TransitionGroupStyled className={direction}>
    <CSSTransition
      classNames={transition}
      key={id}
      timeout={{
        enter: timeout,
        exit: timeout,
      }}
    >
      {children}
    </CSSTransition>
  </TransitionGroupStyled>
);

StepTransition.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  transition: PropTypes.string.isRequired,
};

export default StepTransition;
