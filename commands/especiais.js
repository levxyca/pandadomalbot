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
        client.say(target, `/timeout nesclimn10 20000`);
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
    case '!pancada':
      if (context.username.toLowerCase() === 'vitthin') {
        const perfect = Math.floor(Math.random() * 100) + 1;

        let reply;

        if (perfect === 100) {
          reply = `${context.username} está dando a MAIOR PANCADA que eu já recebi 🐼 Obrigada por sua gentileza, eu estou muito feliz agora graças a você PandaFurious
          `;
        } else if (perfect >= 70) {
          reply = `Obrigado pela sua pancada ${context.username}! 🐼 Apesar de não ser a pancada perfeita foi uma pancada muito boa! Seu nível de pancada foi ${perfect}%.`;
        } else {
          reply = `Obrigado pela sua pancada ${context.username}! 🐼 Se é que posso chamar isso de pancada né, por eu acho que você me deu um carinho PandaRoll Seu nível de pancada foi ${perfect}%.`;
        }
        client.say(target, `/me ${reply}`);
      }
      break;
    default:
      break;
  }
};
