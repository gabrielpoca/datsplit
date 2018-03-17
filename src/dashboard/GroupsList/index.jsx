import React from 'react';
import { Link } from 'react-router-dom';

import { datUrlToParam } from '../../utils';

import './index.css';

class GroupsList extends React.Component {
  renderGroup(group) {
    const param = datUrlToParam(group.url);

    return (
      <li key={param} styleName="item">
        <Link styleName="link" to={`/group/${param}`}>
          {group.title}
        </Link>
      </li>
    );
  }

  render() {
    return <ul styleName="root">{this.props.groups.map(this.renderGroup)}</ul>;
  }
}

export default GroupsList;
