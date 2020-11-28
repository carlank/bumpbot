import dotenv from 'dotenv';
import commands from './src/commands';
import BotClient from './src/BotClient.js';

dotenv.config();


const client = new BotClient();

/* Client event handling for new discord messages */
client.on('message', message => {
    console.log(message)
    const {channel, content, author} = message;

    /* Always notify the bot that a message was posted to the channel. */
    client.bot.notify(channel.id, new Date());

    /* Otherwise ignore messages that do not begin with the client's prefix or which are from a bot */
    if(!content.startsWith(client.prefix) || author.bot) {
        return;
    }

    /* Strip prefix and separate by whitespace */
    const args = message.content.slice(client.prefix.length).split(/ +/);
    /* then pull the first substring as the command */
    const command = args.shift().toLowerCase();
    if (!commands.has(command)){
        return;
    }

    try {
        commands.get(command).execute(client, message, args);
    } catch (e) {
        console.error('Command execution error: ', e);
    }
});

const bumpLoop = () => {
    client.bot.reviveChannels(new Date());
};

setInterval(bumpLoop, 1000); // Nasty nasty nasty

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});
