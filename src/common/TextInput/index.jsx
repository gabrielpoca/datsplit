import React from 'react';

import './index.css';

export default class TextInput extends React.Component {
  render() {
    return <input {...this.props} styleName="root" />;
  }
}
