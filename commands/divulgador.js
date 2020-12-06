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
    default:
      break;
  }
};
