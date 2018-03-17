import { create as createArchives, createArchive } from './archives';
import { create as createEventStore } from './eventStore';
import { create as createAggregate } from './aggregate';
import { create as createReplicator } from './replicator';
import { create as createWriter } from './writer';
import * as eventFactory from './eventFactory';

let archive;
let eventStore;
let aggregate;
let myURL;

export const addPeer = ({ name, url }) => {
  const event = eventFactory.addPeer(myURL, { name, url });

  return eventStore.addEvent(event);
};

export const addTransaction = ({ description, from, to, amount, currency }) => {
  const event = eventFactory.addTransaction(myURL, {
    description,
    from,
    to,
    amount,
    currency
  });

  return eventStore.addEvent(event);
};

export const approveTransaction = ({ id }) => {
  const event = eventFactory.approveTransaction(myURL, { id });

  return eventStore.addEvent(event);
};

export const renamePeer = ({ name }) => {
  if (!aggregate.getState().peers[myURL]) {
    return addPeer({ name, url: myURL });
  }

  const event = eventFactory.renamePeer(myURL, { url: myURL, name });

  return eventStore.addEvent(event);
};

export const start = (url, onChangeCallback) => {
  archive = createArchive(url);

  return archive
    .readDat()
    .then(dat => {
      const datURL = dat.url;
      myURL =
        datURL[datURL.length - 1] === '/'
          ? datURL.substring(0, datURL.length - 1)
          : datURL;
      document.title = dat.title;

      eventStore = createEventStore();
      aggregate = createAggregate(myURL, eventStore);
      aggregate.onChange(onChangeCallback);
      const archives = createArchives(myURL, eventStore);
      const replicator = createReplicator(myURL, eventStore, archives);
      const writer = createWriter(archive, eventStore);

      window.core = { aggregate, eventStore, archives, replicator, writer };

      return archive.readEvents().then(events => {
        eventStore.addEvents(events);
      });
    })
    .then(() => ({ myURL }));
};
