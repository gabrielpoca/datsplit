import React from 'react';

import Logo from '../Logo';
import Social from '../Social';

import styles from './index.css';

class Header extends React.Component {
  renderTitle() {
    if (!this.props.children) {
      return null;
    }

    return React.cloneElement(this.props.children, {
      ...this.props.children.props,
      className: styles.title
    });
  }

  render() {
    return (
      <div styleName="root">
        <div styleName="content">
          <div>
            <Logo width="82px" />
          </div>
          {this.renderTitle()}
          <div>
            <Social />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
