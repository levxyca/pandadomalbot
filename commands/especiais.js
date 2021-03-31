exports.default = (client, target, context, message) => {
  switch (message) {
    case '!carrinho':
      if (context.username.toLowerCase() === 'freakyfog') {
        client.say(target, `/me só me faz falta quem não vai na bola Kappa`);
      }
      break;
    case '!subgratis':
      if (context.username.toLowerCase() === 'nesclimn10') {
        client.say(target, `/me Dê um sub grátis pro nesclimn10.`);
      }
      break;
    case '!lanchinho':
      if (context.username.toLowerCase() === 'presidentebolinho') {
        client.say(target, `/me É o momento perfeito para comer um bolinho.`);
      }
      break;
    case '!subgratisedu':
      if (context.username.toLowerCase() === 'eduardocodes') {
        client.say(
          target,
          `/me EduardoCodes está querendo um gift sub. Quem se habilita?`,
        );
      }
      break;
    default:
      break;
  }
};
