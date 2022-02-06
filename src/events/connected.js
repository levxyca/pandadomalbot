const { listJSFiles } = require('../utilities/bot-fs');

function onConnected() {
  const loops = listJSFiles('loops');

  loops.forEach((loop) => {
    setInterval(loop.execute, loop.interval);
  });
}

module.exports = { onConnected };
