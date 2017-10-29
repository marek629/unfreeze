/**
 * @public
 */
class UnFreeze {
    /**
     * @public
     * @param {Array} container
     * @param {Function} [callback] Event loop callback.
     * @param {boolean} [doneOnCallback]
     * @param {int} [intervalIterations]
     */
    constructor(container, callback, doneOnCallback = false, intervalIterations = 1) {
        this.index = 0;
        this.data = container;
        this.eventLoop = {
            callback: callback,
            doneOnCallback: doneOnCallback,
            interval: {
                iterations: intervalIterations
            },
        };
    }

    /**
     * @public
     * @returns {{next: (function())}}
     */
    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.index < this.data.length) {
                    let done = false;
                    if (this.index > 0 && this.index % this.eventLoop.interval.iterations === 0) {
                        this.eventLoop.callback(this);
                        done = this.eventLoop.doneOnCallback;
                    }
                    return {value: this.data[this.index++], done: done};
                } else {
                    this.index = 0; //If we would like to iterate over this again without forcing manual update of the index
                    return {done: true};
                }
            }
        }
    }

    /**
     * @public
     * @returns {Array.<T>}
     */
    get elementsLeft() {
        return this.data.slice(this.index);
    }
}

export default UnFreeze;
