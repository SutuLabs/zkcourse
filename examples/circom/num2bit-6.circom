pragma circom 2.1.4;

template Num2Bits (nBits) {
    signal input in;

    signal output b[nBits];

    var acc = 0;
    for (var i = 0; i < nBits; i++) {
        b[i] <-- (in \ 2 ** i) % 2;
        0 === b[i] * (b[i] - 1);
        acc += (2 ** i) * b[i];
    }
    in === acc;
}

template Main () {
    signal input in;
    signal output out;

    signal allBits[4] <== Num2Bits(4)(in);
    out <== allBits[0];
}

component main = Main();

/* INPUT = {
    "in": "11"
} */
