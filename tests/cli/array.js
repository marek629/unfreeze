import test from "ava";

import UnFreeze from "/UnFreeze";


test.serial("iterate array by for...of loop", t => {
    const n = 30;

    t.plan(n);

    const array = Array.from(new Array(n).keys());
    const uf = new UnFreeze(array, u => {
        console.log('event loop');
        console.log(`UnFreeze object: ${u.elementsLeft}`)
    });

    for (const element of uf) {
        console.log('array element: ' + element);
        t.pass();
    }
});

test.serial("iterate array by for...of loop driven by callback", t => {
    const n = 30;

    t.plan(n);

    const array = Array.from(new Array(n).keys());

    const callback = u => {
        console.log('event loop');
        const uf = new UnFreeze(u.elementsLeft, callback, true, 10);
        for (const element of uf) {
            console.log('array element: ' + element);
            console.log(`UnFreeze object: ${u.elementsLeft}`);
            t.pass();
        }
    };

    const uf = new UnFreeze(array, callback, true, 10);
    for (const element of uf) {
        console.log('array element: ' + element);
        t.pass();
    }
});

test.serial("iterate array by for...of loop driven by callback using timeout", t => {
    const n = 5;

    t.plan(n);

    const array = Array.from(new Array(n).keys());

    const callback = u => {
        console.log('event loop');
        const uf = new UnFreeze(u.elementsLeft);
        for (const element of uf) {
            console.log('array element: ' + element);
            t.pass();
        }
    };
    const uf = new UnFreeze(array, callback, true, 2, UnFreeze.INTERVAL_TYPE.TIMEOUT);

    return new Promise(resolve => {
        setTimeout(() => {
            for (const element of uf) {
                console.log('array element: ' + element);
                t.pass();
            }
            resolve();
        }, 3);
    });
});
