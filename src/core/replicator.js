class Replicator {
  constructor(myURL, eventStore, archives) {
    this.eventStore = eventStore;
    this.archives = archives;
    this.myURL = myURL;
    this.uuids = {};

    this.eventStore.onChange(events => this.processEvents(events));
    this.archives.onChange(archive => this.processArchive(archive));
  }

  processArchive(archive) {
    if (archive.dat.url === this.myURL) return;

    archive
      .readEvents()
      .then(events => events.filter(e => !this.uuids[e.uuid]))
      .then(events => {
        if (events.length > 0) this.eventStore.addEvents(events);
      });
  }

  processEvents(events) {
    events.forEach(event => {
      this.uuids[event.uuid] = true;
    });
  }
}

export const create = (myURL, eventStore, archives) =>
  new Replicator(myURL, eventStore, archives);
