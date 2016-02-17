'use strict';

const Composer = require('./index');

Composer((err, server) => {
  if (err) { throw err; }

  server.start(() => { console.log('Server listening on port: ' + server.info.port); });
});
