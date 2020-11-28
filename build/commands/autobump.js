"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.number.constructor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  name: 'autobump',
  description: 'Starts autobumping',
  execute: function execute(client, message, args) {
    var channel = message.channel;
    var firstArgIsNumber = /^\d*$/.test(args[0]);
    var delay, tags;

    if (firstArgIsNumber) {
      delay = Number(args[0]);
      tags = args.slice(1);
    } else {
      tags = args;
    }

    try {
      var config = {
        callback: function callback() {
          var sourceMsg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Autobumptastic';
          var lastMessage = channel.lastMessage;

          if (lastMessage && lastMessage.author === client.user) {
            lastMessage["delete"]();
          }

          channel.send(sourceMsg);
        }
      };

      if (delay) {
        config.delay = delay;
      }

      if (tags) {
        config.tags = tags;
      }

      client.bot.configureChannel(channel.id, config);
      channel.send("Autobumping ".concat(tags ? tags.join(', ') + ' ' : '', "every ").concat(config.delay || client.bot.defaultDelay, " seconds!"));
    } catch (e) {
      channel.send('Not autobumping: ' + e);
    }
  }
};
exports["default"] = _default;