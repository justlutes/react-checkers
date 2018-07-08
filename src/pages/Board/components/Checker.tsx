import * as React from 'react';
import styled from '../../../theme';
import { ColorValues } from '../../../enum';
import { King } from './King';

interface IBaseProps {
  className?: string;
  value: ColorValues;
}

const CheckerBase: React.SFC<IBaseProps> = ({ className, value }) => <div className={className} />;

const StyledChecker = styled(CheckerBase)`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 4px solid white;
  opacity: 0.55;
  background: ${props => (props.value === 'red' ? '#CC0000' : '#000')};
`;

interface IProps {
  king: boolean;
  value: ColorValues;
}

export function Checker({ king, value }: IProps) {
  return <div>{king ? <King value={value} /> : <StyledChecker value={value} />}</div>;
}
