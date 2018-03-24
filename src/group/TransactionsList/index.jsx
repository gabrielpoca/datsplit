import React from 'react';
import { Link } from 'react-router-dom';
import { reverse } from 'lodash';

import Body from '../../common/Body';
import Button from '../../common/Button';
import Transaction from '../Transaction';

import './index.css';

class TransactionsList extends React.Component {
  render() {
    const transactions = this.props.transactions || [];

    return (
      <React.Fragment>
        <Body.Actions>
          <Button>
            <Link to={`${this.props.match.url}/transactions/new`}>
              Add Expense
            </Link>
          </Button>
        </Body.Actions>
        <ul styleName="root">
          {reverse(transactions).map(t => (
            <li key={t.id} styleName="item">
              <Transaction {...this.props} {...t} />
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default TransactionsList;
