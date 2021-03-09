exports.default = (client, target, context, message) => {
  // eslint-disable-next-line global-require
  const { readDataJSON } = require('../utils/data');
  const pontos = readDataJSON('pontos');

  function verRanking(username) {
    let indexUser = null;
    let msg = 'O ranking atual é ';

    const ranking = Object.entries(
      Object.fromEntries(Object.entries(pontos).sort(([, a], [, b]) => b - a)),
    );

    ranking.forEach((user, index) => {
      if (user[0] === username) {
        indexUser = index;
      }
    });

    let counter = ranking.length < 3 ? ranking.length : 3;

    for (let i = 0; i < counter; i += 1) {
      const user = ranking[i];

      msg += `${i + 1}º ${user[0]} com ${user[1]} pontos. `;
    }

    if (indexUser != null) {
      msg += `${username} está ${indexUser + 1}º com ${
        ranking[indexUser][1]
      } pontos`;
    } else {
      msg += `${username} não possui pontos :(`;
    }

    return msg;
  }

  if (message.split(' ')[0] === '!rank') {
    let user = message.split(' ')[1];

    if (user) {
      user = user.replace('@', '');
      user = user.toLowerCase();

      context.username = user;
    }

    const msg = verRanking(context.username);

    client.say(target, msg);
  }
};
