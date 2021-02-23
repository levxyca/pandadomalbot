const { readDataJSON, writeDataJSON } = require('../../utils/data');

/**
 * Estado inicial da prisão.
 */
const INITIAL_STATE = {
  prisoners: [],
  rescuers: [],
  fugitives: [],
  protected: '',
};

const readJailState = () => {
  const content = readDataJSON('jail');
  if (!content) {
    return INITIAL_STATE;
  }

  return content;
};

const writeJailState = (state) => {
  const contents = JSON.stringify(state);
  return writeDataJSON('jail', contents);
};

module.exports = { readJailState, writeJailState };
