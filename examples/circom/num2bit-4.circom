pragma circom 2.1.4;

template Num2Bits (nBits) {
    signal input in;

    signal output b[nBits];

    for (var i = 0; i < nBits; i++) {
        b[i] <-- (in \ 2 ** i) % 2;
    }
    
    var acc = 0;
    for (var i = 0; i < nBits; i++) {
        acc += (2 ** i) * b[i];
    }
    in === acc;

    for (var i = 0; i < nBits; i++) {
        0 === b[i] * (b[i] - 1);
    }
}

template Main () {
    signal input in;
    signal output out;

    component n2b = Num2Bits(4);
    n2b.in <== in;
    out <== n2b.b[0];
}

component main = Main();

/* INPUT = {
    "in": "11"
} */