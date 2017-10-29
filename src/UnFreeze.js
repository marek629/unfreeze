class UnFreeze {
    /**
     * @public
     * @param {Array} container
     * @param {Function} callback Event loop callback.
     * @param {boolean} doneOnCallback
     */
    constructor(container, callback, doneOnCallback = false, intervalIterations = 1) {
        this.index = 0;
        this.data = container;
        this.eventLoop = callback;
        this.doneOnEventLoop = doneOnCallback;
        this.intervalIterations = intervalIterations;
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
                    if (this.index > 0 && this.index % this.intervalIterations === 0) {
                        this.eventLoop(this);
                        done = this.doneOnEventLoop;
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
