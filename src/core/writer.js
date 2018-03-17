import { debounce } from 'lodash';

class Writer {
  constructor(archive, eventStore) {
    this.archive = archive;
    this.eventStore = eventStore;
    this.writing = false;

    this.handleEvents = debounce(this.handleEvents, 1000);
    this.eventStore.onChange(() => this.handleEvents());
  }

  handleEvents() {
    if (this.writing) return;

    this.archive.writeEvents(this.eventStore.getEvents());
    this.archive
      .commit()
      .then(() => {
        this.writing = false;
      })
      .catch(() => {
        this.writing = false;
      });
  }
}

export const create = (archive, eventStore) => new Writer(archive, eventStore);
