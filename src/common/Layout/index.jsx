import React from 'react';

import './index.css';

export default class Layout extends React.PureComponent {
  render() {
    return (
      <div styleName="root">
        <div styleName="header">{this.props.header}</div>
        <div styleName="body">{this.props.children}</div>
      </div>
    );
  }
}
