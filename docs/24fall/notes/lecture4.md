# 第 4 课 补充讲义

```c
pragma circom 2.1.6;

template Simple () {
    signal input a;
    signal input b;
    signal output c;
    
    c <== a * b;

}

component main { public [ a ] } = Simple();
```


Compile to R1CS:
```json
{
 "n8": 32,
 "prime": "21888242871839275222246405745257275088548364400416034343698204186575808495617",
 "nVars": 4,
 "nOutputs": 1,
 "nPubInputs": 1,
 "nPrvInputs": 1,
 "nLabels": 4,
 "nConstraints": 1,
 "useCustomGates": false,
 "constraints": [
  [
   {
    "2": "21888242871839275222246405745257275088548364400416034343698204186575808495616"
   },
   {
    "3": "1"
   },
   {
    "1": "21888242871839275222246405745257275088548364400416034343698204186575808495616"
   }
  ]
 ],
 "map": [
  0,
  1,
  2,
  3
 ],
 "customGates": [
 ],
 "customGatesUses": [
 ]
}
```

Note:
- $-1 = 2188824287183 \dots 186575808495616$
- Format refer to: [R1CS Binary Format](https://github.com/iden3/r1csfile/blob/master/doc/r1cs_bin_format.md)
- Constraints format is `A*B-C = 0`

From constraints we can get this equation:

$$
\begin{align*}
-1 \cdot w_2 \times 1 \cdot w_3 - (-1 w_1) &= 0 \\
-w_2 w_3 + w_1 &= 0 \\
w_2 w_3 &= w_1
\end{align*}
$$

$w$=wire, they could be:

- $w_0 = 1$
- $w_1 =$ c
- $w_2 =$ a
- $w_3 =$ b

ATTENTION: for the order of a/b, I am not confident about this, need further investigation.