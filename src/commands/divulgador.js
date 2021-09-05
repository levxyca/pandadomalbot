exports.default = (client, target, context, message) => {
  switch (message) {
    case '!caraio':
      client.say(
        target,
        `A pachi já disse... Espera! Acho que cê ta na live errada Kappa A certa é essa aqui: twitch.tv/pachicodes`,
      );
      break;
    case '!selva':
      client.say(
        target,
        `${context.username} você conseguiu uma captura selvagem nova. Digite... Oh não! Acho que cê ta na live errada Kappa A certa é essa aqui: twitch.tv/pokemaobr`,
      );
      break;
    case '!capturar':
    case '!selvagem':
      client.say(
        target,
        `${context.username} você capturou um exemplar da linguagem... Oh não! Acho que cê ta na live errada Kappa A certa é essa aqui: twitch.tv/pokemaobr`,
      );
      break;
    case '!spin':
      if (Math.random() < 0.5) {
        client.say(
          target,
          `Parabéns sua sorte está em pleno dia, você ganhou o link da live correta ${context.username} CoolCat https://www.twitch.tv/vitthin`,
        );
      } else {
        client.say(
          target,
          `Parabéns sua sorte está em grande falta, você perdeu ${context.username} LUL porém como sou um panda generoso, eu te dou o link da live correta CoolCat https://www.twitch.tv/vitthin`,
        );
      }
      break;
    default:
      break;
  }
};
