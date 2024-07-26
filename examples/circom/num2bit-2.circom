pragma circom 2.1.4;

template Example () {
    signal input in;

    signal input b[4];
    
    in === 8 * b[3] + 4 * b[2] + 2 * b[1] + b[0];
    0 === b[0] * (b[0] - 1);
    0 === b[1] * (b[1] - 1);
    0 === b[2] * (b[2] - 1);
    0 === b[3] * (b[3] - 1);
}

component main { public [ b ] } = Example();

/* INPUT = {
    "in": "11",
    "b": ["1", "1", "0", "1"]
} */
