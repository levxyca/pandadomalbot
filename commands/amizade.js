exports.default = (client, target, context, message, dados) => {
  const splittedMessage = String(message).split(' ');
  const { username } = context;

  if (splittedMessage[0] === '!amizade' && splittedMessage.length === 2) {
    const amizade = Math.random();
    const pessoaAmiga = splittedMessage[1].replace('#', '');

    const amizadeFormated = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 4,
    }).format(amizade);

    client.say(
      target,
      `${username} tem ${amizadeFormated}% de amizade com ${pessoaAmiga}`,
    );
  }
};
