/**
 * A Bot class to wrap the various channel and source properties for a bumpbot instance (usually only one).
 * @class
 * @property {Map} channels
 * @property {Source[]} sources
 * @property {number} defaultDelay
 */
export default class Bot {
    constructor() {
        this.channels = new Map();
        this.sources = [];
        this.defaultDelay = 10 * 60;
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
    configureChannel(channel, {delay = this.defaultDelay, callback = () => {}, tags = []} = {}) {
        if(typeof channel !== 'string'){
            throw new TypeError('ChannelID is not a string');
        }
        if(typeof delay !== 'number'){
            throw new TypeError('Delay is not a number');
        }
        if(typeof callback !== 'function'){
            throw new TypeError('Callback is not a function');
        }
        if(delay < 10){
            throw 'That\'s too often! Choose a time over 10 seconds.';
        }
        this.channels.set(channel, {callback, delay, updated: new Date(), tags});
    }


    /**
     * Remove a channel from the watchlist
     * @param  {String}   channel  Channel ID
     * @return {Boolean}           True if removed, false if not present
     */
    removeChannel(channel) {
        if(typeof channel !== 'string'){
            throw new TypeError('ChannelID is not a string');
        }
        return this.channels.delete(channel);
    }

    /**
     * Revive all watched channels
     * @param  {Date}    date  Date of revival, normally now.
     */
    reviveChannels(date) {
        if(! (date instanceof Date)){
            throw new TypeError('Date is not a Date');
        }
        this.channels.forEach(async channel => {
            if (date - channel.updated > channel.delay * 1000) {
                const source = this.chooseSourceFor(channel);
                channel.callback(source ? await source.getMessage() : undefined);
            }
        });
    }

    /**
     * Configure a new source
     * @param {Source} source
     */
    addSource(source) {
        this.sources.push(source);
    }

    /**
     * Chooses a relevant source for the channel
     * @param {Object} channel
     * @return {Source}
     * @todo pick one at random
     * @todo add weighted random, where weight is # of tags in common
     */
    chooseSourceFor(channel) {
        for (const source of this.sources) {
            if (source.isRelevantToAnyOfThese(channel.tags)) {
                return source;
            }
        }
    }
}
