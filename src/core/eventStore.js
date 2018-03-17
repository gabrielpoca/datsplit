import EventEmitter from './eventEmitter';

class EventStore {
  constructor() {
    this.events = [];
    this.emitter = new EventEmitter();
  }

  addEvents(events) {
    this.events = this.events.concat(events);
    this.notifyEvents(events);
  }

  addEvent(event) {
    this.events.push(event);
    this.notifyEvents([event]);
  }

  getEvents() {
    return this.events;
  }

  notifyEvents(events) {
    const changeEvent = new CustomEvent('changed', {
      detail: { events }
    });
    this.emitter.dispatchEvent(changeEvent);
  }

  onChange(cb) {
    this.emitter.addEventListener('changed', ({ detail }) => cb(detail.events));
  }
}

export const create = () => new EventStore();
