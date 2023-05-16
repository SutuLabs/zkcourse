# Lecture 7: Arithmetisations

Arithmetisation is the encoding of a computation as an algebraic constraint satisfaction problem. This reduces the complexity of verifying its correctness to a few probabilistic algebraic checks. In a proof system, the choice of arithmetisation limits the corresponding range of IOPs that can be used to check it (see Figure 1).

![](components_of_proof_system_en.drawio.svg)

Figure 1: The components of a proof system. Recall from Lecture 3 (Commitment Schemes) that a commitment scheme can be used to compile an interactive oracle proof (IOP) into a proof system.

## Quadratic Arithmetic Programs (QAPs)

The Quadratic Arithmetic Program (QAP) [9] is a way to translate statements into a system of quadratic equations over polynomials. They can be checked by linear interactive proofs (LIPs) [10], algebraic IOPs [6], multilinear IOPs ([14], [15]). Any circuit with multiplicative complexity $n$ can be translated to a QAP over degree- $n$ polynomials.

::: tip Definition 1.1. [Quadratic Arithmetic Program (QAP)]

A Quadratic Arithmetic Program Q of degree $d$ and size $m$ consists of polynomials $\left\{L_{j}(X)\right\},\left\{R_{j}(X)\right\},\left\{O_{j}(X)\right\}, j \in[0, \ldots, m-1]$, and a target polynomial $T(X):=\prod(X-i)_{0=1}^{d-1}$ of degree $d$. An assignment $\left(1, x_{1}, \ldots, x_{m-1}\right)$ **satisfies** $Q$ if

$$
T(X) \mid P(X), P(X):=L(X) \cdot R(X)-O(X)
$$

where $L(X):=\sum_{j=0}^{m-1} x_{j} \cdot L_{j}(X), R(X):=\sum_{j=0}^{m-1} x_{j} \cdot R_{j}(X), O(X):=\sum_{j=0}^{m-1} x_{j} \cdot O_{j}(X)$.

:::

### Rank-1 Constraint System (R1CS)

Arithmetic circuits can be expressed a simplified form known as Rank-1 Constraint System (RlCS), which can in turn be transformed into a QAP.


| Argument system | Arithmetization | Information-theoretic protocol | Cryptographic compiler |
| :---: | :---: | :---: | :---: |
| Groth16 [10] | R1CS | linear interactive proof (LIP) | bilinear pairings |
| Marlin [6] | R1CS | algebraic holographic proof (AHP) | adapted KZG commitment |
| Spartan [15] | R1CS | variant of sumcheck protocol | SPARK |
| Dory [14] | R1CS | multilinear IOP | bilinear pairings |
| Nova [13] | Relaxed R1CS | multilinear IOP | multilinear PCS |

Table 1: Examples of proof systems which make use of R1CS arithmetisation.

In Lecture 2 (Circom 1), we saw the Is Zero circuit, which checks a claim about whether a given value is zero. Let's convert Is eero into an R1CS circuit, and then transform it into a QAP.

```c
template IsZero(){
    signal input in;
    signal output out;

    signal inv;

    inv <−− in != 0 ? 1 / in : 0;

    out <== −in * inv + 1;
    in * out === 0;
}
```

Listing 1: The Iszero circuit, taken from comparators. circom in circomlib.

![](iszero_circuit_dag.png)

The circom Iszero program can be "flattened" into four constraints, each of the form left o right = output:

$$
\begin{array}{r}
w_{1} \cdot(-1)=w_{2} \\
w_{2} \cdot w_{3}=w_{4} \\
w_{4}+1=w_{5} \\
w_{1} \cdot w_{5}=w_{6}
\end{array}
$$

In the arithmetic circuit representation (left), each of these constraints corresponds to an addition or multiplication gate.

The prover is claiming to know some legal assignment $\vec{x}=\left(x_{1}, x_{2}, x_{3}, x_{4}, x_{5}, x_{6}\right)$, so that when each value $a_{i}$ is assigned to corresponding wire $w_{i}$, and $w_{6}=0$, the circuit is satisfied. For each gate $g_{i}$, we create three wire vectors $\overrightarrow{l_{i}}, \vec{r}_{i}, \vec{o}_{i}$, containing the coefficients of each variable $w_{j}$ at the gate. The wire vectors also include a constant term $w_{0}$ :

