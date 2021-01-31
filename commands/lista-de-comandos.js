exports.default = (client, target, context, message) => {
  switch (message) {
    case '!comandos':
    case '!commands':
      client.say(
        target,
        `!ban | !social | !telegram | !podcast | !discord | !fofinho | !github | !eita | !calma | !oh | !donate | !prime | !picpay | !sub | !piada | !ensinamento | !amizade | !pergunta | !irritar | !carinho | !salvar | !escapar | !amor | !banheiro | !caverna | !sorvete | !sabores | !comprar | !geladeira | !pontos | !carteira | !protegido | !livecodergirls |
        ⭐Caso esteja com dúvidas é só usar o !help⭐`,
      );
      break;
    default:
      break;
  }
};
