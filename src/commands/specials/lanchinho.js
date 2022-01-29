const { client } = require('../../core/client');

module.exports = {
  keyword: 'lanchinho',
  async execute({ context, channel }) {
    if (context.username.toLowerCase() === 'presidentebolinho') {
      client.say(channel, `É o momento perfeito para comer um bolinho.`);
    }
  },
};
