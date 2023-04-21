# 第 1 课 课堂练习

## 修复错误程序

```c
pragma circom 2.1.4;

template Main () {
    signal input x1;
    signal input x2;
    signal input x3;
    signal input x4;

    signal y1;
    signal y2;

    signal output out;

    // f(x) = (x1 + x2) / x3 - x4
    y1 <== x1 + x2;
    y2 <== y1 / x3; // [!code warning]
    out <== y2 - x4;
}

component main = Main();

/* INPUT = {
    "x1": "4",
    "x2": "6",
    "x3": "2",
    "x4": "1"
} */
```

```
error[T3001]: Non quadratic constraints are not allowed!
   ┌─ "main.circom":16:5
   │
16 │     y2 <== y1 / x3; // [!code error]
   │     ^^^^^^^^^^^^^^ found here  // [!code error]
   │
   = call trace:
     ->Main
```