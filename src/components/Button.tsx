import * as React from 'react';
import styled, { theme } from '../theme';

const SubmitContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const SubmitButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  background: ${theme.primaryColor};
  position: relative;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  color: #f8f8f8;
  text-decoration: none !important;
  font-size: 1rem;
  font-weight: 700;
`;

const ArrowContainer = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 30px;
  cursor: pointer;
`;

const Arrow = styled.i`
  transition: all 500ms cubic-bezier(1, 0, 0, 1) 0ms;
  ${SubmitButton}:hover & {
    opacity: 0;
    transform: translateX(60px);
  }
`;

const ArrowHover = styled.i`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-20px);
  transition: all 500ms cubic-bezier(1, 0, 0, 1) 0ms;
  opacity: 0;
  ${SubmitButton}:hover & {
    opacity: 1;
    transition-delay: 50ms;
    transform: translateX(0px);
  }
`;

interface IProps {
  onClick?: () => void;
  text: string;
}

export default function Button({ onClick, text }: IProps) {
  return (
    <SubmitContainer>
      <SubmitButton onClick={onClick}>
        <span>{text}</span>
        <ArrowContainer>
          <Arrow className="material-icons">arrow_right_alt</Arrow>
          <ArrowHover className="material-icons">arrow_right_alt</ArrowHover>
        </ArrowContainer>
      </SubmitButton>
    </SubmitContainer>
  );
}
