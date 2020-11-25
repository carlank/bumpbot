const Bot = require('../src/Bot.js');
const StaticSource = require('../src/Source/StaticSource.js');

test('fetches the source with the matching tag', done => {
    let message = '';
    const bot = new Bot();

    const correctSource = new StaticSource('expected', ['tag']);

    bot.addSource(correctSource);
    bot.addSource(new StaticSource('unexpected', ['no']));

    bot.configureChannel('test-channel', {
        delay: 10,
        callback: msg => {
            try{
                expect(msg).toBe('expected')
                done();
            } catch (e){
                done(e)
            }
        },
        tags: ['tag']
    });

    bot.notify('test-channel', new Date(0));
    bot.reviveChannels(new Date(15 * 1000));

});