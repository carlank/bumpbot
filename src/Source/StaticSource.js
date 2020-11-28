import Source from './Source.js';

export default class StaticSource extends Source {
    /**
     * @param {string} message The message to respond with
     * @param {string[]} tags  The tags to respond to
     */
    constructor(message, tags) {
        super(tags);
        this.message = message;
    }

    /**
     * @return {string}
     */
    async getMessage() {
        return this.message;
    }
}
