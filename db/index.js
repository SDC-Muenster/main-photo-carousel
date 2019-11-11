const { Client } = require('pg');
const config = require('./config');

const client = new Client(config);
client.connect()
  .then(() => console.log('DATABASE CONNECTION SUCCESSFUL'))
  .catch((err) => console.error(`DATABASE CONNECTION FAILED WITH ERR ${err}`));

module.exports = client;
