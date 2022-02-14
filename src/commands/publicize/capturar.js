const { client } = require('../../core/twitch_client');

module.exports = {
  keyword: 'capturar',
  aliases: ['selvagem'],
  async execute({ channel, context }) {
    await client.say(
      channel,
      `${context.username} você capturou um exemplar da linguagem... Oh não!
      Acho que cê ta na live errada Kappa A certa é essa aqui: twitch.tv/pokemaobr`,
    );
  },
};
