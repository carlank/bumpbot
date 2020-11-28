const {Client} = require('discord.js');

const Bot = require('./Bot');

const XkcdSource = require('./Source/XkcdSource.js');

class BotClient extends Client{
  constructor({prefix = '!'} = {}){
    super();

    this.prefix = prefix;

    this.bot = new Bot();
    this.bot.addSource(new XkcdSource());

    this.login();
  }
}

module.exports = BotClient;
