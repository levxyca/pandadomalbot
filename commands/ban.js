exports.default = (client, target, context, message) => {
    if (String(message).includes("!ban")) {
        const randomBan = Math.floor(Math.random() * 10000);
        let userBan = String(message).split(" ");
        if (userBan[1] == undefined) {
            client.say(target,`Por favor, digite o @ da pessoa que você deseja banir.`);
        } else {
            client.say(target, `/me ${userBan[1]} recebeu um ban por não saber falar o nick da levxyca.`);
        }

        if (userBan[1] != undefined) {
            if (randomBan > 100 && randomBan < 1000) {
                client.say(target, `/timeout ${userBan[1]} 10`);
                client.say(target, `/me ${userBan[1]} foi pego pelo panda do mal.`);
            } else if (randomBan > 1000 && randomBan < 7000) {
                client.say(target, `/timeout ${context.username} 10`);
                client.say(target, `${context.username} foi pego pelo panda do mal.`);
            } else {
                client.say(target, `Todos escaparam do panda do mal. Grrrr`);
            }
        }
    }
}