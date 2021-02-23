const { chatters } = require('../../utils/twitch');
const { lerSubs } = require('../../utils/index');
const { readJailState, writeJailState } = require('./state');

/**
 * Prende um usuário.
 *
 * @returns {String} o login do usuário preso.
 */
const arrestView = async () => {
  const { viewers } = await chatters();

  if (viewers.length === 0) return null;

  const viewer = viewers[Math.floor(Math.random() * viewers.length)];
  const state = readJailState();

  writeJailState({
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

  const state = readJailState();
  writeJailState({
    ...state,
    protected: sub,
  });

  return sub;
};

module.exports = { protectSubscriber, arrestView };
