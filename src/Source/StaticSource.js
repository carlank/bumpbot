class StaticSource {
    /**
     * @param {string} message The message to respond with
     * @param {string[]} tags  The tags to respond to
     */
    constructor(message, tags) {
        this.message = message;
        this.tags = tags;
    }

    /**
     * Check if the source has any of the given tags
     * @param {string[]} tags The tags we're looking for
     * @return {boolean}      Whether one of the tags corresponds to our own
     */
    isRelevantToAnyOfThese(tags) {
        for (let tag in this.tags) {
            if (tags.includes(this.tags[tag])) {
                return true;
            }
        }
        return false;
    }

    /**
     * @return {string}
     */
    getMessage() {
        return this.message;
    }
}

module.exports = StaticSource;
