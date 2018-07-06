import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../data/actions';

export function mapDispatchToProps(dispatch: any) {
  return {
    updateLeader: () => dispatch(actions.UpdateLeadersAction),
  };
}

interface IProps {
  updateLeader: any;
}

function Board({ updateLeader }: IProps) {
  return (
    <main>
      <h1>
        Board <i className="material-icons">board</i>
      </h1>
    </main>
  );
}

export default connect(mapDispatchToProps)(Board);
