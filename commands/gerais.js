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
    case '!amor':
      client.say(
        target,
        `levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor levxycAmor`,
      );
      break;
    case '!banheiro':
      client.say(
        target,
        `levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro levxycBanheiro`,
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
    default:
      break;
  }
};
