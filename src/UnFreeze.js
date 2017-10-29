class UnFreeze {
    /**
     * @public
     * @param {Array} container
     */
    constructor(container) {
        this.index = 0;
        this.data = container;
    }

    /**
     * @public
     * @returns {{next: (function())}}
     */
    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.index < this.data.length) {
                    return {value: this.data[this.index++], done: false};
                } else {
                    this.index = 0; //If we would like to iterate over this again without forcing manual update of the index
                    return {done: true};
                }
            }
        }
    }
}

export default UnFreeze;
