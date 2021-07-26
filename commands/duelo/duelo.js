let timer;

let playerOne;
let playerTwo;

function duelo(player1, player2) {
  console.log('entrei no duelo');
  player1 = undefined;
  player2 = undefined;
}

function clear() {
  console.log('parei');
  clearInterval(timer);
}

function espera(player1, player2) {
  console.log('entrei na espera');
  exports.default = (client, target, context, message) => {
    switch (message) {
      case '!aceitar':
        console.log(context.username, player2);
        if (context.username.toLowerCase() === player2) {
          clear();

          console.log('playerTwo aceitou');

          duelo();
        }
        break;
      case '!recusar':
        console.log(context.username, player2);
        if (context.username.toLowerCase() === player2) {
          clear();
          player1 = undefined;
          player2 = undefined;
          console.log(player1, player2);
          console.log('playerTwo recusou');
        }
        break;
      default:
    }
  };
}

exports.default = (client, target, context, message) => {
  const splittedMessage = String(message).split(' ');

  if (splittedMessage[0] === '!duelo') {
    if (splittedMessage.length === 1) {
      client.say(
        target,
        `${context.username} você quer duelar contra quem mesmo?! Estou perdido 🤔`,
      );
    } else if (splittedMessage[1][0] === '@') {
      playerTwo = splittedMessage[1].substring(1);
      playerOne = context.username;
      timer = setInterval(espera, 1000, playerOne, playerTwo);
      setTimeout(clear, 30000);
    } else {
      // eslint-disable-next-line prefer-destructuring
      playerTwo = splittedMessage[1];
      playerOne = context.username;
      timer = setInterval(espera, 1000, playerOne, playerTwo);
      setTimeout(clear, 30000);
    }
  }
};
