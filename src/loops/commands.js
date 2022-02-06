const { client } = require('../core/twitch_client');

module.exports = {
  interval: 1200000,
  execute() {
    client.say(
      process.env.CHANNEL,
      `Para saber quais comandos temos disponíveis aqui é só digitar !commands 🐼`,
    );
  },
};
