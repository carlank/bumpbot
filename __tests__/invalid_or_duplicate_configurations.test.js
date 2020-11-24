const Bot = require('../src/Bot.js');

test('overrides configuration when configuring an already configured channel', () => {
    let message = '';
    const bot = new Bot();

    bot.configure('test-channel', 10, function () {
        message = 'should never happen';
    });

    bot.configure('test-channel', 10, function () {
        message = 'verified'
    });

    bot.notify('test-channel', new Date(0));
    bot.reviveChannels(new Date(15 * 1000));

    expect(message).toBe('verified');
});

test('refuses timeouts below 10 seconds', () => {
    const bot = new Bot();

    expect(() => {
        bot.configure('test-channel', 5, function () {})
    }).toThrow('10 seconds');
});
