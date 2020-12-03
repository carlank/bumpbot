import {Client} from 'discord.js';
import config from './config';
import Bot from './Bot';
import XkcdSource from './Source/XkcdSource.js';
import WebSource from './Source/WebSource.js';
/**
 * An extension of the discord.js Client to include a Bot, to simplify modular commands.
 * @class
 * @property {string} prefix
 * @property {Bot} bot
 */
export default class BotClient extends Client{
    constructor({prefix = '!'} = {}){
        super();

        this.prefix = prefix;
        this.bumpMessage = 'Remember anyone of you guys can become a champion!! Feel free to apply!';

        this.bot = new Bot();
        this.bot.addSource(new XkcdSource(['xkcd']));
        this.bot.addSource(new WebSource({
            url: 'https://meowfacts.herokuapp.com/',
            handler: data => data.data[0],
            tags: ['cat']
        }));

        this.mods = new Set();
        config.admins.forEach(id => this.mods.add(id));

        this.login();
    }

    addMod(id){
        this.mods.add(id);
    }

    isMod(id){
        return this.mods.has(id);
    }
}
