import axios from 'axios';
import Source from './Source.js';

export default class WebSource extends Source {
    constructor({url, handler, tags}){
        super(tags);
        this.url = url;
        this.handler = handler;
    }
    /**
     * @return {string}
     */
    async getMessage() {
        const response = await axios.get(this.url);
        return this.handler(response.data);
    }
}
