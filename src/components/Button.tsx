import * as React from 'react';
import styled from '../theme';

const SubmitContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  outline: none;
  text-decoration: none;
  color: #fff;
  background: #32325d;
  white-space: nowrap;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.025em;
  text-decoration: none;
  transition: all 150ms ease;
  margin-left: 12px;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    background-color: #43458b;
  }
`;

interface IProps {
  onClick?: () => void;
  text: string;
}

export default function Button({ onClick, text }: IProps) {
  return (
    <SubmitContainer>
      <SubmitButton onClick={onClick}>{text}</SubmitButton>
    </SubmitContainer>
  );
}
