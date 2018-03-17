import React from 'react';
import Big from 'big.js';

export default class Balance extends React.PureComponent {
  render() {
    const { transactions, peer } = this.props;

    const balance = transactions.reduce((memo, t) => {
      if (t.to === peer.url) {
        return memo.minus(Big(t.amount).round(2));
      } else if (t.from === peer.url) {
        return memo.plus(Big(t.amount).round(2));
      }

      return memo;
    }, Big(0));

    return this.props.children(balance);
  }
}
