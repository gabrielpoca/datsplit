import React from 'react';

import Actions from './Actions';
import Tabs from './Tabs';

import './index.css';

class Body extends React.PureComponent {
  render() {
    return (
      <div styleName="root">
        <nav styleName="nav" id="body-tabs" />
        <div styleName="content">
          <div styleName="actions" id="body-actions" />
          <main styleName="body">{this.props.children}</main>
        </div>
      </div>
    );
  }
}

Body.Actions = Actions;
Body.Tabs = Tabs;

export default Body;
