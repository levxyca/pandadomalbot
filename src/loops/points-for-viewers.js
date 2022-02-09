const { people } = require('../queues/people');
const { usersInChat } = require('../utilities/twitch');

const points = Number(process.env.POINTS_USUARIOS_NO_CHAT || 5);

module.exports = {
  interval: 300000, // 5min
  async execute() {
    const users = await usersInChat();

    if (!users) return;

    users.forEach(async (username) => {
      await people(username, (user) => {
        user.points += points;
        return user;
      });
    });
  },
};
