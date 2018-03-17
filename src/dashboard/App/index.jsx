import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import Header from '../../common/Header';
import Body from '../../common/Body';
import Layout from '../../common/Layout';
import GroupsList from '../GroupsList';
import ImportGroupForm from '../ImportGroupForm';
import Button from '../../common/Button';
import ButtonLink from '../../common/ButtonLink';

import './index.css';

const tabs = [{ href: '/', name: 'Your Groups', active: true }];

class App extends React.Component {
  componentDidMount() {
    document.title = 'DatSplit Dashboard';
  }

  render() {
    return (
      <Layout header={<Header />}>
        <Body>
          <Body.Tabs {...this.props} tabs={tabs} full />
          <Switch>
            <Route path="/import">
              <ImportGroupForm {...this.props} />
            </Route>
            <Route path="/">
              <div styleName="root">
                <Body.Actions>
                  <Button onClick={this.props.onCreateGroup}>
                    <button>Create</button>
                  </Button>
                  <ButtonLink>
                    <Link to="/import">Import</Link>
                  </ButtonLink>
                </Body.Actions>
                <GroupsList {...this.props} />
              </div>
            </Route>
          </Switch>
        </Body>
      </Layout>
    );
  }
}

export default withRouter(App);
