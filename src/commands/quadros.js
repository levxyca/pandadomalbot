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
        `/me O logicadelevs 🤔 é um quadro do canal onde resolvemos problemas de lógica do URI com Javascript 💻 Lemos os problemas, rascunhamos o processamento dos dados e criamos o algoritmo 🔗 Confira o que já fizemos em: https://github.com/levxyca/uri`,
      );
      break;
    case '!livexyca':
      client.say(
        target,
        `/me Aproveite as comemorações de hoje 🥳 Para relembrar o passado: Cada sub ou 100 bits uma estrelinha no rosto e mais 5 minutos de livexyca(que vai no máximo até ás 20h)!`,
      );
      break;
    case '!co-conversinha':
      client.say(
        target,
        `/me O co-conversinha é um quadro do canal onde temos o nosso co-working/co-studyng do jeitinho da 'levxyca' ⭐ Passe um tempo por aqui a converse comigo e com o chat enquanto fazemos algo diferente.`,
      );
      break;
    default:
      break;
  }
};
