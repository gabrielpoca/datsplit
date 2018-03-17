# DatSplit

The source code in this repository is part of a series of blog posts called
_Apps on the Beaker Browser_. In this episode I recreate the primitives behind
Splitwise to run in a decentralized web application.

To access the live version you need to download the [Beaker
Browser](https://beakerbrowser.com/) and open [Dat SPlit]().

This project is a playground and I don't intend to build a fully featured
application. If you're interested in this project please reach out on the
issues or on [twitter](https://twitter.com/gabrielgpoca).

---

## Requirments

The only single thing you need to run this is
[Beaker Browser](https://beakerbrowser.com/). Before anything else you should
install it. It's a peer-to-peer browser that allows our applications to
communicate directly with one another, there's no need for a server. I'm very
interested is what kind of tools we can build with this. It can read multiple
peer-to-peer protocols, but I'll be working with their `DatArchive API` that's
build on top of the Dat protocol.

For the [live version please visit this link on the Beaker
Browser](dat://datsplit-gabrielpoca.hashbase.io/).

---

## Development

Stack

* Parcel Bundler
* React

Start the application:

```
npm start
```

Build the production version:

```
npm run build
```
