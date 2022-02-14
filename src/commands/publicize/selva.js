const { client } = require('../../core/twitch_client');

module.exports = {
  keyword: 'selva',
  async execute({ channel, context }) {
    await client.say(
      channel,
      `${context.username} você conseguiu uma captura selvagem nova. Digite... Oh não!
      Acho que cê ta na live errada Kappa A certa é essa aqui: twitch.tv/pokemaobr`,
    );
  },
};
