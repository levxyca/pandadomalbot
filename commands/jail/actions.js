const { chatters } = require('../../utils/twitch');
const { lerSubs } = require('../../utils/index');
const { readDataJSON, writeDataJSON } = require('../../utils/data');
const { JAIL_STATE } = require('./state');

/**
 * Prende um usuário.
 *
 * @returns {String} o login do usuário preso.
 */
const arrestView = async () => {
  const { viewers } = await chatters();

  if (viewers.length === 0) return null;

  const viewer = viewers[Math.floor(Math.random() * viewers.length)];
  const state = readDataJSON('jail', JAIL_STATE);

  writeDataJSON('jail', {
    ...state,
    prisoners: [...state.prisoners, viewer],
  });

  return viewer;
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

module.exports = { protectSubscriber, arrestView };
