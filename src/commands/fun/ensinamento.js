const { client } = require('../../core/twitch_client');
const { sample } = require('../../utilities/collections');
const { read } = require('../../utilities/data-file');

module.exports = {
  keyword: 'ensinamento',
  async execute({ channel }) {
    const content = read('ensinamentos', []);
    if (content.length === 0) {
      console.info('Arquivo "ensinamentos.json" inexistente ou vazio.');
      return;
    }

    await client.say(channel, sample(content));
  },
};
