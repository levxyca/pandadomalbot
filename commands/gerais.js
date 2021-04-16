exports.default = (client, target, context, message) => {
  switch (message) {
    case '!theme':
    case '!tema':
      client.say(
        target,
        `Esse é o tema que eu uso no meu VSCode levxycAnimada https://marketplace.visualstudio.com/items?itemName=jolaleye.horizon-theme-vscode`,
      );
      break;
    case '!help':
    case '!site':
      client.say(
        target,
        `
        Site do bot mais carinhoso da twitch, leia a documentação do pandadomalbot 🐼 https://levxyca.codes/pandadomalsite/`,
      );
      break;
    case '!repopanda':
      client.say(
        target,
        `Repositório do pandadomalbot 🐼 https://github.com/levxyca/pandadomalbot`,
      );
      break;
    case '!picole':
    case '!sorvete':
      client.say(
        target,
        `/me Olha o sorveteeeeeeee, fresquinho a toda hora. Por apenas a sua ALMA 😈`,
      );
      break;
    case '!sabores':
      client.say(
        target,
        `/me Sabores da casa 🍦 Shacolate, Leite Compensado, Frocus, Napolialma, Trucado, Motankum e Vambruesha.`,
      );
      break;
    case '!lola':
    case '!meleca':
      client.say(
        target,
        `auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau `,
      );
      break;
    case '!premio':
      client.say(
        target,
        `Na nossa última live de abril, quem estiver em 1º lugar no !rank irá ganhar R$50 em produtos na Amazon, 2º lugar 1000 pandacoins🐼 e 3º lugar 500 pandacoins🐼 🏆 Para saber como subir no rank é só digitar !help`,
      );
      break;
    case '!docs':
      client.say(
        target,
        `Repositório que reúne todas as minhas anotações de estudo 📂 https://docs.levxyca.codes/`,
      );
      break;
    case '!modlider':
      client.say(
        target,
        `Veja quem é a Líder dos Mods: https://clips.twitch.tv/CarefulSassyPancakeWow-Pu6-8Hfgcg7YaPyr`,
      );
      break;
    case '!horarios':
      client.say(
        target,
        `/me Temos lives todas ás segundas, quartas e sextas das 16h até ás 18h. Normalmente nas segundas estudamos Javascript, nas quartas fazemos projetos aleatórios e nas sextas temos o nosso querido !levxoque onde queimamos hardware.`,
      );
      break;
    default:
      break;
  }
};
