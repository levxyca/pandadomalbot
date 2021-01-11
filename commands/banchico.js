const fs = require('fs')

exports.default = (client, target, context, message) => {
  if (message == '!banchico'){
    fs.readFile('banchico.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data == '' ? (data = 0) : (data = data);
      client.say(target, 'O chico já tomou TO ' + data + ' vezes!')
    });
  }
};
