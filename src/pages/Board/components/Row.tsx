import * as React from 'react';
import { Cell } from './Cell';
import styled from '../../../theme';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 80px;
`;

interface IProps {
  alternate: boolean;
  cells: any[];
  highlight: boolean;
  king: boolean;
  onClick: () => void;
  rowIndex: number;
  selected: boolean;
}
export function Row(props: IProps) {
  return (
    <Container>
      {Array.from({ length: 8 }).map((_, i) => (
        <Cell
          key={`cell:${i}`}
          {...props}
          value={
            props.cells[props.rowIndex * 8 + i] !== -1
              ? props.cells[props.rowIndex * 8 + i].color
              : null
          }
          alternate={!props.alternate ? Math.abs(i % 2) === 1 : i % 2 === 0}
        />
      ))}
    </Container>
  );
}
