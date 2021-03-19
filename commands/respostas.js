exports.default = (client, target, context, message) => {
  switch (message) {
    case 'olá':
      client.say(target, `olá`);
      break;
    case 'eita':
      client.say(target, `levxycEita levxycEita levxycEita`);
      break;
    default:
      break;
  }
};
