exports.default = (client, target, context, message) => {
  switch (message) {
    case '!social':
      client.say(
        target,
        `https://discord.io/levxyca | https://github.com/levxyca | https://www.linkedin.com/in/leticiacaroline/ | https://www.instagram.com/levxyca/ | https://twitter.com/levxyca | https://t.me/newslevxyca`,
      );
      break;
    case '!telegram':
      client.say(target, `https://t.me/newslevxyca`);
      break;
    case '!discord':
      client.say(target, `https://discord.io/levxyca`);
      break;
    case '!caverna':
      client.say(
        target,
        `Uma comunidade voltada para programação em geral com o objetivo de ajudar uns aos outros, estudar coletivamente, e outros. https://discord.io/caverna ⭐Por favor, não se esqueça de passar no canal #regras para liberar o acesso á todas as salas do nosso servidor⭐`,
      );
      break;
    case '!fofinho':
      client.say(
        target,
        `Entre no zap dos fofinhos https://chat.whatsapp.com/BDHFDIn3yZM7pZwLpiQron`,
      );
      break;
    case '!github':
      client.say(target, `https://github.com/levxyca`);
      break;
    case '!podcast':
      client.say(
        target,
        `Siga o Podcast Moças da Web! https://anchor.fm/mocasdaweb/`,
      );
      break;
    case '!youtube':
      client.say(
        target,
        `Conheça o meu canal no youtube sobre tecnologia 🎥 -> https://www.youtube.com/channel/UC0oAypdScDI9WiwvebIqiOQ`,
      );
      break;
    default:
      break;
  }
};
