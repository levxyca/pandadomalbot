const irritar = require('./commands/irritar');

exports.default = async (client, target, context, message) => {
  irritar.default(client, target, context, message);
};
