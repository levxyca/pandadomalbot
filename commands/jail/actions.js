const { lerSubs } = require('../../utils/index');
const { readDataJSON, writeDataJSON } = require('../../utils/data');
const { JAIL_STATE } = require('./state');

const arrest = (username) => {
  const state = readDataJSON('jail', JAIL_STATE);

  writeDataJSON('jail', {
    ...state,
    prisoners: [...new Set([...state.prisoners, username])],
  });

  return username;
};

/**
 * Protege um sub.
 *
 * @returns {String} o login do subscriber protegido.
 */
const protectSubscriber = () => {
  const subs = lerSubs();

  if (subs.length === 0) return null;

  const sub = subs[Math.floor(Math.random() * subs.length)];
  if (!sub) return null;

  const state = readDataJSON('jail', JAIL_STATE);
  writeDataJSON('jail', {
    ...state,
    protected: sub,
  });

  return sub;
};

module.exports = { protectSubscriber, arrest };
