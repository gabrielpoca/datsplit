import React from 'react';

import { hasName, getName } from '../localStorage';
import { addPeer } from '../core/eventFactory';

class Archives {
  constructor() {
    this.archives = {};
  }

  getArchive(url) {
    if (!this.archives[url]) {
      this.archives[url] = new DatArchive(url);
    }

    return this.archives[url];
  }

  getDetails(url) {
    return this.getArchive(url)
      .readFile('/dat.json')
      .then(res => JSON.parse(res))
      .then(dat => ({ title: dat.title, url }));
  }
}

const connect = ComposedComponent => {
  class Composed extends React.Component {
    constructor() {
      super();

      this.state = { groups: [] };
      this.archives = new Archives();

      this.onImportGroup = this.onImportGroup.bind(this);
      this.onRemoveGroup = this.onRemoveGroup.bind(this);
      this.onCreateGroup = this.onCreateGroup.bind(this);
    }

    componentWillMount() {
      if (!hasName()) {
        return this.props.history.push('/onboarding');
      }

      const urls = this.loadFromStorage();
      Promise.all(urls.map(url => this.archives.getDetails(url))).then(groups =>
        this.setState({ groups })
      );
    }

    onImportGroup({ url }) {
      this.archives.getDetails(url).then(group => {
        this.setState(
          { groups: [group, ...this.state.groups] },
          this.saveToStorage
        );
      });

      this.props.history.push('/');
    }

    onRemoveGroup(url) {
      const groups = this.state.groups.filter(g => g.url !== url);
      this.setState({ groups }, () => this.saveToStorage());
    }

    onCreateGroup() {
      DatArchive.create({
        title: 'My new DatSplit group'
      }).then(archive => {
        this.onImportGroup({ url: archive.url });

        const addPeerEvent = addPeer(archive.url, {
          name: getName(),
          url: archive.url
        });

        archive
          .writeFile(
            'data.json',
            JSON.stringify(
              {
                events: [addPeerEvent]
              },
              null,
              2
            )
          )
          .catch(e => console.error(e));
      });
    }

    saveToStorage() {
      const groups = JSON.stringify(this.state.groups.map(g => g.url));
      localStorage.setItem('DatSplitGroups', groups);
    }

    loadFromStorage() {
      return JSON.parse(localStorage.getItem('DatSplitGroups')) || [];
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          onCreateGroup={this.onCreateGroup}
          onImportGroup={this.onImportGroup}
          onRemoveGroup={this.onRemoveGroup}
        />
      );
    }
  }

  return Composed;
};

export default connect;
