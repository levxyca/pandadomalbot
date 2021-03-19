exports.default = (client, target, context, message) => {
  switch (message) {
    case '!time':
      client.say(
        target,
        `Confira todas as mulheres do time Live Coder Girls BR aqui na twitch: https://www.twitch.tv/team/livecodergirls`,
      );
      break;
    case '!livecodergirls':
      client.say(
        target,
        `Live Coder Girls BR é um grupo de mulheres que tem como objetivo aumentar a visibilidade das mulheres que fazem live coding e trazer mais mulheres para esse cenário. Utilize !time para ver nosso time aqui na twitch. Saiba mais sobre nós em: https://livecodergirlsbr.github.io/sobre/`,
      );
      break;
    default:
      break;
  }
};
