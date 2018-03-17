import { extend } from 'lodash';
import EventEmitter from './eventEmitter';

class Aggregate {
  constructor(myURL, eventStore) {
    this.eventStore = eventStore;
    this.state = { peers: {}, transactions: {}, name: 'Me' };
    this.myURL = myURL;
    this.emitter = new EventEmitter();

    this.eventStore.onChange(events => this.processEvents(events));
  }

  processEvents(events) {
    events.map(e => this.processEvent(e));
    const changedEvent = new CustomEvent('changed');
    this.emitter.dispatchEvent(changedEvent);
  }

  processEvent(event) {
    const state = this.state;

    switch (event.type) {
      case 'TRANSACTION_ADDED': {
        const { description, from, to, amount, currency, id } = event.payload;

        if (!description || !from || !to || !amount || !id) return;

        const transaction = extend(
          {
            description,
            from,
            to,
            amount,
            currency,
            id,
            date: event.timestamp
          },
          {
            toApproveByMe:
              event.url !== this.myURL &&
              (to === this.myURL || from === this.myURL),
            own: event.url === this.myURL,
            approvedByMe: event.url === this.myURL,
            approvedByOther:
              event.url !== this.myURL &&
              (event.url === to || event.url === from)
          }
        );

        state.transactions[id] = transaction;
        break;
      }
      case 'APPROVE_TRANSACTION': {
        const { id, url } = event.payload;
        const transaction = state.transactions[id];

        if (url === this.myURL) {
          transaction.approvedByMe = true;
          transaction.toApproveByMe = false;
        } else if (
          (transaction.from === event.url && transaction.to === this.myURL) ||
          (transaction.to === event.url && transaction.from === this.myURL)
        ) {
          transaction.approvedByOther = true;
        }

        break;
      }
      case 'PEER_ADDED': {
        const { name, url } = event.payload;

        if (!state.peers[url]) {
          state.peers[url] = { name, url };
        }

        if (event.url === url) {
          state.peers[url] = { name, url };
        }

        break;
      }
      case 'PEER_RENAMED': {
        const { name, url } = event.payload;

        if (url === event.url) {
          state.peers[url] = extend(state.peers[url], { name });
        }

        break;
      }
      default:
        break;
    }

    this.state = state;
  }

  getState() {
    return this.state;
  }

  onChange(cb) {
    this.emitter.addEventListener('changed', () => cb(this));
  }
}

export const create = (myURL, eventStore) => new Aggregate(myURL, eventStore);
