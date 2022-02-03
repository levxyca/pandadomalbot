const { client } = require('../../core/twitch_client');
const { jail } = require('../../queues/jail');

module.exports = {
  keyword: 'protegido',
  async execute({ channel }) {
    await jail(async (j) => {
      let message;
      if (j.protectedUser) {
        message = `${j.protectedUser} está sob minha proteção, nem adianta tentar!`;
      } else {
        message = 'Não estou protegendo ninguém no momento.';
      }
      await client.say(channel, `${message}`);
    });
  },
};
