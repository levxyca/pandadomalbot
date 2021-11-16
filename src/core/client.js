const { Client } = require('tmi.js');

const client = new Client({
  channels: [process.env.CHANNEL],
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    password: process.env.PASSWORD,
    username: process.env.USERNAME,
  },
  options: {
    debug: true,
  },
});

module.exports = { client };
