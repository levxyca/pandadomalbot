const { chatters } = require('../../utils/twitch');
const { readDataJSON, writeDataJSON } = require('../../utils/data');
const { JAIL_STATE } = require('./state');

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
      const state = readDataJSON('jail', JAIL_STATE);

      writeDataJSON('jail', {
        ...state,
        prisoners: [...state.prisoners, viewer],
      });

      client.say(process.env.CHANNEL_NAME, `/me prendeu ${viewer}.`);
    }
  }, millis);
};
