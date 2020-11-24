const Bot = require('../src/Bot.js');

test('responding if the messages are old', () => {
    let sent = false;
    const bot = new Bot();
    bot.configure('test-channel', 10, function () {
        sent = true;
    });

    bot.notify('test-channel', new Date(0));
    bot.reviveChannels(new Date(15 * 1000));
    expect(sent).toBe(true);
});

test('not responding if the messages are recent', () => {
    let sent = false;
    const bot = new Bot();
    bot.configure('test-channel', 10, function () {
        sent = true;
    });

    bot.notify('test-channel', new Date(0));

    bot.reviveChannels(new Date(5 * 1000));

    expect(sent).toBe(false);
});

test('not responding on irrelevant channels', () => {
    let sent = false;
    const bot = new Bot();
    bot.configure('test-channel', 10, function () {
        sent = true;
    });

    bot.notify('different-channel', new Date(0));

    bot.reviveChannels(new Date(15 * 1000));

    expect(sent).toBe(false);
});

test('not responding on removed channels', () => {
    let sent = false;
    const bot = new Bot();
    bot.configure('test-channel', 10, function () {
        sent = true;
    });
    bot.remove('test-channel', function () {});

    bot.notify('test-channel', new Date(0));

    bot.reviveChannels(new Date(15 * 1000));

    expect(sent).toBe(false);
});

test('responding with refusal when removing an already removed channel', () => {
    const bot = new Bot();
    const successfullyRemoved = bot.remove('test-channel');

    expect(successfullyRemoved).toBe(false);
});
