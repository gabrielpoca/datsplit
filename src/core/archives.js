import EventEmitter from './eventEmitter';

class Archive {
  constructor(url) {
    this.dat = new DatArchive(url);
    this.url = url;
    // the first time it receives write events to write to disk
    this.firstWrite = true;
  }

  commit() {
    return this.dat.commit();
  }

  readDat() {
    return this.dat.getInfo();
  }

  readEvents() {
    return this.dat
      .readFile('/data.json')
      .then(res => JSON.parse(res).events)
      .catch(err => {
        if (err.name === 'NotFoundError') {
          console.log(`/data.json not found for ${this.dat.url}`);
        } else {
          console.log('Something went wrong reading events', this.dat);
        }

        return [];
      });
  }

  writeEvents(events) {
    if (this.firstWrite) {
      this.firstWrite = false;
      return;
    }

    return this.dat.writeFile(
      '/data.json',
      JSON.stringify({ events }, null, 2)
    );
  }

  onChange(cb) {
    setInterval(() => cb(this), 60000);
  }
}

class Archives {
  constructor(myURL, eventStore) {
    this.eventStore = eventStore;
    this.myURL = myURL;
    this.archives = {};
    this.eventEmitter = new EventEmitter();

    this.eventStore.onChange(events => this.processEvents(events));
  }

  onChange(cb) {
    this.eventEmitter.addEventListener('changed', ({ detail }) =>
      cb(detail.archive)
    );
  }

  createArchive(url) {
    if (this.archives[url] || url === this.myURL) return;

    this.archives[url] = new Archive(url);

    const archive = this.archives[url];
    this.handleArchiveChange(archive);
    archive.onChange(() => this.handleArchiveChange(archive));
  }

  handleArchiveChange(archive) {
    const event = new CustomEvent('changed', { detail: { archive } });
    this.eventEmitter.dispatchEvent(event);
  }

  processEvents(events) {
    events.forEach(event => {
      switch (event.type) {
        case 'PEER_ADDED': {
          const { url } = event.payload;

          this.createArchive(url);

          break;
        }
        default:
          break;
      }
    });
  }
}

export const create = (myURL, eventStore) => new Archives(myURL, eventStore);
export const createArchive = url => new Archive(url);
