exports.default = (client, target, context, message) => {
  switch (message) {
    case '!carrinho':
      if (context.username === 'freakyfog') {
        client.say(target, `/me só me faz falta quem não vai na bola Kappa`);
      }
      break;
    case '!subgratis':
      if (context.username === 'nesclimn10') {
        client.say(target, `/me Dê um sub grátis pro nesclimn10.`);
      }
      break;
    case '!lanchinho':
      if (context.username === 'PresidenteBolinho') {
        client.say(target, `/me É o momento perfeito para comer um bolinho.`);
      }
      break;
    default:
      break;
  }
};
