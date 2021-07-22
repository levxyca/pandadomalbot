const carinho = require('./commands/carinho');
const estoque = require('./commands/estoque');
const addcarinho = require('./commands/addcarinho');
const mural = require('./commands/muraldecarinhos');

exports.default = async (client, target, context, message, ehBot) => {
  carinho.default(client, target, context, message);
  estoque.default(client, target, context, message);
  addcarinho.default(client, target, context, message, ehBot);
  mural.default(client, target, context, message);
};
