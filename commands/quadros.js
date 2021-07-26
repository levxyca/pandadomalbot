exports.default = (client, target, context, message) => {
  switch (message) {
    case '!pandaday':
      client.say(
        target,
        `/me O pandaday é um dia especial onde o pandadomal pode tomar conta da live toda! Como funciona? A cada 1 sub, 300 bitus ou 10 reais de doação o pandadomal fica por 10 minutos na live. Esse tempo é cumulativo!`,
      );
      break;
    case '!levxoque':
      client.say(
        target,
        `/me O Levxoque ⚡ é um quadro do canal onde quebramos... digo, brincamos com hardware ⚙️ Isso não é um tutorial, a pessoa streamer não faz ideia do que está fazendo.`,
      );
      break;
    case '!logicadelevs':
      client.say(
        target,
        `/me O logicadelevs 🤔 é um quadro do canal onde resolvemos exercícios de lógica do URI com Javascript 💻 Lemos os problemas, rascunhamos o processamento dos dados e criamos o algoritmo 🔗 Confira o que já fizemos em: https://github.com/levxyca/uri`,
      );
      break;
    default:
      break;
  }
};
