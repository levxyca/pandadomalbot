const { readDataJSON } = require('../utils/data');

exports.default = (client, target, _, message) => {
  if (message.trim() === '!ensinamento') {
    const ensinamentos = readDataJSON('ensinamentos');

    if (ensinamentos && ensinamentos.length > 0) {
      client.say(
        target,
        `/me ${ensinamentos[Math.floor(Math.random() * ensinamentos.length)]}`,
      );
    }
  }
};
