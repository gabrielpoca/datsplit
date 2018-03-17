import React from 'react';

import './index.css';

class Heading extends React.PureComponent {
  get el() {
    if (this.props.el) {
      return this.props.el;
    }

    return this.props.kind;
  }

  render() {
    return (
      <this.el styleName={`root ${this.props.kind} ${this.props.color}`}>
        {this.props.children}
      </this.el>
    );
  }
}

Heading.defaultProps = {
  kind: 'h1',
  color: 'normal'
};

export default Heading;
