/**
 * Obtém um valor aleatório do Array.
 *
 * @param collection
 * @returns {*}
 */
function sample(collection) {
  const length = collection == null ? 0 : collection.length;
  return length ? collection[Math.floor(Math.random() * length)] : undefined;
}

module.exports = { sample };
