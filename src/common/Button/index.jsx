import React, { PureComponent, cloneElement } from 'react';

import styles from './index.css';

class Button extends PureComponent {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    if (this.props.disabled) {
      evt.preventDefault();
      return;
    }

    if (this.props.onClick) {
      evt.preventDefault();
      this.props.onClick(evt);
    }
  }

  render() {
    const child = this.props.children;
    const { disabled } = this.props;
    const type = child.props.type || 'button';

    let className = styles.root;

    if (this.props.full) className += ` ${styles.full}`;
    if (this.props.alternative) className += ` ${styles.alternative}`;

    return cloneElement(
      child,
      {
        className,
        onClick: this.handleClick,
        disabled,
        'aria-disabled': disabled,
        type
      },
      <div styleName="content">{child.props.children}</div>
    );
  }
}

export default Button;
