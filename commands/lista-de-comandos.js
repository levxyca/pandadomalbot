exports.default = (client, target, context, message) => {
    switch (message) {
        case '!comandos':
          client.say(target, `!ban | !social | !telegram | !discord | !fofinho | !github | !eita | !calma | !oh | !donate | !prime | !picpay | !sub |`);
          break;
        case '!commands':
          client.say(target, `!ban | !social | !telegram | !discord | !fofinho | !github | !eita | !calma | !oh | !donate | !prime | !picpay | !sub |`);
          break;
      }
}