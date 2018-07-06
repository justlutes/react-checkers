import * as React from 'react';
import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
import { StoreState } from '../../@types';
import * as actions from '../../data/actions';

export function mapStateToProps({ leaderBoard }: StoreState) {
  return {
    leaderBoard,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    fetchLeaderBoard: () => dispatch(actions.FetchLeadersAction()),
  };
}

interface IProps {
  fetchLeaderBoard: any;
}

function Home({ fetchLeaderBoard }: IProps) {
  fetchLeaderBoard();
  return (
    <main>
      <h1>
        Home <i className="material-icons">face</i>
      </h1>
    </main>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
