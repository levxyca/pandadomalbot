exports.default = (client, target, context, message) => {
  switch (message) {
    case '!repocoders':
      client.say(
        target,
        `https://github.com/Caaddss/awesome-live-coding-streams`,
      );
      break;
    case '!theme':
      client.say(
        target,
        `https://marketplace.visualstudio.com/items?itemName=jolaleye.horizon-theme-vscode`,
      );
      break;
    case '!help':
    case '!site':
      client.say(target, `levxyca.github.io/pandadomalbot/`);
      break;
    case '!picole':
    case '!sorvete':
      client.say(
        target,
        `/me Olha o sorvete e o picole fresquinho a toda hooora. Por apenas a sua ALMA!!!`,
      );
      break;
    case '!sabores':
      client.say(
        target,
        `/me Os nossos sabores são: Shacolate, Leite Compensado, Frocus, Napolialma, Trucado, Motankum e Vambruesha.`,
      );
      break;
    case '!hoje':
      client.say(
        target,
        `/me Estamos começando um projeto do ZERO com HTML/CSS/JS. Este projeto consiste em criar um site para organizar todas as minhas anotações existentes no https://github.com/levxyca/docs`,
      );
      break;
    case '!lola':
    case '!meleca':
      client.say(
        target,
        `auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau auau `,
      );
      break;
    case '!podcast':
      client.say(
        target,
        `Siga o Podcast Moças da Web! https://anchor.fm/mocasdaweb/`,
      );
      break;
    default:
      break;
  }
};
