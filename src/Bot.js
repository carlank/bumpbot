class Bot {

    constructor() {
        this.channels = new Map();
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
     */
    configure(channel, delay, callback) {
        this.channels.set(channel, {callback, delay, updated: new Date()});
    }

    /**
     * Remove a channel from the watchlist
     * @param  {String}   channel  Channel ID
     * @return {Boolean}           True if removed, false if not present
     */
    remove(channel, callback) {
        return this.channels.delete(channel);
    }

    /**
     * Revive all watched channels
     * @param  {Date}    date  Date of revival, normally now.
     */
    reviveChannels(date) {
        // console.log('revive');
        this.channels.forEach(channel => {
            console.log((date.getTime() - channel.updated.getTime())/ 1000, channel.delay)
            if (date.getTime() - channel.updated.getTime() > channel.delay * 1000) {
                channel.callback();
            }
        });
    }
}

module.exports = Bot;