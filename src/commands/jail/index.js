const presos = require('./commands/presos');
const protegido = require('./commands/protegido');
const proteger = require('./commands/proteger');
const salvar = require('./commands/salvar');
const escapar = require('./commands/escapar');

exports.default = async (client, target, context, message) => {
  presos.default(client, target, context, message);
  protegido.default(client, target, context, message);
  proteger.default(client, target, context, message);
  salvar.default(client, target, context, message);
  escapar.default(client, target, context, message);
};
