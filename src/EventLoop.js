/**
 * @private
 */
class EventLoop {
    /**
     * @public
     * @param {Function} [callback] Event loop callback.
     * @param {boolean} [doneOnCallback]
     * @param {Interval} [interval]
     */
    constructor(callback, doneOnCallback = false, interval) {
        this.data = {
            callback: callback,
            doneOnCallback: doneOnCallback,
            interval: interval,
        };
        this._done = false;
    }

    /**
     * @public
     * @param {int} index
     * @returns {boolean}
     */
    isAllowed(index) {
        if (!this.data.callback || typeof this.data.callback !== 'function') {
            return false;
        }
        return this.data.interval.isOnTarget(index);
    }

    /**
     * @public
     * @param {UnFreeze} uf
     * @returns {void}
     */
    run(uf) {
        this.data.callback(uf);
        this._done = true;
    }

    /**
     * @public
     * @returns {boolean}
     */
    get done() {
       if (this._done) {
           return this.data.doneOnCallback;
       }
       return false;
    }
}

export default EventLoop;
