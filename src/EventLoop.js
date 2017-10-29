/**
 * @private
 */
class EventLoop {
    /**
     * @public
     * @param {Function} [callback] Event loop callback.
     * @param {boolean} [doneOnCallback]
     * @param {int} [intervalIterations]
     */
    constructor(callback, doneOnCallback = false, intervalIterations = 1) {
        this.data = {
            callback: callback,
            doneOnCallback: doneOnCallback,
            interval: {
                iterations: intervalIterations
            },
        };
        this._done = false;
    }

    /**
     * @public
     * @param {int} index
     * @returns {boolean}
     */
    isAllowed(index) {
        if (index < 1) {
            return false;
        }
        return index % this.data.interval.iterations === 0;
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
