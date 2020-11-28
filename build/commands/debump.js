"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  name: 'debump',
  description: 'Stops autobumping.',
  execute: function execute(client, message) {
    var channel = message.channel;

    if (client.bot.removeChannel(channel.id)) {
      channel.send('Stopping autobumping');
    } else {
      channel.send('I wasn\'t doing anything?');
    }
  }
};
exports["default"] = _default;