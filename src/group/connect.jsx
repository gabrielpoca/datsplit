import React from 'react';
import { values } from 'lodash';

import * as core from '../core';
import { datParamToUrl } from '../utils';

const connect = Comp => {
  class ComposedComponent extends React.Component {
    constructor() {
      super();
      this.state = {};
      this.handleAddTransaction = this.handleAddTransaction.bind(this);
      this.handleAddPeer = this.handleAddPeer.bind(this);
      this.handleApproveTransaction = this.handleApproveTransaction.bind(this);
      this.onDataChange = this.onDataChange.bind(this);
    }

    componentDidMount() {
      const { id } = this.props.match.params;
      const url = datParamToUrl(id);

      core
        .start(url, this.onDataChange)
        .then(({ myURL }) => this.setState({ myURL }));
    }

    onDataChange(aggragate) {
      this.setState({ data: aggragate.getState() });
    }

    handleAddTransaction({ description, amount, to, from }) {
      core.addTransaction({
        description,
        from,
        to,
        amount,
        currency: 'EUR'
      });
    }

    handleApproveTransaction(id) {
      core.approveTransaction({
        id
      });
    }

    handleAddPeer({ name, url }) {
      core.addPeer({ name, url });
    }

    render() {
      if (!this.state.data) {
        return null;
      }

      return (
        <Comp
          myURL={this.state.myURL}
          peers={values(this.state.data.peers)}
          transactions={values(this.state.data.transactions)}
          onApproveTransaction={this.handleApproveTransaction}
          onAddTransaction={this.handleAddTransaction}
          onAddPeer={this.handleAddPeer}
        />
      );
    }
  }

  return ComposedComponent;
};

export default connect;
