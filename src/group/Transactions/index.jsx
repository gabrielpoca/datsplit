import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TransactionsForm from '../TransactionsForm';
import TransactionsList from '../TransactionsList';

import './index.css';

class Transactions extends React.Component {
  render() {
    const { path } = this.props.match;

    return (
      <Switch>
        <Route path={`${path}/transactions/new`}>
          <TransactionsForm {...this.props} />
        </Route>
        <Route>
          <TransactionsList {...this.props} />
        </Route>
      </Switch>
    );
  }
}

export default Transactions;
