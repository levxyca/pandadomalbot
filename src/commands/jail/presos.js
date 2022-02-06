const { client } = require('../../core/twitch_client');
const { jail } = require('../../queues/jail');

module.exports = {
  keyword: 'presos',
  aliases: ['preso'],
  async execute({ channel }) {
    await jail(async (j) => {
      let message = '';

      if (j.prisioners.length > 0) {
        message = `Usuários que estão em minhas mãos: ${j.prisioners}. Use !salvar pra tentar salvá-los.`;
      } else {
        message = 'Não tem ninguem em minhas mãos.';
      }
      await client.say(channel, message);
    });
  },
};