$$
g_0 : w_1 \cdot (-1) = w_2
\;
\left\vert
\;
\begin{aligned}
\begin{array}{cccccccccc}
& & w_0 & w_1 & w_2 & w_3 & w_4 & w_5 & w_6 & \\
\vec{l}_0= & ( & 0 & 1 & 0 & 0 & 0 & 0 & 0 & ) \\
\vec{r}_0= & ( & -1 & 0 & 0 & 0 & 0 & 0 & 0 & ) \\
\vec{o}_0= & ( & 0 & 0 & 1 & 0 & 0 & 0 & 0 & )
\end{array}
\end{aligned}
\right. \;
,
$$

$$
g_1 : w_2 \cdot w_3 = w_4
\;
\left\vert
\;
\begin{aligned}
\begin{array}{cccccccccc}
& & w_0 & w_1 & w_2 & w_3 & w_4 & w_5 & w_6 & \\
\vec{l}_1= & ( & 0 & 0 & 1 & 0 & 0 & 0 & 0 & ) \\
\vec{r}_1= & ( & 0 & 0 & 0 & 1 & 0 & 0 & 0 & ) \\
\vec{o}_1= & ( & 0 & 0 & 0 & 0 & 1 & 0 & 0 & )
\end{array}
\end{aligned}
\right. \;
,
$$

$$
\begin{aligned}
g_2 : w_4 +1 = w_5 \\
(w_4 +1) \cdot 1 = w_5
\end{aligned}

\;
\left\vert
\;
\begin{aligned}
\begin{array}{cccccccccc}
& & w_0 & w_1 & w_2 & w_3 & w_4 & w_5 & w_6 & \\
\vec{l}_2= & ( & 1 & 0 & 0 & 0 & 1 & 0 & 0 & ) \\
\vec{r}_2= & ( & 1 & 0 & 0 & 0 & 0 & 0 & 0 & ) \\
\vec{o}_2= & ( & 0 & 0 & 0 & 0 & 0 & 1 & 0 & )
\end{array}
\end{aligned}
\right. \;
,
$$

$$
g_3 : w_1 \cdot w_5 = w_6
\;
\left\vert
\;
\begin{aligned}
\begin{array}{cccccccccc}
& & w_0 & w_1 & w_2 & w_3 & w_4 & w_5 & w_6 & \\
\vec{l}_3= & ( & 0 & 1 & 0 & 0 & 0 & 0 & 0 & ) \\
\vec{r}_3= & ( & 0 & 0 & 0 & 0 & 0 & 1 & 0 & ) \\
\vec{o}_3= & ( & 0 & 0 & 0 & 0 & 0 & 0 & 1 & )
\end{array}
\end{aligned}
\right. \;
,
$$

Now, we collect each of the left $l_{i}$ wire vectors into a matrix $\mathcal{L}=\left(\overrightarrow{l_{0}}, \overrightarrow{l_{1}}, \overrightarrow{l_{2}}, \overrightarrow{l_{3}}\right)$, and likewise for the right $\mathcal{R}=\left(\vec{r}_{0}, \vec{r}_{1}, \vec{r}_{2}, \vec{r}_{3}\right)$ and output $\mathcal{O}=\left(\vec{o}_{0}, \vec{o}_{1}, \vec{o}_{2}, \vec{o}_{3}\right)$ vectors:

