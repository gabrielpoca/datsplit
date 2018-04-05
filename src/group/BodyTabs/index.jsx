import React from 'react';

import Body from '../../common/Body';

class BodyTabs extends React.PureComponent {
  tabs() {
    const { url } = this.props.match;

    return [
      {
        href: url,
        name: 'Expenses',
        active: this.props.active === 'transactions'
      },
      {
        id: 'peers',
        href: `${url}/peers`,
        name: 'Members',
        active: this.props.active === 'peers'
      }
    ];
  }

  render() {
    return <Body.Tabs {...this.props} tabs={this.tabs()} />;
  }
}

export default BodyTabs;
