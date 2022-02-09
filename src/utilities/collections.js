/**
 * Get a sample value from the collection.
 *
 * @param collection
 * @returns {*}
 */
function sample(collection) {
  return collection[Math.floor(Math.random() * collection.length)];
}

module.exports = {
  sample,
};
