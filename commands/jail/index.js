const presos = require('./commands/presos');
const protegido = require('./commands/protegido');
const proteger = require('./commands/proteger');
const salvar = require('./commands/salvar');
const escapar = require('./commands/escapar');
const irritar = require('./commands/irritar');

const { chatters } = require('../../utils/twitch');
const { readDataJSON, writeDataJSON } = require('../../utils/data');
const { JAIL_STATE } = require('./state');

const TIME_BETWEEN_VIEW_ARRESTS = 600000;

exports.default = async (client, target, context, message) => {
  presos.default(client, target, context, message);
  protegido.default(client, target, context, message);
  proteger.default(client, target, context, message);
  salvar.default(client, target, context, message);
  escapar.default(client, target, context, message);
  irritar.default(client, target, context, message);

  setInterval(async () => {
    const { viewers } = await chatters();

    if (viewers.length > 0) {
      const viewer = viewers[Math.floor(Math.random() * viewers.length)];
      const state = readDataJSON('jail', JAIL_STATE);

      writeDataJSON('jail', {
        ...state,
        prisoners: [...state.prisoners, viewer],
      });

      client.say(target, `/me prendeu ${viewer}.`);
    }
  }, TIME_BETWEEN_VIEW_ARRESTS);
};
