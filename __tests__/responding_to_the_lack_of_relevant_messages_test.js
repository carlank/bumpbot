const Bot = require('../src/Bot.js');

test('responding if the messages are old', () => {
    let sent = false;
    const bot = new Bot(120);
    bot.configure('test-channel', function () {
        sent = true;
    });
    sent = false;

    bot.notify('test-channel', new Date(10000000));

    bot.reviveChannels(new Date(10000121));

    expect(sent).toBe(true);
});

test('not responding if the messages are recent', () => {
    let sent = false;
    const bot = new Bot(120);
    bot.configure('test-channel', function () {
        sent = true;
    });
    sent = false;

    bot.notify('test-channel', new Date(10000000));

    bot.reviveChannels(new Date(10000119));

    expect(sent).toBe(false);
});

test('not responding on irrelevant channels', () => {
    let sent = false;
    const bot = new Bot(120);
    bot.configure('test-channel', function () {
        sent = true;
    });
    sent = false;

    bot.notify('different-channel', new Date(10000000));

    bot.reviveChannels(new Date(20000000));

    expect(sent).toBe(false);
});

test('not responding on removed channels', () => {
    let sent = false;
    const bot = new Bot(120);
    bot.configure('test-channel', function () {
        sent = true;
    });
    bot.remove('test-channel', function () {});
    sent = false;

    bot.notify('test-channel', new Date(10000000));

    bot.reviveChannels(new Date(20000000));

    expect(sent).toBe(false);
});

// test('responding with refusal when configuring an already configured channel', () => {
//     let message = '';
//     const bot = new Bot(120);
//     bot.configure('test-channel', function (msg) {
//         message = msg;
//     });
//     message = '';

//     bot.configure('test-channel', function () {});

//     expect(message).toBe('Already autobumping!');
// });

test('responding with refusal when removing an already removed channel', () => {
    const bot = new Bot(120);
    const successfullyRemoved = bot.remove('test-channel');

    expect(successfullyRemoved).toBe(false);
});
