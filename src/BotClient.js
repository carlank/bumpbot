const {Client} = require('discord.js');
const Bot = require('./Bot');
const XkcdSource = require('./Source/XkcdSource.js');


/**
 * An extention of the discord.js Client to include a Bot, to simplify modular commands.
 * @class
 * @property {string} prefix
 * @property {Bot} bot
 */
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
