exports.default = (client, target, context, message) => {
  switch (message) {
    case '!4noobs':
      client.say(
        target,
        `Venha aprender mais com os nossos repositórios: https://github.com/he4rt/4noobs`,
      );
      break;
    case '!he4rt':
      client.say(
        target,
        `Venha conhecer a He4rt Developers: discord.gg/7UJDgBG | twitter.com/He4rtDevs | instagram.com/heartdevs | heartdevs.com/`,
      );
      break;
    case '!he4rtlive':
      client.say(
        target,
        `Twitter: https://twitter.com/He4rtLive | Time na twitch: https://www.twitch.tv/team/he4rt`,
      );
      break;
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
  }
}