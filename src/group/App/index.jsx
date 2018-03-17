import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import Peers from '../Peers';
import Transactions from '../Transactions';
import BodyTabs from '../BodyTabs';
import Sharing from '../Sharing';
import Header from '../../common/Header';
import Body from '../../common/Body';
import Layout from '../../common/Layout';
import './index.css';

class App extends React.Component {
  render() {
    const { path } = this.props.match;

    return (
      <Layout
        header={
          <Header>
            <Link to={this.props.match.url}>{document.title}</Link>
          </Header>
        }
      >
        <Body>
          <div styleName="root">
            <Switch>
              <Route
                path={`${path}/peers`}
                render={props => (
                  <Fragment>
                    <BodyTabs {...this.props} active="peers" />
                    <Peers {...this.props} {...props} />
                  </Fragment>
                )}
              />
              <Route
                path={`${path}/sharing`}
                render={props => (
                  <Fragment>
                    <BodyTabs {...this.props} active="sharing" />
                    <Sharing {...this.props} {...props} />
                  </Fragment>
                )}
              />
              <Route
                path={`${path}`}
                render={props => (
                  <Fragment>
                    <BodyTabs {...this.props} active="transactions" />
                    <Transactions {...this.props} {...props} />
                  </Fragment>
                )}
              />
            </Switch>
          </div>
        </Body>
      </Layout>
    );
  }
}

export default withRouter(App);
