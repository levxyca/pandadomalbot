const { client } = require('../../core/twitch_client');
const { people } = require('../../queues/people');

module.exports = {
  keyword: 'estoque',
  execute: async ({ channel, context }) => {
    await people(context.username, async (p) => {
      const person = context.username;
      const { affections } = p.counter;
      const { irritations } = p.counter;

      const affectionsWord =
        p.counter.affections === 1 ? 'carinho' : 'carinhos';
      const irritationsWord = p.counter.irritations === 1 ? 'vez' : 'vezes';

      if (affections === 0 && irritations === 0) {
        await client.say(
          channel,
          `${person} infelizmente você não possui nada no estoque levxycPancada`,
        );

        return;
      }

      if (irritations === 0) {
        await client.say(
          channel,
          `${person} você ainda pode dar ${affections} ${affectionsWord} ohIPanda`,
        );

        return;
      }

      if (affections === 0) {
        await client.say(
          channel,
          `${person} você ainda pode tentar me irritar ${irritations} ${irritationsWord} ohIPanda`,
        );

        return;
      }

      await client.say(
        channel,
        `${person}, você ainda pode me dar ${affections} ${affectionsWord} e tentar me irritar ${irritations} ${irritationsWord} ohIPanda`,
      );
    });
  },
};
