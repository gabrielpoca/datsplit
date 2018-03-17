import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Peer from '../Peer';
import PeersForm from '../PeersForm';
import PeersList from '../PeersList';
import Body from '../../common/Body';
import ButtonLink from '../../common/ButtonLink';

export default class Peers extends React.PureComponent {
  render() {
    const { path } = this.props.match;

    return (
      <Switch>
        <Route path={`${path}/peers/new`}>
          <PeersForm {...this.props} />
        </Route>
        <Route
          path={`${path}/peers/:url`}
          render={props => (
            <Fragment>
              <Body.Actions>
                <ButtonLink>
                  <Link to={`${this.props.match.url}/peers`}>Back</Link>
                </ButtonLink>
              </Body.Actions>
              <Peer {...this.props} {...props} />
            </Fragment>
          )}
        />
        <Route>
          <PeersList {...this.props} />
        </Route>
      </Switch>
    );
  }
}
