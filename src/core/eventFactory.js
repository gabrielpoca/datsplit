import { extend } from 'lodash';

/* eslint-disable */
const newID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
/* eslint-enable */

class Event {
  constructor(url, type, payload) {
    this.type = type;
    this.uuid = newID();
    this.url = url;
    this.payload = payload;
    this.timestamp = new Date();
  }
}

const createEvent = (myURL, payload) =>
  new Event(myURL, payload.type, payload.payload);

export const addPeer = (myURL, { name, url }) =>
  createEvent(myURL, { type: 'PEER_ADDED', payload: { name, url } });

export const addTransaction = (
  myURL,
  { description, from, to, amount, currency }
) =>
  createEvent(myURL, {
    type: 'TRANSACTION_ADDED',
    payload: { description, from, to, amount, currency, id: newID() }
  });

export const approveTransaction = (myURL, { id }) =>
  createEvent(myURL, {
    type: 'APPROVE_TRANSACTION',
    payload: { id, url: myURL }
  });

export const renamePeer = (myURL, { name }) =>
  createEvent(myURL, {
    type: 'PEER_RENAMED',
    payload: { url: myURL, name }
  });
