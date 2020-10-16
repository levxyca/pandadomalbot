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
    if(String(context.username).toLowerCase().includes("dev") && String(splittedMessage[1]).toLowerCase().includes("codes")){
      randomBan = Math.floor(Math.random() * 1000);
      if(randomBan > 0 && randomBan < 499){
        client.say(target,`/timeout ${splittedMessage[1]} 60`)
        client.say(target. `/me ${splittedMessage[1]} perdeu a batalha de familias entra a familia dev e familia codes!`)
        client.say(target,`/me FAMILIA DEV GANHOU A RINHA DE FAMILIAS!`)
      } else if(randomBan > 500 && randomBan < 1000){
          client.say(target,`/timeout ${context.username} 60`)
          client.say(target, `/me ${context.username} perdeu a batalha de familias entra a familia dev e familia codes!`)
          client.say(target,`/me FAMILIA CODES GANHOU A RINHA DE FAMILIAS!`)
      }
    }else if(String(context.username).toLowerCase().includes("codes") && String(splittedMessage[1]).toLowerCase().includes("dev")){
      randomBan = Math.floor(Math.random() * 1000);
      if(randomBan > 0 && randomBan < 499){
        client.say(target,`/timeout ${splittedMessage[1]} 60`)
        client.say(target. `/me ${splittedMessage[1]} perdeu a batalha de familias entra a familia dev e familia codes!`)
        client.say(target,`/me FAMILIA CODES GANHOU A RINHA DE FAMILIAS!`)
      } else if(randomBan > 500 && randomBan < 1000){
          client.say(target,`/timeout ${context.username} 60`)
          client.say(target, `/me ${context.username} perdeu a batalha de familias entra a familia dev e familia codes!`)
          client.say(target,`/me FAMILIA DEV GANHOU A RINHA DE FAMILIAS!`)
      }
    } else {
      if (splittedMessage.length >= 2 && splittedMessage[1][0] === '@') {
        if (randomBan > 100 && randomBan < 1000) {
          client.say(target, `/timeout ${splittedMessage[1]} 10`);
          client.say(target, `/me ${splittedMessage[1]} foi pego pelo panda do mal.`);
        } else if (randomBan > 1000 && randomBan < 7000) {
          client.say(target, `/timeout ${context.username} 10`);
          client.say(target, `${context.username} foi pego pelo panda do mal.`);
        } else {
          client.say(target, `Todos escaparam do panda do mal. Grrrr`);
      }
    }
    }
  }
};
