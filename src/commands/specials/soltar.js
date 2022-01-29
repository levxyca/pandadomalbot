const { client } = require('../../core/client');

module.exports = {
  keyword: 'soltar',
  async execute({ context, channel }) {
    if (context.username.toLowerCase() === 'monikinhadev') {
      client.say(channel, 'MONIKINHAAAAAAAAAAA PandaFurious é !salvar');
    }
  },
};
