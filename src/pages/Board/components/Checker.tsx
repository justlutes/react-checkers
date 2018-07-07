import * as React from 'react';
import styled from '../../../theme';

interface IBaseProps {
  className?: string;
  value: 'black' | 'red';
}

const CheckerBase: React.SFC<IBaseProps> = ({ className, value }) => <div className={className} />;

const StyledChecker = styled(CheckerBase)`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 4px solid white;
  cursor: pointer;
  background: ${props => (props.value === 'red' ? '#CC0000' : '#000')};
`;

interface IProps {
  value: 'black' | 'red';
}

export function Checker({ value }: IProps) {
  return <StyledChecker value={value} />;
}
