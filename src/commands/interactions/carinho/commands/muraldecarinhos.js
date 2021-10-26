exports.default = (client, target, context, message) => {
  const { readDataJSON } = require('../../../../utils/data');
  const muralcarinhos = readDataJSON('muralcarinhos');

  function verMural(username) {
    let indexUser = null;
    let msg =
      'As pessoas mais carinhosas do chat, com seus carinhos perfeitos PandaRoll ';

    const mural = Object.entries(muralcarinhos.users).sort(
      ([, a], [, b]) => b - a,
    );

    mural.forEach((user, index) => {
      if (user[0] === username) {
        indexUser = index;
      }
    });

    const counter = mural.length < 5 ? mural.length : 5;

    for (let i = 0; i < counter; i += 1) {
      const user = mural[i];

      msg += `${i + 1}º ${user[0]} com ${user[1]}. `;
    }

    if (indexUser != null) {
      msg += `${username} está em ${indexUser + 1}º com ${
        mural[indexUser][1]
      }.`;
    } else {
      msg += `${username} não possui carinhos perfeitos :(`;
    }

    return msg;
  }

  if (message.split(' ')[0] === '!mural') {
    let user = message.split(' ')[1];

    if (user) {
      user = user.replace('@', '');
      user = user.toLowerCase();

      context.username = user;
    }

    const msg = verMural(context.username);

    client.say(target, msg);
  }
};
