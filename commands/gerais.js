exports.default = (client, target, context, message) => {
  switch (message) {
    case '!theme':
    case '!tema':
      client.say(
        target,
        `/me Esse é o tema que eu uso no meu VSCode levxycAnimada https://marketplace.visualstudio.com/items?itemName=jolaleye.horizon-theme-vscode`,
      );
      break;
    case '!help':
    case '!site':
      client.say(
        target,
        `/me Site do bot mais carinhoso da twitch, leia a documentação do pandadomalbot 🐼 https://levxyca.codes/pandadomalsite/`,
      );
      break;
    case '!repopanda':
      client.say(
        target,
        `/me Repositório do pandadomalbot 🐼 https://github.com/levxyca/pandadomalbot`,
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
        `/me auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau `,
      );
      break;
    case '!docs':
      client.say(
        target,
        `/me Repositório que reúne todas as minhas anotações de estudo 📂 https://docs.levxyca.codes/`,
      );
      break;
    case '!modlider':
      client.say(
        target,
        `/me Veja quem é a Líder dos Mods: https://clips.twitch.tv/CarefulSassyPancakeWow-Pu6-8Hfgcg7YaPyr`,
      );
      break;
    case '!horarios':
      client.say(
        target,
        `/me Temos lives todas ás segundas, quartas e sextas das 16h até ás 18h.`,
      );
      break;
    case '!panda':
      client.say(
        target,
        `░░░░░░░░▄██▄░░░░░░▄▄░░ ░░░░░░░▐███▀░░░░░▄███▌ ░░▄▀░░▄█▀▀░░░░░░░░▀██░ ░█░░░██░░░░░░░░░░░░░░░ █▌░░▐██░░▄██▌░░▄▄▄░░░▄ ██░░▐██▄░▀█▀░░░▀██░░▐▌ ██▄░▐███▄▄░░▄▄▄░▀▀░▄██ ▐███▄██████▄░▀░▄█████▌ ▐████████████▀▀██████░ ░▐████▀██████░░█████░░ ░░░▀▀▀░░█████▌░████▀░░ ░░░░░░░░░▀▀███░▀▀▀░░░░`,
      );
      break;
    case '!rato':
      client.say(
        target,
        `/me Conheça a triste história do rato drogado: Parte 1 https://clips.twitch.tv/DistinctSullenFinchPanicVis--UOp8KLFzZnWjphI Parte 2 https://clips.twitch.tv/KitschyCrunchyGorillaFrankerZ-09ee6rAxdrpmPU6e`,
      );
      break;
    case '!uri':
      client.say(
        target,
        `/me O URI Online Judge é um repositório de problemas de programação. Os problemas são separados por tópicos (iniciante, ad-hoc, strings, etc) e por dificuldade, variando de 1 a 10. Meu perfil no uri 🔗 https://www.urionlinejudge.com.br/judge/pt/profile/565766`,
      );
      break;
    default:
      break;
  }
};
