import * as React from 'react';
import styled, { theme } from '../theme';

const StyledInput = styled.input`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 0 10px
  border: none;
  font-size: 14px;
  border-bottom: 1px solid ${theme.primaryColor};
  color: #777;
  display: inline-block;
  background: rgba(50, 50, 93, 0.1);
  padding: 0.4rem;
  border-radius: 0;
  &:focus {
    outline: none;
  }
`;

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

export default function Input({ onChange, placeholder, type = 'text' }: IProps) {
  return <StyledInput type={type} onChange={onChange} placeholder={placeholder} />;
}
