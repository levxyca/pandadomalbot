const { readJailState, writeJailState } = require('../state');
const { protectSubscriber } = require('../actions');

exports.default = async (client, target, context, message) => {
  if (message.trim() === '!proteger' && 'broadcaster' in context.badges) {
    const sub = protectSubscriber();

    const state = readJailState();

    writeJailState({
      ...state,
      protected: sub,
    });

    client.say(target, `/me ${sub} agora está sob minha proteção!`);
  }
};
