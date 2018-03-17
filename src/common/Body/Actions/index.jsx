import React from 'react';
import ReactDom from 'react-dom';

import styles from './index.css';

export default class Actions extends React.PureComponent {
  constructor() {
    super();
    this.el = document.createElement('div');
    this.el.className = styles.root;
  }

  componentDidMount() {
    this.actionsRoot = document.getElementById('body-actions');
    this.actionsRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.actionsRoot.removeChild(this.el);
  }

  render() {
    const newChildren = React.Children.map(this.props.children, child => (
      <div styleName="action">{child}</div>
    ));

    return ReactDom.createPortal(newChildren, this.el);
  }
}
