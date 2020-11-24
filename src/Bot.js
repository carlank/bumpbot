/**
 * @property {StaticSource[]} sources
 */
class Bot {
    constructor() {
        this.channels = new Map();
        this.sources = [];
    }

    /**
     * Update a channel's last updated time.
     * @param  {String} channel Channel ID
     * @param  {Date} date    Date to update to
     */
    notify(channel, date) {
        if (this.channels.has(channel)) {
            this.channels.get(channel).updated = date;
        }
    }

    /**
     * Configure a new channel
     * @param  {String}   channel  Channel ID
     * @param  {Number}   delay    Time between bumps in seconds
     * @param  {Function} callback Callback to execute upon revival
     * @param  {Array}    tags     Tags to considered relevant
     * @throws When refused
     */
    configure(channel, delay, callback, tags = []) {
        if(delay < 10){
            throw `That's too often! Choose a time over 10 seconds.`;
        }
        this.channels.set(channel, {callback, delay, updated: new Date(), tags: tags});
    }

    /**
     * Configure a new source
     * @param {StaticSource} source
     */
    addSource(source) {
        this.sources.push(source);
    }

    /**
     * Remove a channel from the watchlist
     * @param  {String}   channel  Channel ID
     * @return {Boolean}           True if removed, false if not present
     */
    remove(channel) {
        return this.channels.delete(channel);
    }

    /**
     * Revive all watched channels
     * @param  {Date}    date  Date of revival, normally now.
     */
    reviveChannels(date) {
        this.channels.forEach(channel => {
            if (date.getTime() - channel.updated.getTime() > channel.delay * 1000) {
                let source = this.chooseSourceFor(channel);
                channel.callback(source ? source.getMessage() : '');
            }
        });
    }

    /**
     * Chooses a relevant source for the channel
     * @param {Object} channel
     * @return {StaticSource}
     * @todo pick one at random
     * @todo add weighted random, where weight is # of tags in common
     */
    chooseSourceFor(channel) {
        for (let i in this.sources) {
            let source = this.sources[i];
            if (source.isRelevantToAnyOfThese(channel.tags)) {
                return source;
            }
        }
    }
}

module.exports = Bot;
