const { client } = require('../../core/twitch_client');
const { people } = require('../../queues/people');

const COMMAND_KEY = 'carinho';

const POINTS = process.env.POINTS_AFFECTIONS.split(',');
const PERFECTPOINT = process.env.POINTS_PERFECT_AFFECTION;

module.exports = {
  keyword: COMMAND_KEY,
  execute: async ({ channel, context }) => {
    await people(context.username, (p) => {
      const person = context.username;
      const perfect = Math.floor(Math.random() * 100) + 1;
      let { affections } = p.counter;

      function affection() {
        if (perfect === 100) {
          client.say(
            channel,
            `${person} está fazendo o melhor carinho que eu já recebi! nhawwww Obrigada por sua gentileza, eu estou muito feliz agora graças a você e por isso vou te dar ${PERFECTPOINT} pontos!`,
          );
          p.points += Number(PERFECTPOINT);
        }
        if (perfect >= 90 && perfect < 100) {
          client.say(
            channel,
            `Obrigado pelo seu carinho ${person}! 🐼 Apesar de não ser perfeito foi um carinho realmente bom! Por isso, irei lhe presentear com ${POINTS[0]}. Seu nível de carinho foi ${perfect}%.`,
          );
          p.points += Number(POINTS[0]);
        }
        if (perfect >= 80 && perfect < 90) {
          client.say(
            channel,
            `Obrigado pelo seu carinho ${person}! 🐼 Apesar de não ser perfeito foi um carinho deveras agradável! Por isso, irei lhe presentear com ${POINTS[1]}. Seu nível de carinho foi ${perfect}%.`,
          );
          p.points += Number(POINTS[1]);
        }
        if (perfect >= 70 && perfect < 80) {
          client.say(
            channel,
            `Obrigado pelo seu carinho ${person}! 🐼 Apesar de não ser perfeito foi um carinho agradável! Por isso, irei lhe presentear com ${POINTS[2]}. Seu nível de carinho foi ${perfect}%.`,
          );
          p.points += Number(POINTS[2]);
        }
        if (perfect >= 60 && perfect < 70) {
          client.say(
            channel,
            `Obrigado pelo seu carinho ${person}! 🐼 Apesar de não ser perfeito foi um carinho razoável! Por isso, irei lhe presentear com ${POINTS[3]}. Seu nível de carinho foi ${perfect}%.`,
          );
          p.points += Number(POINTS[3]);
        }
        if (perfect >= 10 && perfect < 60) {
          client.say(
            channel,
            `Obrigado pelo seu carinho ${person}! 🐼 Seu nível de carinho foi ${perfect}%.`,
          );
        }
        if (perfect < 10) {
          client.say(
            channel,
            `Obrigado pelo seu carinho ${person}! 🐼 Se bem que eu nem sei se posso chamar isso de carinho né. Seu nível de carinho foi ${perfect}%.`,
          );
        }
      }

      if (p.haveUsedTheCommandToday(COMMAND_KEY) && affections === 0) {
        client.say(
          channel,
          `Ei ${person}, você esgotou o seu carinho diário. Se quiser ganhar mais, digite !help para saber como.`,
        );
      } else if (p.haveUsedTheCommandToday(COMMAND_KEY) && affections > 0) {
        affection();
        affections -= Number(1);
        p.counter.affections = affections;
      } else {
        affection();
        p.incrementCommandUsage(COMMAND_KEY);
        p.setLastCommandUsageForToday(COMMAND_KEY);
      }

      return p;
    });
  },
};
