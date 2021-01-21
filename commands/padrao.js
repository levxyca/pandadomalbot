/* eslint-disable no-console */
const mensagens = [];
const padroesFeitos = [];

exports.default = (client, target, context, message) => {
  mensagens.push(message);

  if (
    mensagens[mensagens.length - 1] === mensagens[mensagens.length - 2] &&
    padroesFeitos.indexOf(message) === -1
  ) {
    padroesFeitos.push(message);
    client.say(target, message);
  }
};
