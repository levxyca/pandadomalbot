const { client } = require('../../core/twitch_client');
const { people } = require('../../queues/people');

module.exports = {
  keyword: 'add',
  async execute({ channel, context, argument }) {
    if ('broadcaster' in context.badges) {
      if (!argument) {
        await client.say(
          channel,
          `Pô ${context.username}, eu preciso de mais informações para fazer isso.`,
        );

        return;
      }
      const infos = argument.split(' ');
      if (infos.length < 2) {
        await client.say(
          channel,
          `Pô ${context.username}, você esqueceu de algo hein.`,
        );
        return;
      }
      const person = infos[0];
      const qtd = infos[1];

      if (Number.isNaN(qtd)) {
        await client.say(
          channel,
          `Ei ${context.username}, adicione apenas números.`,
        );

        return;
      }

      await people(person, (p) => {
        p.counter.irritations = Number(p.counter.irritations) + Number(qtd);
        p.counter.affections = Number(p.counter.affections) + Number(qtd);
        return p;
      });
    } else {
      await client.say(
        channel,
        `${context.tusername} você não tem permissão para dar interações adicionais!`,
      );
    }
  },
};
