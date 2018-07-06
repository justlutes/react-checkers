import * as React from 'react';
import { ILeader } from '../../../@types';
import styled, { theme } from '../../../theme';

const Title = styled.h3`
  text-transform: uppercase;
  color: ${theme.primaryColor};
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LeaderRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const HeaderRow = LeaderRow.extend`
  margin-top: 10px;
  margin-bottom: 10px;
`;

interface IProps {
  leaderBoard: ILeader[];
}

export class LeaderBoard extends React.PureComponent<IProps, {}> {
  public renderLeaderBoard = () => {
    return (
      <Layout>
        <HeaderRow>
          <span>Name</span>
          <span>Wins</span>
        </HeaderRow>
        {this.props.leaderBoard.map(leader => (
          <LeaderRow key={leader.name}>
            <span>{leader.name}</span>
            <span>{leader.wins}</span>
          </LeaderRow>
        ))}
      </Layout>
    );
  };

  public render() {
    return (
      <div>
        <Title>Current Leaderboard</Title>
        {this.props.leaderBoard.length ? this.renderLeaderBoard() : <p>No users registered yet!</p>}
      </div>
    );
  }
}
