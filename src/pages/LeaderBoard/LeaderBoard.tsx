import * as React from 'react';
import { connect } from 'react-redux';
import { ILeader } from '../../@types';
import * as actions from '../../data/actions';
import styled, { theme } from '../../theme';
import Container from '../../components/Container';

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 3em 0;
  padding: 0;
  background: #ffffff;
  min-width: 100%;
  min-height: 500px;
  border-radius: 4px;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
`;

const BoardCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-grow: 1;
  width: 50%;
  padding: 0.8em 1.2em;
  overflow: hidden;
  list-style: none;
  border-bottom: 1px solid #777;
  &:nth-child(odd) {
    border-right: 1px solid #777;
  }
`;

const TitleCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-grow: 1;
  width: 50%;
  padding: 0.8em 1.2em;
  overflow: hidden;
  list-style: none;
  border-bottom: 1px solid #777;
`;

const Title = styled.h3`
  text-transform: uppercase;
  color: ${theme.primaryColor};
`;

export function mapStateToProps({ leaderBoard }: any) {
  return {
    leaderBoard: leaderBoard.leaderBoard,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    fetchLeaderBoard: () => dispatch(actions.FetchLeadersAction()),
  };
}

interface IProps {
  leaderBoard: ILeader[];
  fetchLeaderBoard: any;
}

class LeaderBoard extends React.PureComponent<IProps, {}> {
  public componentDidMount() {
    this.props.fetchLeaderBoard();
  }
  public renderLeaderBoard = () => {
    const sortedLeaderBoard = this.props.leaderBoard.sort((a, b) => b.wins - a.wins);
    return (
      <BoardContainer>
        <TitleCell>
          <Title>Name</Title>
        </TitleCell>
        <TitleCell>
          <Title>Wins</Title>
        </TitleCell>
        {sortedLeaderBoard.map(leader => (
          <React.Fragment key={leader.name}>
            <BoardCell>{leader.name}</BoardCell>
            <BoardCell>{leader.wins}</BoardCell>
          </React.Fragment>
        ))}
      </BoardContainer>
    );
  };

  public render() {
    return (
      <Container>
        <Title>Current Leaderboard</Title>
        {this.props.leaderBoard.length ? (
          this.renderLeaderBoard()
        ) : (
          <BoardContainer>
            <p>No users registered yet!</p>
          </BoardContainer>
        )}
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeaderBoard);
