import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';

import styles from './index.css';

export default class Tabs extends React.PureComponent {
  constructor() {
    super();
    this.el = document.createElement('div');
    this.el.className = styles.root;
    this.renderTab = this.renderTab.bind(this);
  }

  componentDidMount() {
    this.actionsRoot = document.getElementById('body-tabs');
    this.actionsRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.actionsRoot.removeChild(this.el);
  }

  renderTab(tab) {
    if (tab.active) {
      return (
        <li key={tab.href} styleName="tab active">
          <h1>{tab.name}</h1>
        </li>
      );
    }

    return (
      <li key={tab.href} styleName="tab">
        <Link to={tab.href}>{tab.name}</Link>
      </li>
    );
  }

  render() {
    return ReactDom.createPortal(
      <ul styleName="tabs">{this.props.tabs.map(this.renderTab)}</ul>,
      this.el
    );
  }
}
