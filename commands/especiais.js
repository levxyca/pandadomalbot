exports.default = (client, target, context, message) => {
  switch (message) {
    case '!carrinho':
      if (context.username === 'freakyfog') {
        client.say(target, `/me só me faz falta quem não vai na bola Kappa`);
      }
      break;
    default:
      break;
  }
};
