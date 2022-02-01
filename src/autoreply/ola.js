const patterns = [
  /^([oO]+([iI]|[eE])+)$/, // oi, oe, oie
  /^([Oo]+[Ll]+[AÁaá]+)$/, // olá
];

function execute({ context, firstMatch }) {
  const gretting = firstMatch.charAt(0).toUpperCase() + firstMatch.slice(1);
  return `${gretting} para você também ${context.username}! levxycAnimada`;
}

module.exports = {
  patterns,
  execute,
};
