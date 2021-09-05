exports.default = (client, target, context, message) => {
  switch (message) {
    case 'olá':
      client.say(target, `/me olá`);
      break;
    case 'eita':
      client.say(target, `levxycEita levxycEita levxycEita`);
      break;
    case 'Kappa':
      client.say(target, `Kappa`);
      break;
    default:
      break;
  }
};
