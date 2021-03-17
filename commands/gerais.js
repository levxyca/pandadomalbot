exports.default = (client, target, context, message) => {
  switch (message) {
    case '!theme':
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
        Site do bot mais carinhoso da twitch, leia a documentação do pandadomalbot 🐼 https://levxyca.codes/site-pandadomalbot/`,
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
        // `Na nossa última live de fevereiro, quem estiver em 1º lugar no !rank irá ganhar um curso da udemy no valor de até R$36,99 🏆 Para saber como subir no rank é só digitar !help`,
        `Esse mês nós iremos sortear um curso da udemy no valor de até R$36,99 🏆 no último dia do mês`,
      );
      break;
    case '!docs':
      client.say(
        target,
        `Repositório que reúne todas as minhas anotações de estudo 📂 https://levxyca.codes/docs/`,
      );
      break;
    case '!modlider':
      client.say(
        target,
        `Veja quem é a Líder dos Mods: https://clips.twitch.tv/CarefulSassyPancakeWow-Pu6-8Hfgcg7YaPyr`,)
      break;
    default:
      break;
  }
};
