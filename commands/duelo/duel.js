exports.default = (client, target, context, message) => {
  const splittedMessage = String(message).split(' ');

  function duelo(desafiado) {
    console.log('entrei na função duelo');

    // if () {
    //   const winner = Math.floor(Math.random() * 1000);
    //   if (winner > 0 && winner < 499) {
    //     client.say(
    //       target,
    //       `Woooooooooooow! ${context.username} acaba de explodir ${desafiado} em pedacinhos!`,
    //     );
    //   } else if (winner > 500 && winner < 1000) {
    //     client.say(
    //       target,
    //       `Woooooooooooow! ${desafiado} acaba de explodir ${context.username} em pedacinhos!`,
    //     );
    //   }
    // } else {
    //   client.say(
    //     target,
    //     `Eiiiiita! ${desafiado} não aceitou duelar com você ${context.username}`,
    //   );
    // }
  }

  if (splittedMessage[0] === '!duel') {
    if (splittedMessage.length === 1) {
      client.say(
        target,
        `${context.username} você quer duelar contra quem mesmo?! Estou perdido 🤔`,
      );
    } else if (splittedMessage[1][0] === '@') {
      const pessoaDesafiada = splittedMessage[1].substring(1);
      const pessoaDesafiadora = context.username;
      console.log(pessoaDesafiadora, pessoaDesafiada);
      switch (message) {
        case '!aceitar':
          console.log(pessoaDesafiadora, pessoaDesafiada);
          console.log(context.username);
          // if (context.username.toLowerCase() === desafiado.toLowerCase()) {
          //   client.say(target, `blabla`);
          // }
          break;
        // case '!recusar':
        //   console.log(context.username, desafiado);
        //   if (context.username.toLowerCase() === desafiado.toLowerCase()) {
        //     client.say(target, `blabla2`);
        //   }
        //   break;
        default:
          // console.log(context.username, desafiado);
          // client.say(
          //   target,
          //   `Eiiiiita! ${desafiado} não aceitou duelar com você ${context.username}`,
          // );
          client.say(target, `ola`);
          break;
      }
      // setTimeout(duelo, 30000, desafiado);
    }
  }
};