$$
\newcommand{\sp}[1]{\hspace{0.3em} #1 \hspace{0.3em}}
$$

$$
\begin{aligned}
& \mathcal{L}=
\begin{array}{cc}

\begin{array}{cc}

\begin{array}{ccccccc}
w_{0} & w_{1} & w_{2} & w_{3} & w_{4} & w_{5} & w_{6}\\
\end{array}
& \\
\left(\begin{array}{ccccccc}
\sp{0} & \sp{1} & \sp{0} & \sp{0} & \sp{0} & \sp{0} & \sp{0} \\
0 & 0 & 1 & 0 & 0 & 0 & 0 \\
1 & 0 & 0 & 0 & 1 & 0 & 0 \\
0 & 1 & 0 & 0 & 0 & 0 & 0
\end{array}\right)
&
\begin{array}{l}
\vec{l}_{0} \\
\vec{l}_{1} \\
\vec{l}_{2} \\
\vec{l}_{3}
\end{array}
\end{array}
\end{array} \quad ,
\end{aligned}
$$

$$
\begin{aligned}
& \mathcal{R}=
\begin{array}{cc}

\begin{array}{cc}

\begin{array}{ccccccc}
w_{0} & w_{1} & w_{2} & w_{3} & w_{4} & w_{5} & w_{6}\\
\end{array}
& \\
\left(\begin{array}{ccccccc}
\sp{-1} & \sp{0} & \sp{0} & \sp{0} & \sp{0} & \sp{0} & \sp{0} \\
0 & 0 & 0 & 1 & 0 & 0 & 0 \\
1 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 1 & 0
\end{array}\right)
&
\begin{array}{l}
\vec{r}_{0} \\
\vec{r}_{1} \\
\vec{r}_{2} \\
\vec{r}_{3}
\end{array}
\end{array}
\end{array} \quad ,
\end{aligned}
$$

$$
\begin{aligned}
& \mathcal{O}=
\begin{array}{cc}

\begin{array}{cc}

\begin{array}{ccccccc}
w_{0} & w_{1} & w_{2} & w_{3} & w_{4} & w_{5} & w_{6}\\
\end{array}
& \\
\left(\begin{array}{ccccccc}
\sp{0} & \sp{0} & \sp{1} & \sp{0} & \sp{0} & \sp{0} & \sp{0} \\
0 & 0 & 0 & 0 & 1 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 1 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 1
\end{array}\right)
&
\begin{array}{l}
\vec{o}_{0} \\
\vec{o}_{1} \\
\vec{o}_{2} \\
\vec{o}_{3}
\end{array}
\end{array}
\end{array} \quad .
\end{aligned}
$$

The $\mathcal{L}, \mathcal{R}, \mathcal{O}$ matrices, along with our witness vector $\vec{x}=\left(1, x_{1}, x_{2}, x_{3}, x_{4}, x_{5}, x_{6}\right)$, gives the $\mathrm{R} 1 \mathrm{CS}$ form of the Iszero circuit. A satisfying $\vec{x}$ fulfils the equation $\mathcal{L} \cdot \vec{x}+\mathcal{R} \cdot \vec{x}-\mathcal{O} \cdot \vec{x}=0$.

### R1CS to QAP

Recall the definition 1.1 of a QAP of degree $d$ and size $m$. We can think of the degree $d$ as the number of constraints, and the size $m$ as the number of variables. In our example, we have $d=4, m=7$. By converting the R1CS form to a QAP, we have reduced our check from three matrix multiplications to a single polynomial identity.

To convert our $\mathcal{L}, \mathcal{R}, \mathcal{O}$ matrices into $L(X), R(X), O(X)$ polynomials, let's examine the properties these polynomials should have. At each variable $j$ and gate $i$, we want $L_{j}(i)$ to select the coefficient of variable $w_{j}$ at the left wire of gate $g_{i}$; and similarly for $R_{j}(i), O_{j}(i)$. In other words:

$$
L_{j}(i)=\mathcal{L}_{i j}=\vec{l}_{i}[j], R_{j}(i)=\mathcal{R}_{i j}=\vec{r}_{i}[j], O_{j}(i)=\mathcal{O}_{i j}=\vec{o}_{i}[j]
$$

Let's take a look at gate $g_{2}(i=2): w_{4}+1=w_{5}$.

$$
\begin{aligned}
L(2) & =x_{0} \cdot L_{0}(2) && +x_{1} \cdot L_{1}(2) && +x_{2} \cdot L_{2}(2) && +x_{3} \cdot L_{3}(2) && +x_{4} \cdot L_{4}(2) && +x_{5} \cdot L_{5}(2) && +x_{6} \cdot L_{6}(2) \\
& =x_{0} \cdot 1 &&+x_{1} \cdot 0 &&+x_{2} \cdot 0 &&+x_{3} \cdot 0 &&+x_{4} \cdot 1 &&+x_{5} \cdot 0 &&+x_{6} \cdot 0 \\
& =x_{0}+x_{4} && =1+x_{4} \text{.}
\end{aligned}
$$


$L(2)$ returns us the left wire value of $g_{2}$. Similarly:

$$
\begin{aligned}
R(2) & =x_{0} \cdot R_{0}(2) &&+x_{1} \cdot R_{1}(2) &&+x_{2} \cdot R_{2}(2) &&+x_{3} \cdot R_{3}(2) &&+x_{4} \cdot R_{4}(2) &&+x_{5} \cdot R_{5}(2) &&+x_{6} \cdot R_{6}(2) \\
& =x_{0} \cdot 1 && + x_{1} \cdot 0 && + x_{2} \cdot 0 && + x_{3} \cdot 0 && + x_{4} \cdot 0 && + x_{5} \cdot 0 && + x_{6} \cdot 0 \\
& =x_{0}=1 \text{,}
\end{aligned}
$$

$$
\begin{aligned}
O(2)& =x_{0} \cdot O_{0}(2)&&+x_{1} \cdot O_{1}(2)&&+x_{2} \cdot O_{2}(2)&&+x_{3} \cdot O_{3}(2) \quad&&+x_{4} \cdot O_{4}(2)&&+x_{5} \cdot O_{5}(2)&&+x_{6} \cdot O_{6}(2)\\
& =x_{0} \cdot 0 && + x_{1} \cdot 0 && + x_{2} \cdot 0 && + x_{3} \cdot 0 && + x_{4} \cdot 0 && + x_{5} \cdot 1 && + x_{6} \cdot 0 \\
& =x_{5}
\end{aligned}
$$

So $P(2)=L(2) \cdot R(2)-O(2)=\left(1+x_{4}\right) \cdot 1-x_{5}=0 \Longleftrightarrow \mathrm{x}_{0}, \ldots, x_{6}$ fulfil gate $g_{2}$. Notice that the target polynomial $T(X)$ is constructed to evaluate to vanish at the gate indices $j \in\{0, \ldots, d-1\}$. In other words, if $T(X) \mid P(X)$, then our witness $\vec{x}=\left(1, x_{1}, \ldots, x_{6}\right)$ fulfils $P(X)$ at every gate.

(NB: To construct the $L_{j}$ 's, we set each $L_{j}$ to be the interpolation polynomial of the values in column $\mathcal{L}[j]$ at the evaluation points $(0, \ldots, d-1)$; and similarly for the $R_{j}$ 's and $O_{j}$ 's.)

:::tip Math building block: Lagrange interpolation

Given points and evaluations $\left\{\left(x_{i}, y_{i}\right)\right\}_{i=0}^{d-1}$, we can construct an **interpolation polynomial** $\mathcal{I}(X)$ such that $\mathcal{I}\left(x_{i}\right)=y_{i}$ :

$$
\mathcal{I}(X):=\sum_{i=0}^{d-1} y_{i} \cdot \mathcal{L}_{i}(X)
$$

where $\mathcal{L}_{i}(X)$ is the **Lagrange basis polynomial** over the evaluation domain $\left\{x_{0}, \ldots, x_{d-1}\right\}$ :

$$
\mathcal{L}_{i}(X):=\prod_{x_{j} \neq x_{i}} \frac{X-x_{j}}{x_{i}-x_{j}}=\left\{\begin{array}{l}
1 \text { if } X=x_{i} \\
0 \text { otherwise }
\end{array}\right.
$$

When the evaluation domain is $\{0, \ldots, d-1\}$, we get $\mathcal{L}_{i}(X)=1$ if $X=i$, and 0 otherwise.

When the evaluation domain is $\left\{\omega^{0}, \ldots, \omega^{n-1}\right\}$, we get $\mathcal{L}_{i}(X)=1$ if $X=\omega^{i}$, and 0 otherwise.

:::

The QAP arithmetisation induces protocols that verify equations on a secret element in the exponent. Since we currently only have cryptographic $k$-linear maps for $k=2$ (via elliptic curve pairings), quadratic constraints are the most general form that these protocols can work with. However, a separate class of arithmetisations enables a more flexible constraint format, with constraints of degree higher than two. The following three sections are adapted from [7].

| Argument system  | Arithmetization | Information-theoretic protocol | Cryptographic compiler |
| :---: | :---: | :---: | :---: |
| STARK [2] | AIR |  algebraic linking IOP <br /> (uses FRI as RS-IOPP) | Merkle trees |
| PlonK [8] | RAP | polynomial IOP | KZG commitment |
| Halo 2 ([3],[4]) | RAP | polynomial IOP | inner product argument |

Table 2: Examples of proof systems which make use of AIR, PAIR, and RAP arithmetisations.

## Algebraic Intermediate Representations (AIR)

An _Algebraic Intermediate Representation (AIR)_ [16] is a representation of a program consisting of _uniform computations_. An AIR $P$ over a field $\mathbb{F}$ is defined by a set of multivariate _constraint polynomials_ $\left\{f_{i}\left(X_{1}, \ldots, X_{2 w}\right)\right\} \in \mathbb{F}^{d}\left[X_{1}, \ldots, X_{2 w}\right]$. An execution trace $T$ for $P$ consists of $n$ rows of width $w ; T$ is a _valid_ execution trace if all $f_{i}(T[j], T[j+1])=0$ for any $j \in\{1, \ldots, n\}$. In the context of a virtual machine, $P$ verifies $n$ steps of a state transition function over $w$ registers.

:::tip AIR for Fibonacci sequence

We can specify an AIR program for the Fibonacci sequence using two state transition polynomials:

$$
\begin{aligned}
f_{1}\left(X_{1}, X_{2}, X_{1}^{\text {next }}, X_{2}^{\text {next }}\right)
& =A^{\text {next }}-(B+A) ; f_{2}\left(X_{1}, X_{2}, X_{1}^{\text {next }}, X_{2}^{\text {next }}\right)\\
& =B^{\text {next }}-\left(B+A^{\text {next }}\right) .
\end{aligned}
$$

As an example, let's check that the state transition holds on row $i=2$ :

$$
\begin{aligned}
& f_{1}\left(X_{1}, X_{2}, X_{1}^{\text {next }}, X_{2}^{\text {next }}\right)=5-(3+2)=0; \\
& f_{2}\left(X_{1}, X_{2}, X_{1}^{\text {next }}, X_{2}^{\text {next }}\right)=8-(5+3)=0. \\
\end{aligned}
$$

| $step$ | $a$ | $b$ |
| :---: | :---: | :---: |
| $i=1$ | 1 | 1 |
| $i=2$ | 2 | 3 |
| $i=3$ | 5 | 8 |
| $i=4$ | 13 | 21 |

Exercise: can you modify this program to make an AIR of width 3? 

:::

:::tip Math building block

Roots of unity. AIR encodes a column of values $\vec{v}=\left(v_{1}, \ldots, v_{n}\right)$ as its Lagrange interpolation polynomial over the evaluation domain $\left\{\omega, \ldots, \omega^{n}\right\}$, where $\omega$ is an $n$-th root of unity in a multiplicative subgroup of order $n$ :

$$
V(X)=\left\{\begin{array}{l}
\vec{v}[i] \text { when } X=\omega^{i} \\
0 \text { otherwise. }
\end{array}\right.
$$

This lets us "shift" up and down rows by multiplying by a factor of $\omega$. For instance:

$$
V^{\text {next }}(X)=V(\omega X), V^{\text {prev }}(X)=V\left(\omega^{-1} X\right) \text {. }
$$

:::

## Preprocessed AIR (PAIR)

In a _Preprocessed AIR_, or PAIR, we introduce $t$ predefined columns $\left\{c_{i}\right\}_{i=1}^{t} \in \mathbb{F}^{n}$ to the execution trace, in addition to the $w$ witness columns supplied by the prover. These are used to introduce non-uniform constraints to the AIR, and are often referred to as "selectors".

:::tip PAIR for addition and multiplication

Let's construct a PAIR where we perform an addition on some rows, and a multiplication on other rows. For this purpose, we define the "addition selector" $s_{1}$, and the "multiplication selector" $s_{2}$. The constraint polynomial is:

$$
f\left(X_{1}, X_{2}, X_{1}^{\text {next }}, X_{2}^{\text {next }}\right)=S_{1} \cdot\left(A^{\text {next }}-(A+B)\right)+S_{2} \cdot\left(A^{\text {next }}-A \cdot B\right) .
$$

Let's check the constraint on row $i=1$, where only the addition operation is enabled:

$$
f\left(X_{1}, X_{2}, X_{1}^{\text {next }}, X_{2}^{\text {next }}\right)
=1\cdot(1-(0+1))+0\cdot(1-(0\cdot 1))=0
$$

and row $row=3$, where both operations are enabled:

$$
f\left(X_{1}, X_{2}, X_{1}^{\text {next }}, X_{2}^{\text {next }}\right)
=1\cdot(4-(2+2))+1\cdot(4-(2\cdot 2))=0
$$

| $step$ | $s_1$ | $_2$ | $a$ | $b$ |
| :---: | :---: | :---: | :---: | :---: |
| $i=1$ | 1 | 0 | 0 | 1 |
| $i=2$ | 0 | 1 | 1 | 2 |
| $i=3$ | 1 | 1 | 2 | 2 |
| $i=4$ | 0 | 1 | 4 | 0 |

:::

## Randomised AIR with Preprocessing (RAP)

A _Randomised AIR with Preprocessing (RAP)_ allows for rounds of interaction to introduce verifier randomness. In a later round, randomness from the earlier rounds can be used as variables in constraints. This enables _local_ constraints (between adjacent rows) to check global properties.

:::tip RAP for multiset equality

Suppose that we had a width-2 AIR and wanted to check that the values in one column $\left(a_{1}, \ldots, a_{n}\right)$ was a complete permutation of the other $\left(b_{1}, \ldots, b_{n}\right)$. This is called a multiset equality check. It suffices to check that, for a uniformly randomly chosen $\gamma \in \mathbb{F}$

$$
\prod_{i \in[n]}\left(a_{i}+\gamma\right)=\prod_{i \in[n]}\left(b_{i}+\gamma\right) \Longrightarrow \prod_{i \in[n]}\left(a_{i}+\gamma\right) /\left(b_{i}+\gamma\right)=1
$$

To check this "grand product" over all rows of both columns, the prover uses the verifier challenge $\gamma$ to construct a running product $\vec{z}=\left(1, z_{1}, \ldots, z_{n}\right)$, such that

$$
z_{i}=\prod_{1 \leq j \leq i}\left(a_{j}+\gamma\right) /\left(b_{j}+\gamma\right)
$$

At the final row $i=n$, we are left to check that $z_{n}=\prod_{i \in[n]}\left(a_{i}+\gamma\right) /\left(b_{i}+\gamma\right)=1$. We also have to enforce on the first row $i=1$ that $z_{1}=1$.

Exercise: can you write a constraint that applies only on the row $i=1$ ? (Hint: $\mathcal{L}_{1}(X)=1$ when $i=1$, 0 otherwise; so a constraint $\mathcal{L}_{1}(X) \cdot f(X)$ is enforced only on the row $i=1$.) 

To illustrate the multiset equality check, let us consider an example where $b$ simply contains a shift of the elements in $a$. To check that $\vec{z}$ was correctly constructed as a running product, we introduce a column $z$ to the execution trace:

| $step$ | $a$ | $b$ | $z$ |
| :---: | :---: | :---: | :---: |
| $i=1$ | $a_{1}$ | $a_{2}$ | 1 |
| $i=2$ | $a_{2}$ | $a_{3}$ | $\frac{\left(a_{1}+\gamma\right)}{\left(a_{2}+\gamma\right)}$ |
| $i=3$ | $a_{3}$ | $a_{1}$ | $\frac{\left(a_{1}+\gamma\right)\left(a_{2}+\gamma\right)}{\left(a_{2}+\gamma\right)\left(a_{3}+\gamma\right)}$ |
| $i=4$ | 0 | 0 | $\frac{\left(a_{1}+\gamma\right)\left(a_{2}+\gamma\right)\left(a_{3}+\gamma\right)}{\left(a_{2}+\gamma\right)\left(a_{3}+\gamma\right)\left(a_{1}+\gamma\right)}$ |

At each step, we check the constraint

$$
Z^{\text {next }} \cdot(B+\gamma)-Z \cdot(A+\gamma)=0
$$

As an example, applying this on the row $i=2$ checks

$$
\frac{\left(a_{1}+\gamma\right)\left(a_{2}+\gamma\right)}{\left(a_{2}+\gamma\right)\left(a_{3}+\gamma\right)} \cdot\left(a_{3}+\gamma\right)-\frac{\left(a_{1}+\gamma\right)}{\left(a_{2}+\gamma\right)} \cdot\left(a_{2}+\gamma\right)=0.
$$

This inductively checks that $z$ is accumulating the products of $a, b$ as expected.

:::

## Other arithmetisations

Some arithmetisations not covered here include: layered arithmetic circuits, Boolean circuits, and the Boolean hypercube. These sometimes lend themselves to information-theoretic models beyond the IOP, such as MPC-in-the-head [12]. In _Lecture 9 (Proving Systems Stack; Recursion and Proof Composition)_, we will analyse some of the factors that go into picking a suitable arithmetisation.

|  Argument system | Arithmetization | Information-theoretic protocol | Cryptographic compiler |
| :---: | :---: | :---: | :---: |
| Virgo [17] | layered arithmetic circuits | GKR protocol IOP | Merkle tree |
| Ligero [1] | arithmetic circuits | MPC-in-the-head, ZKIPCP | Merkle tree |
| BooLigero [11] | Boolean circuits | MPC-in-the-head, IOP  | Ligero |
| HyperPlonK [5] | Boolean hypercube | sumcheck protocol <br /> (multilinear IOP) | multilinear PCS |

Table 3: Some examples of other arithmetisations.

