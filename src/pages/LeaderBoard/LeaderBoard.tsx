import * as React from 'react';
import { connect } from 'react-redux';
import { ILeader } from '../../@types';
import * as actions from '../../data/actions';
import styled, { theme } from '../../theme';
import Container from '../../components/Container';

const BoardContainer = styled.div`
  margin-top: 70px
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  min-width: 100%;
  min-height: 500px;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
  text-transform: uppercase;
  color: ${theme.primaryColor};
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
        <HeaderRow>
          <span>Name</span>
          <span>Wins</span>
        </HeaderRow>
        {sortedLeaderBoard.map(leader => (
          <LeaderRow key={leader.name}>
            <span>{leader.name}</span>
            <span>{leader.wins}</span>
          </LeaderRow>
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
