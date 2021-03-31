const { readDataJSON, writeDataJSON } = require('../utils/data');
const { dateToString, isToday } = require('../utils/datetime');

// Usuário
// Posição desse usuário
// Data

exports.default = (client, target, context, message) => {
  if (message.trim() === '!first') {
    const state = readDataJSON('first');

    state.users = state.users ?? {};

    if (!state.last_date || !isToday(state.last_date)) {
      state.last_date = dateToString(new Date());
      state.users = {};
      state.users[context.username] = 1;
      writeDataJSON('first', state);
      return true;
    }

    if (!(context.username in state.users)) {
      state.users[context.username] = 1;
      writeDataJSON('first', state);
      return true;
    }
  }
};
