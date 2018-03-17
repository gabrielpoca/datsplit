import React from 'react';
import { reverse } from 'lodash';

import Heading from '../../common/Heading';
import Transaction from '../Transaction';

import './index.css';

export default class Peer extends React.PureComponent {
  render() {
    const { peers, match, transactions } = this.props;
    const peer = peers.find(p => p.url.endsWith(match.params.url));
    const peerTransactions = transactions.filter(
      t => t.to === peer.url || t.from === peer.url
    );

    return (
      <div styleName="root">
        <div styleName="title">
          <Heading kind="h2">{peer.name}</Heading>
        </div>

        <ul styleName="transactions">
          {reverse(peerTransactions).map(t => (
            <li key={t.id} styleName="item">
              <Transaction {...this.props} {...t} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
