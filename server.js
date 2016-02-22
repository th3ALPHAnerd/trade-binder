'use strict';

const Composer = require('./index');

Composer((err, server) => {
  if (err) { throw err; }

  server.start(() => { server.log('info', 'Server listening on port: ' + server.info.port); });
});
