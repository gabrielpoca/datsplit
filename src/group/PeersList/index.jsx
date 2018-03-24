import React from 'react';
import { Link } from 'react-router-dom';

import Balance from '../Balance';
import ButtonLink from '../../common/ButtonLink';
import Body from '../../common/Body';

import './index.css';

class PeersList extends React.Component {
  constructor() {
    super();

    this.renderPeer = this.renderPeer.bind(this);
  }

  renderBalance(balance) {
    if (balance.eq(0)) return <span>&euro; 0</span>;

    return (
      <span>
        <span styleName="balanceLabel">
          {balance.gt(0) ? 'gets back' : 'owns'}
        </span>{' '}
        &euro; {balance.abs().toString()}
      </span>
    );
  }

  renderPeer(peer) {
    const url = `${this.props.match.url}/peers/${peer.url.substring(6)}`;

    return (
      <li key={peer.url}>
        <Link to={url} styleName="item">
          <span styleName="name">{peer.name}</span>
          <Balance {...this.props} peer={peer}>
            {balance => this.renderBalance(balance)}
          </Balance>
        </Link>
      </li>
    );
  }

  render() {
    return (
      <div styleName="root">
        <Body.Actions>
          <ButtonLink>
            <Link to={`${this.props.match.url}/peers/new`}>Add Peer</Link>
          </ButtonLink>
        </Body.Actions>
        <ul styleName="list">
          {this.props.peers.map(peer => this.renderPeer(peer))}
        </ul>
      </div>
    );
  }
}

export default PeersList;
