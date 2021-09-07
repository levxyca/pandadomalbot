exports.default = (client, target, context, message) => {
  switch (message) {
    case '!comandos':
    case '!commands':
      client.say(
        target,
        `/me !ban | !first | !followage | !social | !telegram | !podcast | !discord | !fofinho | !github | !eita | !calma | !oh | !donate | !prime | !picpay | !sub | !piada | !ensinamento | !amizade | !pergunta | !irritar | !carinho | !salvar | !escapar | !presos | !caverna | !pontos | !rank | !protegido | !repopanda |
        ⭐ Caso esteja com dúvidas ou queira ver a lista completa é só usar o !help ⭐`,
      );
      break;
    default:
      break;
  }
};
