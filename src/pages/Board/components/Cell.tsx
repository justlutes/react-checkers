import * as React from 'react';
import { Checker } from './Checker';
import styled from '../../../theme';

interface IBaseProps {
  children?: React.ReactChild | null;
  className?: string;
  alternate: boolean;
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
  background: ${props => (props.alternate ? '#777' : '#f4f4f4')};
`;

interface IProps {
  alternate: boolean;
  highlight: boolean;
  king: boolean;
  onClick: () => void;
  selected: boolean;
  value: 'black' | 'red' | null;
}

export function Cell({ alternate, highlight, king, onClick, selected, value }: IProps) {
  // const classNames = ['cell', highlight ? 'highlight' : '', selected ? 'selected' : ''];

  return (
    <React.Fragment>
      <CellColor alternate={alternate}>{value && <Checker value={value} />}</CellColor>
    </React.Fragment>
  );
}
