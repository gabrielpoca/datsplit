import React from 'react';

import Button from '../../common/Button';

import './index.css';

export default class Transaction extends React.PureComponent {
  name(url) {
    if (url === this.props.myURL) {
      return <span styleName="you">You</span>;
    }

    const found = this.props.peers.find(p => p.url === url);

    if (!found) return 'Does not have a name yet';

    return found.name;
  }

  date() {
    const date = new Date(this.props.date);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  amount() {
    return `${this.props.amount} ${this.props.currency}`;
  }

  renderApprove() {
    const { toApproveByMe, id } = this.props;

    if (!toApproveByMe) {
      return;
    }

    return (
      <Button alternative>
        <button
          styleName="action"
          onClick={() => this.props.onApproveTransaction(id)}
        >
          Approve
        </button>
      </Button>
    );
  }

  render() {
    const { description, from, to, date, toApproveByMe } = this.props;

    let className = 'root';

    if (toApproveByMe) className += ' toApprove';

    return (
      <div styleName={className}>
        <div styleName="date">
          <time styleName="label" dateTime={date}>
            {this.date()}
          </time>
          <div styleName="description">{description}</div>
        </div>
        <div styleName="from">
          <div styleName="label">paid by {this.name(from)}</div>
          <div styleName="description">{this.amount()}</div>
        </div>
        <div styleName="to">
          <div styleName="label">lent to</div>
          <div styleName="description">{this.name(to)}</div>
        </div>
        <span styleName="actions">{this.renderApprove()}</span>
      </div>
    );
  }
}
