import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from '../../../theme';

interface IScreenProps {
  children?: React.ReactChild;
  className?: string;
  winner: boolean;
}
function Screen({ children, className }: IScreenProps) {
  return <div className={className}>{children}</div>;
}

const ColoredScreen = styled(Screen)`
  background: ${props => (props.winner ? '#4CAF50' : '#f44336')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  height: 100%;
  width: 100%;
`;

const Text = styled(Link)`
  position: relative;
  text-transform: uppercase;
  font-size: 20px;
  text-decoration: none;
  color: #fff;
  &::after,
  &::before {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    height: 2px;
    overflow: hidden;
    background: #fff;
    z-index: 0;
    transform-origin: bottom-left;
    transition: transform 400ms cubic-bezier(1, 0, 0, 1) 0ms;
  }
  &::before {
    background: #32325d;
    bottom: 8px;
    top: 8px;
    height: auto;
    opacity: 0.5;
    left: -5px;
    right: -5px;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition-duration: 400ms;
  }
  &:hover::before {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  &:hover::after {
    transform: scaleX(0);
    transform-origin: bottom right;
    transition-duration: 400ms;
  }
`;

interface IProps {
  winner: boolean;
}

export function EndScreen({ winner }: IProps) {
  return (
    <ColoredScreen winner={winner}>
      <Text to="/">{winner ? 'Winner, Winner!' : 'Try again next time'}</Text>
    </ColoredScreen>
  );
}
