const { client } = require('../../core/twitch_client');
const { jail } = require('../../queues/jail');

module.exports = {
  keyword: 'ban',
  async execute({ argument, channel, context }) {
    await jail(async (j) => {
      const user = context.username;
      const adversary = argument;
      const protectedPerson = j.protectedUser;
      const bannedPerson = Math.floor(Math.random() * 10000);

      if (!argument) {
        client.say(
          channel,
          `${context.username} é para dar ban em quem mesmo?! Estou perdido 🤔`,
        );

        return;
      }

      if (adversary === protectedPerson) {
        client.say(channel, `/timeout ${user} 60`);
        client.say(
          channel,
          `/me ${user} mexeu com ${protectedPerson} então mexeu comigo! 🐼`,
        );

        return;
      }

      if (
        (user.includes('codes') && adversary.includes('dev')) ||
        (user.includes('dev') && adversary.includes('codes'))
      ) {
        const randomBan = Math.floor(Math.random() * 1000);
        if (randomBan > 0 && randomBan < 499) {
          client.say(channel, `/timeout @${adversary} 60`);
          client.say(
            channel,
            `/@${adversary} perdeu a batalha de familias entra a familia dev e familia codes!`,
          );
          client.say(channel, `FAMILIA DEV GANHOU A RINHA DE FAMILIAS!`);
        } else if (randomBan > 500 && randomBan < 1000) {
          client.say(channel, `/timeout ${user} 60`);
          client.say(
            channel,
            `${user} perdeu a batalha de familias entra a familia dev e familia codes!`,
          );
          client.say(channel, `FAMILIA CODES GANHOU A RINHA DE FAMILIAS!`);
        }

        return;
      }

      if (bannedPerson > 100 && bannedPerson < 1000) {
        client.say(channel, `/timeout ${adversary} 10`);
        client.say(
          channel,
          `ih, @${adversary} não conseguiu correr do pandadomal.`,
        );
      } else if (bannedPerson > 1000 && bannedPerson < 7000) {
        client.say(channel, `/timeout ${user} 10`);
        client.say(channel, `ih, @${user} não conseguiu correr do pandadomal.`);
      } else {
        client.say(channel, `Todos escaparam do panda do mal. Grrrr`);
      }
    });
  },
};
