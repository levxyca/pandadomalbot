const { chatters } = require('../../utils/twitch');
const { arrest } = require('./actions');

const ARREST_INTERVAL = parseInt(
  process.env.MINUTOS_ENTRE_PRISAO_DE_VIEWERS,
  10,
);

exports.default = (client) => {
  // Minutos p/ milissegundo
  const millis = ARREST_INTERVAL * 1000 * 60;

  setInterval(async () => {
    const { viewers } = await chatters();
    if (viewers.length > 0) {
      const viewer = viewers[Math.floor(Math.random() * viewers.length)];
      client.say(process.env.CHANNEL_NAME, `/me prendeu ${arrest(viewer)}.`);
    }
  }, millis);
};
