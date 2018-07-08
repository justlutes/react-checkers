import * as React from 'react';
import styled from '../../../theme';
import Draggable from '../../../components/Draggable';
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
  cursor: pointer;
  background: ${props => (props.value === 'red' ? '#CC0000' : '#000')};
`;

interface IProps {
  onStartMove: (d: string) => void;
  index: number;
  king: boolean;
  value: ColorValues;
}

export function ActiveChecker({ onStartMove, index, king, value }: IProps) {
  const data = JSON.stringify({ cellIndex: index, value });
  return (
    <Draggable handleDrag={onStartMove} data={data}>
      {king ? <King value={value} /> : <StyledChecker value={value} />}
    </Draggable>
  );
}
