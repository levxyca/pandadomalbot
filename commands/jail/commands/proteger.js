const { readDataJSON, writeDataJSON } = require('../../../utils/data');
const { JAIL_STATE } = require('../state');
const { protectSubscriber } = require('../actions');

exports.default = async (client, target, context, message) => {
  if (message.trim() === '!proteger' && 'broadcaster' in context.badges) {
    const sub = protectSubscriber();

    const state = readDataJSON('jail', JAIL_STATE);

    writeDataJSON('jail', {
      ...state,
      protected: sub,
    });

    client.say(target, `/me ${sub} agora está sob minha proteção!`);
  }
};
