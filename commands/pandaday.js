exports.default = (client, target, context, message) => {
  switch (message) {
    case '!pandaday':
      client.say(
        target,
        `/me O pandaday é um dia especial onde o pandadomal pode tomar conta da live toda! Como funciona? A cada 1 sub, 300 bitus ou 10 reais de doação o pandadomal fica por 10 minutos na live. Esse tempo é cumulativo! O pandaday acontece toda sexta-feira.`,
      );
      break;
    default:
      break;
  }
};
