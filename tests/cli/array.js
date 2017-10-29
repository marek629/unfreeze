import test from "ava";

import UnFreeze from "../../src/UnFreeze";


test("iterate array by for...of loop", t => {
    t.plan(3);

    let uf = new UnFreeze([1, 2, 3]);

    for (const element of uf) {
        console.log('array element: ' + element);
        t.pass();
    }
});


