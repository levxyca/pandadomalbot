const { client } = require('../core/twitch_client');
const { people } = require('../queues/people');

const points = Number(process.env.POINTS_SUB_DE_PRESENTE || 100);

async function onSubGift(
  channel,
  username,
  streakMonths,
  recipient,
  methods,
  userstate,
) {
  console.info(
    'Evento de subgift, username:',
    username,
    'streakMonths:',
    streakMonths,
    'recipient:',
    recipient,
    'methods:',
    methods,
    'userstate:',
    userstate,
  );

  const message = `
    Hey ${username}, obrigado pelo sub de presente para ${recipient}.
    Por isso, vou te dar ${points} pontos!`;

  await people(username, (person) => {
    person.points += points;
    return person;
  });

  client.say(channel, message);
}

module.exports = { onSubGift };
