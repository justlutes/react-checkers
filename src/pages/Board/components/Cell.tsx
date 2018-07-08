import * as React from 'react';
import { ActiveChecker } from './ActiveChecker';
import { Checker } from './Checker';
import styled from '../../../theme';
import Droppable from '../../../components/Droppable';
import { ColorValues } from '../../../enum';

interface IBaseProps {
  alternate: boolean;
  highlight: boolean;
  children?: React.ReactChild | null;
  className?: string;
}
const CellBase: React.SFC<IBaseProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const CellColor = styled(CellBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  opacity: ${props => (props.highlight ? '.55' : '1')};
  background: ${props => (props.highlight ? '#34A853' : props.alternate ? '#777' : '#f4f4f4')};
`;

interface IProps {
  alternate: boolean;
  cellIndex: number;
  handleMove: (f: string, t: string) => void;
  onStartMove: (d: string) => void;
  highlight: boolean;
  king: boolean;
  role: ColorValues;
  selected: boolean;
  value: 'black' | 'red' | null;
}

export function Cell({
  alternate,
  cellIndex,
  handleMove,
  highlight,
  king,
  onStartMove,
  role,
  selected,
  value,
}: IProps) {
  // const classNames = ['cell', highlight ? 'highlight' : '', selected ? 'selected' : ''];
  const data = JSON.stringify({ cellIndex });
  if (role === value) {
    return (
      <Droppable onDrop={handleMove} data={data}>
        <CellColor alternate={alternate} highlight={highlight}>
          {value && <ActiveChecker onStartMove={onStartMove} index={cellIndex} value={value} />}
        </CellColor>
      </Droppable>
    );
  }
  return (
    <Droppable onDrop={handleMove} data={data}>
      <CellColor alternate={alternate} highlight={highlight}>
        {value && <Checker value={value} />}
      </CellColor>
    </Droppable>
  );
}
