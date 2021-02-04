exports.default = (client, target, context, message, dados) => {
  const splittedMessage = String(message).split(' ');

  const { username } = context;

  if (splittedMessage[0] === '!ban') {
    if (splittedMessage.length === 1) {
      client.say(
        target,
        `${username} é para dar ban em quem mesmo?! Estou perdido 🤔`,
      );
      return;
    }

    if (splittedMessage[1][0] === '@') {
      splittedMessage[1] = splittedMessage[1].substring(1);
    }
    let randomBan = Math.floor(Math.random() * 10000);
    if (splittedMessage[1] === dados.protegido) {
      client.say(target, `/timeout ${username} 60`);
      client.say(
        target,
        `${username} mexeu com ${dados.protegido} então mexeu comigo! 🐼`,
      );
    } else if (
      String(username).toLowerCase().includes('dev') &&
      String(splittedMessage[1]).toLowerCase().includes('codes')
    ) {
      randomBan = Math.floor(Math.random() * 1000);
      if (randomBan > 0 && randomBan < 499) {
        client.say(target, `/timeout @${splittedMessage[1]} 60`);
        client.say(
          target,
          `/me @${splittedMessage[1]} perdeu a batalha de familias entra a familia dev e familia codes!`,
        );
        client.say(target, `/me FAMILIA DEV GANHOU A RINHA DE FAMILIAS!`);
      } else if (randomBan > 500 && randomBan < 1000) {
        client.say(target, `/timeout ${username} 60`);
        client.say(
          target,
          `/me ${username} perdeu a batalha de familias entra a familia dev e familia codes!`,
        );
        client.say(target, `/me FAMILIA CODES GANHOU A RINHA DE FAMILIAS!`);
      }
    } else if (
      String(username).toLowerCase().includes('codes') &&
      String(splittedMessage[1]).toLowerCase().includes('dev')
    ) {
      randomBan = Math.floor(Math.random() * 1000);
      if (randomBan > 0 && randomBan < 499) {
        client.say(target, `/timeout @${splittedMessage[1]} 60`);
        client.say(
          target,
          `/me @${splittedMessage[1]} perdeu a batalha de familias entra a familia dev e familia codes!`,
        );
        client.say(target, `/me FAMILIA CODES GANHOU A RINHA DE FAMILIAS!`);
      } else if (randomBan > 500 && randomBan < 1000) {
        client.say(target, `/timeout ${username} 60`);
        client.say(
          target,
          `/me ${username} perdeu a batalha de familias entra a familia dev e familia codes!`,
        );
        client.say(target, `/me FAMILIA DEV GANHOU A RINHA DE FAMILIAS!`);
      }
    } else if (splittedMessage.length >= 2) {
      if (randomBan > 100 && randomBan < 1000) {
        client.say(target, `/timeout @${splittedMessage[1]} 10`);
        client.say(
          target,
          `/me @${splittedMessage[1]} foi pego pelo panda do mal.`,
        );
      } else if (randomBan > 1000 && randomBan < 7000) {
        client.say(target, `/timeout ${username} 10`);
        client.say(target, `${username} foi pego pelo panda do mal.`);
      } else {
        client.say(target, `Todos escaparam do panda do mal. Grrrr`);
      }
    }
  }
};
