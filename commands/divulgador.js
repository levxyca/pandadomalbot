exports.default = (client, target, context, message) => {
    switch (message) {
        case '!caraio':
            client.say(
                target,
                `Acho que cê ta na live errada Kappa. A certa é essa aqui: twitch.tv/pachicodes`,
            );
            break;
        case '!selvagem':
            client.say(
                target,
                `Acho que cê ta na live errada Kappa. A certa é essa aqui: twitch.tv/pokemaobr`,
            );
            break;
        case '!capturar':
            client.say(
                target,
                `Acho que cê ta na live errada Kappa. A certa é essa aqui: twitch.tv/pokemaobr`,
            );
            break;
        default:
            break;
    }
};