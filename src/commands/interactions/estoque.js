const { readDataJSON } = require('../../utils/data');

exports.default = (client, target, context, message) => {
  if (message.trim() === '!estoque') {
    const estoqueCarinhos = readDataJSON('estoque-carinhos');
    const estoqueIrritar = readDataJSON('estoque-irritar');
    if (
      context.username in estoqueCarinhos.users &&
      estoqueCarinhos.users[context.username] > 0 &&
      context.username in estoqueIrritar.users &&
      estoqueIrritar.users[context.username] > 0
    ) {
      client.say(
        target,
        `/me ${context.username} você ainda pode dar ${
          estoqueCarinhos.users[context.username]
        } carinho(s) e tentar me irritar ${
          estoqueIrritar.users[context.username]
        } vez(es) ohIPanda`,
      );
    } else if (
      context.username in estoqueCarinhos.users &&
      estoqueCarinhos.users[context.username] > 0
    ) {
      client.say(
        target,
        `/me ${context.username} você ainda pode dar ${
          estoqueCarinhos.users[context.username]
        } carinho(s) ohIPanda`,
      );
    } else if (
      context.username in estoqueIrritar.users &&
      estoqueIrritar.users[context.username] > 0
    ) {
      client.say(
        target,
        `/me ${context.username} você ainda pode tentar me irritar ${
          estoqueIrritar.users[context.username]
        } vez(es) ohIPanda`,
      );
    } else {
      client.say(
        target,
        `/me ${context.username} infelizmente você não possui nada no estoque PandaFurious`,
      );
    }
  }
};
