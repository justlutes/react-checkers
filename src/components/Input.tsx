import * as React from 'react';
import styled from '../theme';

const InputRow = styled.div`
  display: flex;
  border-bottom: none;
  padding: 4px 0;
  max-width: 600px;
`;

const Label = styled.label`
  display: block;
  color: #424770;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: normal;
  line-height: 26px;
  margin-right: 20px;
  align-self: center;
  flex: 32%;
  text-transform: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.1s ease-out;
`;

const StyledInput = styled.input`
  display: block;
  border: none;
  outline: none;
  border-radius: 4px;
  color: #32325d;
  font-weight: 400;
  font-size: 17px;
  line-height: 26px;
  transition: background-color 0.1s ease-in, color 0.1s ease-in;
  align-self: center;
  background-color: #f6f9fc;
  padding: 5px 20px 8px 13px;
  flex: 68%;
  width: auto;
  box-shadow: 0 0 0 1px #e4effa;
  &:focus {
    box-shadow: 0 0 0 1px #ffa27b;
  }
`;

interface IProps {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

export default function Input({ onChange, label, id, placeholder, type = 'text' }: IProps) {
  return (
    <InputRow>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput id={id} type={type} onChange={onChange} placeholder={placeholder} />
    </InputRow>
  );
}
