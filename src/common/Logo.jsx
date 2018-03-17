import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';

export default class Logo extends React.PureComponent {
  render() {
    return (
      <Link to="/">
        <img alt="Logo" style={this.props} src={logo} />
      </Link>
    );
  }
}

Logo.defaultProps = {
  width: '200px'
};
