const patterns = [
  /^[Oo]+[Iiìí]*[Eeê]*\W*$/, // oi, oe, oie
  /^[Oo]+[Ll]+[Aaàá]+\W*$/, // ola
];

function execute({ context, matches }) {
  const greeting = () => {
    const word = matches[0].replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return `${greeting()} para você também ${context.username}!`;
}

module.exports = {
  patterns,
  execute,
};
