import {expect} from "@jest/globals";

const Bot = require('../src/Bot.js');

test('responding if the messages are old', () => {
    let sent = false;
    const bot = new Bot({'test-channel': function () {
        sent = true;
    }});

    bot.notify('test-channel', new Date(20000000));

    bot.reviveChannels(new Date(10000000));

    expect(sent).toBe(true);
});

test('not responding if the messages are recent', () => {
    let sent = false;
    const bot = new Bot({'test-channel': function () {
        sent = true;
    }});

    bot.notify('test-channel', new Date(10000000));

    bot.reviveChannels(new Date(10000000));

    expect(sent).toBe(false);
});

test('not responding on irrelevant channels', () => {
    let sent = false;
    const bot = new Bot({'test-channel': function () {
        sent = true;
    }});

    bot.notify('different-channel', new Date(20000000));

    bot.reviveChannels(new Date(10000000));

    expect(sent).toBe(false);
});
