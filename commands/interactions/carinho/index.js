const carinho = require('./commands/carinho');
const mural = require('./commands/muraldecarinhos');

exports.default = async (client, target, context, message) => {
  carinho.default(client, target, context, message);
  mural.default(client, target, context, message);
};
