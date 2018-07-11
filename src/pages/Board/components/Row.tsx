import * as React from 'react';
import { Cell } from './Cell';
import styled from '../../../theme';
import { ColorValues } from '../../../enum';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 80px;
`;

interface IProps {
  alternate: boolean;
  auxiliary: number[];
  cells: any[];
  handleMove: (f: string, t: string) => void;
  onStartMove: (d: string) => void;
  role: ColorValues;
  rowIndex: number;
  turn: ColorValues;
}
export function Row(props: IProps) {
  return (
    <Container>
      {Array.from({ length: 8 }).map((_, i) => {
        const cellIndex = props.rowIndex * 8 + i;
        return (
          <Cell
            key={`cell:${cellIndex}`}
            cellIndex={cellIndex}
            {...props}
            highlight={props.auxiliary.indexOf(cellIndex) !== -1}
            king={props.cells[cellIndex] !== -1 ? props.cells[cellIndex].king : false}
            value={props.cells[cellIndex] !== -1 ? props.cells[cellIndex].color : null}
            alternate={!props.alternate ? Math.abs(i % 2) === 1 : i % 2 === 0}
          />
        );
      })}
    </Container>
  );
}
