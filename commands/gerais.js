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

        `Criando um "clone" do Linktree com HTML e CSS`,
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
        `Na nossa última live de janeiro, quem estiver em 1º lugar no !rank irá ganhar um curso da udemy no valor de até R$36,99. Para saber como subir no rank é só digitar !help`,
      );
      break;
    case '!podcast':
      client.say(
        target,

        `Siga o Podcast Moças da Web! https://anchor.fm/mocasdaweb/`,
      );
      break;
    case '!docs':
      client.say(
        target,

        `https://levxyca.codes/docs/`,
      );
      break;
    default:
      break;
  }
};
