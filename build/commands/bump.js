"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  name: 'bump',
  description: 'Bumps the channel once',
  execute: function execute(client, message) {
    message.channel.send('Wake up!');
  }
};
exports["default"] = _default;