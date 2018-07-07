import * as React from 'react';
import styled from '../../../theme';
import { IGameState } from '../../../@types';
import { Row } from './Row';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

interface IProps {
  initialState: IGameState;
  role: 'black' | 'red';
}

export class GameBoard extends React.Component<IProps, {}> {
  public renderRow = () => {
    const { initialState } = this.props;
    const { auxiliary = [], cells, selected } = initialState;
    return (
      <React.Fragment>
        {Array.from({ length: 8 }).map((_, i) => (
          <Row
            alternate={Math.abs(i % 2) === 1}
            key={`row:${i}`}
            highlight={auxiliary.indexOf(i) !== -1}
            king={cells[i] !== -1 ? cells[i].king : false}
            rowIndex={i}
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
