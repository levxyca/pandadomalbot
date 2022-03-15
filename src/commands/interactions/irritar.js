const { client } = require('../../core/twitch_client');
const { people } = require('../../queues/people');

const COMMAND_KEY = 'irritar';

const POINTS = process.env.POINTS_IRRITATIONS;

const REASONS = [
  'puxou a orelha do panda do mal',
  'imitou a voz do panda do mal',
  'jogou água no panda do mal',
  'sugeriu live de deno',
  'falou que a lagostinha é melhor que o panda do mal',
  'não deu carinho no panda do mal',
  'salvou alguém da prisão do panda do mal, deixou ele sozinho',
  'deu um carinho ruim no panda do mal',
];

module.exports = {
  keyword: COMMAND_KEY,
  execute: async ({ channel, context }) => {
    await people(context.username, (p) => {
      const person = context.username;
      const luck = Math.random();
      let { irritations } = p.counter;

      const reason = REASONS[Math.floor(Math.random() * REASONS.length)];

      function irritation() {
        if (luck < 0.5) {
          client.say(
            channel,
            `${person} tentou mas deu azar. Vou prender você e roubar 5 pontos seus.`,
          );
          client.say(channel, `/timeout ${person} 10`);
          p.points -= Number(5);
        } else {
          client.say(
            channel,
            `AAAAAAAAAA ${person} ${reason} e saiu correndo com ${POINTS} pontos. Grrrr`,
          );
          p.points += Number(POINTS);
        }
      }

      if (p.haveUsedTheCommandToday(COMMAND_KEY) && irritations === 0) {
        client.say(
          channel,
          `Ei ${person}, você já irritou bastante o pandadomal por hoje. Se quiser irritar mais, digite !help para saber como.`,
        );
      } else if (p.haveUsedTheCommandToday(COMMAND_KEY) && irritations > 0) {
        irritation();
        irritations -= Number(1);
        p.counter.irritations = irritations;
      } else {
        irritation();
        p.incrementCommandUsage(COMMAND_KEY);
        p.setLastCommandUsageForToday(COMMAND_KEY);
      }

      return p;
    });
  },
};
