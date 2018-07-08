import * as React from 'react';
import styled from '../../../theme';
import { IGameState } from '../../../@types';
import { Row } from './Row';
import { ColorValues } from '../../../enum';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

interface IProps {
  handleMove: (f: string, t: string) => void;
  initialState: IGameState;
  onStartMove: (d: string) => void;
  role: ColorValues;
}

export class GameBoard extends React.Component<IProps, {}> {
  public renderRow = () => {
    const { handleMove, initialState, onStartMove } = this.props;
    const { auxiliary = [], cells, selected } = initialState;
    return (
      <React.Fragment>
        {Array.from({ length: 8 }).map((_, i) => (
          <Row
            alternate={Math.abs(i % 2) === 1}
            auxiliary={auxiliary}
            key={`row:${i}`}
            handleMove={handleMove}
            onStartMove={onStartMove}
            king={cells[i] !== -1 ? cells[i].king : false}
            rowIndex={i}
            role={this.props.role}
            selected={selected === i}
            onClick={() => console.error('row')}
            cells={cells}
          />
        ))}
      </React.Fragment>
    );
  };
  public render() {
    return <BoardContainer>{this.renderRow()}</BoardContainer>;
  }
}
