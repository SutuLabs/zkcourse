# Num2Bit

```c
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

```

<div style="page-break-after: always;"></div>

```diff
@@ -3,24 +3,18 @@
 template Example () {
     signal input in;
 
-    signal input b0;
-    signal input b1;
-    signal input b2;
-    signal input b3;
+    signal input b[4];
     
-    in === 8 * b3 + 4 * b2 + 2 * b1 + b0;
-    0 === b0 * (b0 - 1);
-    0 === b1 * (b1 - 1);
-    0 === b2 * (b2 - 1);
-    0 === b3 * (b3 - 1);
+    in === 8 * b[3] + 4 * b[2] + 2 * b[1] + b[0];
+    0 === b[0] * (b[0] - 1);
+    0 === b[1] * (b[1] - 1);
+    0 === b[2] * (b[2] - 1);
+    0 === b[3] * (b[3] - 1);
 }
 
-component main { public [ b0, b1, b2, b3 ] } = Example();
+component main { public [ b ] } = Example();
 
 /* INPUT = {
     "in": "11",
-    "b0": "1",
-    "b1": "1",
-    "b2": "0",
-    "b3": "1"
+    "b": ["1", "1", "0", "1"]
 } */
```

<div style="page-break-after: always;"></div>

```diff
@@ -1,18 +1,22 @@
 pragma circom 2.1.4;
 
-template Example () {
+template Num2Bits (nBits) {
     signal input in;
 
-    signal input b[4];
+    signal input b[nBits];
     
-    in === 8 * b[3] + 4 * b[2] + 2 * b[1] + b[0];
-    0 === b[0] * (b[0] - 1);
-    0 === b[1] * (b[1] - 1);
-    0 === b[2] * (b[2] - 1);
-    0 === b[3] * (b[3] - 1);
+    var acc;
+    for (var i = 0; i < nBits; i++) {
+        acc += (2 ** i) * b[i];
+    }
+    in === acc;
+
+    for (var i = 0; i < nBits; i++) {
+        0 === b[i] * (b[i] - 1);
+    }
 }
 
-component main { public [ b ] } = Example();
+component main { public [ b ] } = Num2Bits(4);
 
 /* INPUT = {
     "in": "11",
```

<div style="page-break-after: always;"></div>

```diff
@@ -3,9 +3,13 @@
 template Num2Bits (nBits) {
     signal input in;
 
-    signal input b[nBits];
+    signal output b[nBits];
+
+    for (var i = 0; i < nBits; i++) {
+        b[i] <-- (in \ 2 ** i) % 2;
+    }
     
-    var acc;
+    var acc = 0;
     for (var i = 0; i < nBits; i++) {
         acc += (2 ** i) * b[i];
     }
@@ -16,9 +20,17 @@
     }
 }
 
-component main { public [ b ] } = Num2Bits(4);
+template Main () {
+    signal input in;
+    signal output out;
 
+    component n2b = Num2Bits(4);
+    n2b.in <== in;
+    out <== n2b.b[0];
+}
+
+component main = Main();
+
 /* INPUT = {
-    "in": "11",
-    "b": ["1", "1", "0", "1"]
+    "in": "11"
 } */
```

<div style="page-break-after: always;"></div>

```diff
@@ -5,19 +5,13 @@
 
     signal output b[nBits];
 
-    for (var i = 0; i < nBits; i++) {
-        b[i] <-- (in \ 2 ** i) % 2;
-    }
-    
     var acc = 0;
     for (var i = 0; i < nBits; i++) {
+        b[i] <-- (in \ 2 ** i) % 2;
+        0 === b[i] * (b[i] - 1);
         acc += (2 ** i) * b[i];
     }
     in === acc;
-
-    for (var i = 0; i < nBits; i++) {
-        0 === b[i] * (b[i] - 1);
-    }
 }
 
 template Main () {
```

<div style="page-break-after: always;"></div>

```diff
@@ -18,9 +18,8 @@
     signal input in;
     signal output out;
 
-    component n2b = Num2Bits(4);
-    n2b.in <== in;
-    out <== n2b.b[0];
+    signal allBits[4] <== Num2Bits(4)(in);
+    out <== allBits[0];
 }
 
 component main = Main();
```
