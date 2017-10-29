import EventLoop from "/EventLoop";
import Interval from "/Interval";


/**
 * @public
 */
class UnFreeze {
    static get INTERVAL_TYPE() {
        return {
            ITERATIONS: 1,
            TIMEOUT: 3,
        }
    }

    /**
     * @public
     * @param {Array} container
     * @param {Function} [callback] Event loop callback.
     * @param {boolean} [doneOnCallback]
     * @param {int} [intervalCount]
     * @param {int} [intervalType]
     */
    constructor(container, callback, doneOnCallback = false, intervalCount = 1, intervalType = UnFreeze.INTERVAL_TYPE.ITERATIONS) {
        this.index = 0;
        this.data = container;
        this.eventLoop = new EventLoop(callback, doneOnCallback, new Interval(intervalType, intervalCount));
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
                    if (this.eventLoop.isAllowed(this.index)) {
                        this.eventLoop.run(this);
                        done = this.eventLoop.done;
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
