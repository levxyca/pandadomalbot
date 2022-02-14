const { client } = require('../../core/twitch_client');

module.exports = {
  keyword: 'spin',
  async execute({ channel, context }) {
    const message =
      Math.random() > 0.5
        ? `pleno dia, você ganhou o link da live correta ${context.username}`
        : `grande falta, você perdeu ${context.username} LUL porém como sou um panda generoso, eu te dou o link da live correta`;

    await client.say(
      channel,
      `Parabéns sua sorte está em ${message} CoolCat https://www.twitch.tv/vitthin`,
    );
  },
};
