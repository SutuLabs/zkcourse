pragma circom 2.1.4;

template Num2Bits (nBits) {
    signal input in;

    signal input b[nBits];
    
    var acc;
    for (var i = 0; i < nBits; i++) {
        acc += (2 ** i) * b[i];
    }
    in === acc;

    for (var i = 0; i < nBits; i++) {
        0 === b[i] * (b[i] - 1);
    }
}

component main { public [ b ] } = Num2Bits(4);

/* INPUT = {
    "in": "11",
    "b": ["1", "1", "0", "1"]
} */
