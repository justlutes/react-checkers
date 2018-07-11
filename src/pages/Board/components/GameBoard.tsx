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
  gameState: IGameState;
  handleMove: (f: string, t: string) => void;
  onStartMove: (d: string) => void;
  role: ColorValues;
}

export class GameBoard extends React.Component<IProps, {}> {
  public renderRow = () => {
    const { handleMove, gameState, onStartMove } = this.props;
    const { auxiliary = [], cells, turn } = gameState;
    return (
      <React.Fragment>
        {Array.from({ length: 8 }).map((_, i) => (
          <Row
            alternate={Math.abs(i % 2) === 1}
            auxiliary={auxiliary}
            key={`row:${i}`}
            handleMove={handleMove}
            onStartMove={onStartMove}
            role={this.props.role}
            rowIndex={i}
            cells={cells}
            turn={turn}
          />
        ))}
      </React.Fragment>
    );
  };
  public render() {
    return <BoardContainer>{this.renderRow()}</BoardContainer>;
  }
}
