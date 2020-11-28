"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/web.timers");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _commands = _interopRequireDefault(require("./commands"));

var _BotClient = _interopRequireDefault(require("./BotClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var client = new _BotClient["default"]();
/* Client event handling for new discord messages */

client.on('message', function (message) {
  var channel = message.channel,
      content = message.content,
      author = message.author;
  /* Always notify the bot that a message was posted to the channel. */

  client.bot.notify(channel.id, new Date());
  /* Otherwise ignore messages that do not begin with the client's prefix or which are from a bot */

  if (!content.startsWith(client.prefix) || author.bot) {
    return;
  }
  /* Strip prefix and separate by whitespace */


  var args = message.content.slice(client.prefix.length).split(/ +/);
  /* then pull the first substring as the command */

  var command = args.shift().toLowerCase();

  if (!_commands["default"].has(command)) {
    return;
  }

  try {
    _commands["default"].get(command).execute(client, message, args);
  } catch (e) {
    console.error('Command execution error: ', e);
  }
});

var bumpLoop = function bumpLoop() {
  client.bot.reviveChannels(new Date());
};

setInterval(bumpLoop, 1000); // Nasty nasty nasty

process.on('unhandledRejection', function (error) {
  console.error('Unhandled promise rejection:', error);
});