import UnFreeze from "/UnFreeze";


class Interval {
    /**
     * @public
     * @param {int} intervalType
     * @param {int} intervalCount
     */
    constructor(intervalType, intervalCount) {
        this.data = {
            type: intervalType,
            count: intervalCount,
        };
        this.timestamp = Date.now();
    }

    /**
     * @public
     * @param {int} index
     * @return {boolean}
     */
    isOnTarget(index) {
        const intervalType = UnFreeze.INTERVAL_TYPE;
        switch (this.data.type) {
            case intervalType.ITERATIONS:
                return this.isIterated(index);
                break;
            case intervalType.TIMEOUT:
                return this.isTimeout;
                break;
        }
    }

    /**
     * @private
     * @param {int} index
     * @returns {boolean}
     */
    isIterated(index) {
        if (index < 1) {
            return false;
        }
        return index % this.data.count === 0;
    }

    /**
     * @private
     * @returns {boolean}
     */
    get isTimeout() {
        const result = Date.now() - this.timestamp > this.data.count;
        if (result) {
            this.timestamp = Date.now();
        }
        return result;
    }
}

export default Interval;
