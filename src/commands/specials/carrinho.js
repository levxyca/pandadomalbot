const { client } = require('../../core/twitch_client');

module.exports = {
  keyword: 'carrinho',
  async execute({ context, channel }) {
    if (context.username.toLowerCase() === 'freakyfog') {
      await client.say(channel, `Só me faz falta quem não vai na bola Kappa`);
    }
  },
};
