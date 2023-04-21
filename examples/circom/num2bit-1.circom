pragma circom 2.1.4;

template Example () {
    signal input in;

    signal input b0;
    signal input b1;
    signal input b2;
    signal input b3;
    
    in === 8 * b3 + 4 * b2 + 2 * b1 + b0;
    0 === b0 * (b0 - 1);
    0 === b1 * (b1 - 1);
    0 === b2 * (b2 - 1);
    0 === b3 * (b3 - 1);
}

component main { public [ b0, b1, b2, b3 ] } = Example();

/* INPUT = {
    "in": "11",
    "b0": "1",
    "b1": "1",
    "b2": "0",
    "b3": "1"
} */