import React from 'react';
import InfinityIcon from '../Icons/InfinityIcon';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';

const duration = 500;
const iconWidth = 50;

const defaultStyle = {
  position: 'relative',
}

const iconStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 1,
  margin: '0 auto',
  right: 0,
}

const ProgressButton = ({ children, style, isLoading, ...rest }) => (
  <button {...rest} style={{
    ...defaultStyle,
    ...style
  }} >
    <TransitionGroup >
      {!isLoading &&
        <CSSTransition timeout={duration} unmountOnExit classNames="fade-in">
          <div>
            {children}
          </div>
        </CSSTransition>}

      {isLoading && <CSSTransition timeout={duration} unmountOnExit classNames="fade-out">
        <InfinityIcon style={iconStyle} width={iconWidth} height='100%' dur={7} />
      </CSSTransition>}
    </TransitionGroup>
  </button >
);

export default ProgressButton;