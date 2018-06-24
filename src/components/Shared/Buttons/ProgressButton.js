import React from 'react';
import InfinityIcon from '../Icons/InfinityIcon';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';

const duration = 500;
const iconWidth = 50;

const defaultStyle = {
  transition: `width ${duration}ms ease-in-out`,
  position: 'relative',
  width: 'auto'
}

const transitionStyles = {
  entering: { width: iconWidth + 10 },
  entered: { width: iconWidth + 10 },
};

const iconStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 1,
  margin: '0 5px'
}

const ProgressButton = ({ children, isLoading, ...rest }) => (
  <Transition in={isLoading} timeout={duration}>
    {(state) => (<button {...rest} style={{
      ...defaultStyle,
      ...transitionStyles[state]
    }} >
      <TransitionGroup >
        {!isLoading &&
          <CSSTransition timeout={duration} unmountOnExit classNames="fade-in">
            <div>
              {children}
            </div>
          </CSSTransition>}

        {isLoading && <CSSTransition timeout={duration} unmountOnExit classNames="fade-in">
          <InfinityIcon style={iconStyle} width={iconWidth} height='100%' dur={7} />
        </CSSTransition>}
      </TransitionGroup>
    </button >)}
  </Transition>
);

export default ProgressButton;