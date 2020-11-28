"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  name: 'help',
  description: 'Lists all available commands!',
  execute: function execute(client, message, args) {
    message.channel.send('test');
  }
};
exports["default"] = _default;