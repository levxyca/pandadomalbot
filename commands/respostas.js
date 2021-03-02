exports.default = (client, target, context, message) => {
  switch (message) {
    case 'olá':
      client.say(target, `olá`);
      break;
    case 'eita':
      client.say(target, `levxycEita levxycEita levxycEita`);
      break;
    case 'calma':
      client.say(
        target,
        `calma calma calma (não posso usar o emote de calma, sou um panda triste)`,
      );
      break;
    case 'o que você está fazendo?':
    case 'o que tem pra hoje?':
    case 'o que temos pra hoje?':
      client.say(
        target,
        `/me Para saber o que teremos na live de hoje é só digitar !hoje`,
      );
      break;
    default:
      break;
  }
};
