const { bot } = require("../../index");

module.exports = {
    name: "debump",
    description: "debump command",

    async execute(client, message, args) {
      const {channel, content, author} = message;
      bot.notify(channel.id, new Date());

      if(bot.removeChannel(channel.id)){
        channel.send('Stopping autobumping');
      } else {
        channel.send(`I wasn't doing anything?`);
      }
    }
}