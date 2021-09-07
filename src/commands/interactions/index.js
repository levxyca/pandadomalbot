const estoque = require('./estoque');
const add = require('./add');

exports.default = async (client, target, context, message, ehBot) => {
  estoque.default(client, target, context, message);
  add.default(client, target, context, message, ehBot);
};
