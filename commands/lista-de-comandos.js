exports.default = (client, target, context, message) => {
  switch (message) {
    case '!comandos':
    case '!commands':
      client.say(
        target,
        `!ban | !social | !telegram | !discord | !fofinho | !github | !eita | !calma | !oh | !donate | !prime | !picpay | !sub | !pergunta | !irritar | !salvar | !escapar | !amor | !caverna | !sorvete | !sabores | !comprar | !geladeira | !pontos | !protegido | Caso esteja com dúvidas e queira saber mais sobre como funciona os comandos e o que eles fazem é só usar o !help`,
      );
      break;
    default:
      break;
  }
};
