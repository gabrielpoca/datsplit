import React from 'react';

import TextInput from '../../common/TextInput';

import './index.css';

class Sharing extends React.Component {
  render() {
    return (
      <div styleName="root">
        <div styleName="content">
          <p styleName="p">
            You can share this address with someone that you want to have access
            to this group.
          </p>
          <p styleName="p">
            If you share this address with someone, they also need to share
            their address with you, and you need to add the address in the peers
            list.
          </p>
          {this.props.myURL && (
            <TextInput disabled value={this.props.myURL} type="text" />
          )}
        </div>
      </div>
    );
  }
}

export default Sharing;
