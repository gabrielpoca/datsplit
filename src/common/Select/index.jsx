import React from 'react';

import './index.css';

export default class Select extends React.Component {
  render() {
    return (
      <select {...this.props} styleName="root">
        <option>Select an option</option>
        {this.props.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
}
