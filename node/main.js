const server = 'http://localhost:8080';
const client = 'CLI';
const username = 'admin';
const password = 'admin';
const salt = '$(openssl rand -hex 20)';
const token = `$(echo -n "${password}${salt}" | md5sum | awk '{ print $1 }')`;
var subsonic = require('subsonicjs')(username, token, salt, {
  protocol: 'http',
  host: 'http://localhost:8080',
  port: 8080,
  timeout: 30,
  client,
  version: '1.15',
});

subsonic.browsing
  .getIndexes()
  .then((indexes) => {
    // let firstIndexedArtist = indexes.index[0].artist[0];
    console.log('indexes', indexes);
    return subsonic.browsing().getArtist(firstIndexedArtist.id);
  })
  .then((artist) => {
    console.log(artist);
    //First artist details according to index order
  })
  .catch((err) => {
    console.log(err);
    // Handle error
  });
