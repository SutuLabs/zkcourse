---
outline: deep
---

# 第 8 课 补充讲义

## PLONK

EC: $\mathbb{G}_1$, $\mathbb{G}_2$,
    $\mathbb{F}_r$

Generator:
$g_1 \in \mathbb{G}_1$,
$g_2 \in \mathbb{G}_2$

### Trusted setup

With shared secret $s$, generate in ceremony

$1g_1, sg_1, s^2g_1,\dots, s^{n+2}g_1$

$g_2, sg_2$

### Proof system

- commitment
- gates
- permutation
- lookup

### Gate format

$$
q_l a+ q_r b + q_o c + q_m ab + q_c = 0
$$

HINT: halo2 have some special R1CS custom gates.

choose $q_l, q_r, q_o, q_m, q_c$
per row to select gate

preprocessed(fixed at circuit creation): $\vec q_l, \vec q_c$ 

e.g.
$a+b=c, set q_l=q_r=1, q_o=-1$, rest 0
$a+b=c, set q_l=q_r=1, q_o=-1$, rest 0

| function      | $q_l$ | $q_r$ | $q_o$ | $q_m$ | $q_c$    |
| ---           | ---   | ---   | ---   | ---   | ---      |
| $a+b=c$       | 1     | 1     | -1    | 0     | 0        |
| $a \cdot b=c$ | 0     | 0     | -1    | 1     | 0        |
| bind value    | -1    | 0     | 0     | 0     | $\alpha$ |

### Example Pythagorean triple

$$
\alpha^2 +\beta^2 = \gamma^2
$$

| expresion          | gate               | polynomial                                    |
| ---                | ---                | ---                                           |
| $x_1\cdot x_1=x_2$ | $a_1\cdot b_1=c_1$ | $+0a_1 + 0b_1 - 1c_1 + 1a_1 b_1 + 0 = 0$      |
| $x_3\cdot x_3=x_4$ | $a_2\cdot b_2=c_2$ | $+0a_2 + 0b_2 - 1c_2 + 1a_2 b_2 + 0 = 0$      |
| $x_5\cdot x_5=x_6$ | $a_3\cdot b_3=c_3$ | $+0a_3 + 0b_3 - 1c_3 + 1a_3 b_3 + 0 = 0$      |
| $x_2 + x_4=x_6$    | $a_4 + b_4=c_4$    | $+1a_4 + 1b_4 - 1c_4 + 0a_4 b_4 + 0 = 0$      |
| $x_1=\alpha$       | $a_5=\alpha$       | $-1a_5 + 0b_5 + 0c_5 + 0a_5 b_5 + \alpha = 0$ |
| $x_3=\beta$        | $a_6=\beta$        | $-1a_6 + 0b_6 + 0c_6 + 0a_6 b_6 + \beta = 0$  |
| $x_5=\gamma$       | $a_7=\gamma$       | $-1a_7 + 0b_7 + 0c_7 + 0a_7 b_7 + \gamma = 0$ |

---
witness values 
$a_1, a_2, a_3, a_4 \in \mathbb{F}$, and we want to encode

| row label| value | polynomial $\bar a$ |
|  --- | --- | --- |


interpolated to find $\bar a$ lagrange interpolation.

| row label| point | evaluation |
|  --- | --- | --- |


HINT: DFT: O(nlogn)

---

pair accumulator polynomial
$P \in \mathbb{F}[x]$
accumulator polynomial represents all point up to a position.


p(0)=1
p(1) first
p(2) first and second

random challenges
$v_1, v_2$

$$
p(0)=1
\\
p(i+1)=p(x) (v_1 + X(x)+v_2 Y(x))
$$




## Reference

- [PLONK by Hand (Part 1: Setup)](https://research.metastate.dev/plonk-by-hand-part-1/)
- [Understanding PLONK](https://vitalik.ca/general/2019/09/22/plonk.html)
