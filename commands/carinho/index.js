const carinho = require('./commands/carinho');
const estoque = require('./commands/estoque');

exports.default = async (client, target, context, message) => {
  carinho.default(client, target, context, message);
  estoque.default(client, target, context, message);
};
