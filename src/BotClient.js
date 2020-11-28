import {Client} from 'discord.js';
import Bot from './Bot';
import XkcdSource from './Source/XkcdSource.js';

/**
 * An extention of the discord.js Client to include a Bot, to simplify modular commands.
 * @class
 * @property {string} prefix
 * @property {Bot} bot
 */
export default class BotClient extends Client{
    constructor({prefix = '!'} = {}){
        super();

        this.prefix = prefix;

        this.bot = new Bot();
        this.bot.addSource(new XkcdSource());

        this.login();
    }
}
