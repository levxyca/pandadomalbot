exports.default = (client, target, context, message) => {
    switch (message) {
        case '!comandos':
        case '!commands':
          client.say(target, `!ban | !social | !telegram | !discord | !fofinho | !github | !eita | !calma | !oh | !donate | !prime | !picpay | !sub | !pergunta |`);
          break;
      }
}