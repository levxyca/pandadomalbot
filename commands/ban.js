exports.default = (client, target, context, message) => {
  const splittedMessage = String(message).split(' ');
  if (splittedMessage[0] === '!ban') {
    const randomBan = Math.floor(Math.random() * 10000);
    if (!(splittedMessage.length >= 2 && splittedMessage[1][0] === '@')) {
      client.say(
        target,
        `Por favor, digite o @ da pessoa que você deseja banir.`,
      );
    } else {
      client.say(
        target,
        `/me ${splittedMessage[1]} recebeu um ban por não saber falar o nick da levxyca.`,
      );
    }

    const tentouBanirOChico = splittedMessage[1].toLowerCase() === '@chicocodes';
    if (splittedMessage.length >= 2 && splittedMessage[1][0] === '@') {
      if (randomBan > 100 && randomBan < 1000 && !tentouBanirOChico) {
        client.say(target, `/timeout ${splittedMessage[1]} 10`);
        client.say(target, `/me ${splittedMessage[1]} foi pego pelo panda do mal.`);
      } else if (randomBan > 1000 && randomBan < 7000 || tentouBanirOChico) {
        const timeoutDuration = tentouBanirOChico ? 1000000 : 10;
        client.say(target, `/timeout ${context.username} ${timeoutDuration}`);
        client.say(target, `${context.username} foi pego pelo panda do mal.`);
      } else {
        client.say(target, `Todos escaparam do panda do mal. Grrrr`);
      }
    }
  }
};
