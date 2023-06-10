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
$a+b=c$, set $q_l=q_r=1, q_o=-1$, rest 0
$a+b=c$, set $q_l=q_r=1, q_o=-1$, rest 0

| function      | $q_l$ | $q_r$ | $q_o$ | $q_m$ | $q_c$    |
| ---           | ---   | ---   | ---   | ---   | ---      |
| $a+b=c$       | 1     | 1     | -1    | 0     | 0        |
| $a \cdot b=c$ | 0     | 0     | -1    | 1     | 0        |
| bind value    | -1    | 0     | 0     | 0     | $\alpha$ |

### Example Pythagorean triple

$$
\alpha^2 +\beta^2 = \gamma^2
$$

| a   | b   | c   | expresion          | gate               | polynomial                                    |
| --- | --- | --- | ---                | ---                | ---                                           |
| 3   | 3   | 9   | $x_1\cdot x_1=x_2$ | $a_1\cdot b_1=c_1$ | $+0a_1 + 0b_1 - 1c_1 + 1a_1 b_1 + 0 = 0$      |
| 4   | 4   | 16  | $x_3\cdot x_3=x_4$ | $a_2\cdot b_2=c_2$ | $+0a_2 + 0b_2 - 1c_2 + 1a_2 b_2 + 0 = 0$      |
| 5   | 5   | 25  | $x_5\cdot x_5=x_6$ | $a_3\cdot b_3=c_3$ | $+0a_3 + 0b_3 - 1c_3 + 1a_3 b_3 + 0 = 0$      |
| 9   | 16  | 25  | $x_2 + x_4=x_6$    | $a_4 + b_4=c_4$    | $+1a_4 + 1b_4 - 1c_4 + 0a_4 b_4 + 0 = 0$      |
|     |     |     | $x_1=\alpha$       | $a_5=\alpha$       | $-1a_5 + 0b_5 + 0c_5 + 0a_5 b_5 + \alpha = 0$ |
|     |     |     | $x_3=\beta$        | $a_6=\beta$        | $-1a_6 + 0b_6 + 0c_6 + 0a_6 b_6 + \beta = 0$  |
|     |     |     | $x_5=\gamma$       | $a_7=\gamma$       | $-1a_7 + 0b_7 + 0c_7 + 0a_7 b_7 + \gamma = 0$ |

<!-- ---
witness values 
$a_1, a_2, a_3, a_4 \in \mathbb{F}$, and we want to encode

| row label| value | polynomial $\bar a$ |
|  --- | --- | --- |


interpolated to find $\bar a$ lagrange interpolation.

| row label| point | evaluation |
|  --- | --- | --- |


HINT: DFT: O(nlogn)

--- -->


### Roots of Unity

$H:\{x\in\mathbb{F}_{17} | x^4 = 1\}$

$x^4=1 \implies x^2=\pm 1 = 1 \text{ or } 16$

$x^2=1 \implies x=\pm 1 = 1 \text{ or } 16$

$x^2=16 \implies x=\pm 4 = 4 \text{ or } 13$

$H: \{ 1,4,16,13\}$

$k_1=2, k_2=3$

$k_1 H: \{ 2,8,15,9\}$

$k_2 H: \{ 3,12,14,5\}$


$$
f_a= 1 + 13x + 3x^2 +3x^3\\
f_b=7+3x+14x^2+13x^3\\
f_c=6+5x+11x^2+4x^3\\
q_L=13+x+4x^2+16x^3\\
q_R =13+x+4x^2+16x^3 \\
q_O = 16 \\
q_M=5+16x+13x^2+x^3\\
q_C=0\\
$$


For polynomial $f(x)=a+bx+cx^2+dx^3$, $f(\omega^i)=(1,\omega^i,\omega^{2i},\omega^{3i})\cdot (a,b,c,d)^T$. Define matrix $\Omega=(\omega^{ij})_{i,j}$. By inverse FFT, we have 
$$(a,b,c,d)=\Omega^{-1}\cdot (f(\omega^0),f(\omega^1),f(\omega^2),f(\omega^3))^T\\
=\frac{1}{4}(\omega^{-ij})_{i,j}\cdot (f(\omega^0),f(\omega^1),f(\omega^2),f(\omega^3))^T $$

$$
f(x)=a+bx+cx^2+dx^3
$$

$$
(a,b,c,d)=\Omega^{-1}\cdot (f(\omega^0),f(\omega^1),f(\omega^2),f(\omega^3))^T
$$

$$\Omega^{-1}=
  \begin{matrix}
         \frac{1}{4}
  \end{matrix}
     \cdot
     \begin{bmatrix}
         1 & 1 & 1 & 1\\
         1 & 13 & 16 & 4\\ 
         1 & 16 & 1 & 16\\ 
         1 & 4 & 16 & 13 
     \end{bmatrix}
      =
     \begin{bmatrix}
         13 & 13 & 13 & 13\\
         13 & 16 & 4 & 1\\ 
         13 & 4 & 13 & 4\\ 
         13 & 1 & 4& 16 
     \end{bmatrix}
    $$

Notice $(\omega^{-ij})_{i,j}$ is &#34;conjugate transpose&#34; of $\Omega$, not transpose.


$a: \:\:\:\:H: \{ 1,4,16,13\}$

$b: k_1 H: \{ 2,8,15,9\}$

$c: k_2 H: \{ 3,12,14,5\}$

$$
\begin{align}
S_{\sigma_1}(x)&=7+13x+10x^2+6x^3 \\
S_{\sigma_2}(x)&=4+13x^2+x^3\\
S_{\sigma_3}(x)&=6+7x+3x^2+14x^3\\
\end{align}
$$


### Round 1
**commit a,b,c**

设 $Z_H(x)=x^4-1$, 有:
$$
\begin{align}
a(x) &= (b_1x+b_2)\cdot Z_H(x) + f_a(x)\\
b(x) &= (b_3x+b_4)\cdot Z_H(x) + f_b(x) \\
c(x) &= (b_5x+b_6)\cdot Z_H(x) + f_c(x) \\
\end{align}
$$

在域 $\mathbb{F}_{17}$ 上生成随机数，假设是 $(b_1,b_2,b_3,b_4,b_5,b_6)=(7,4,11,12,16,2)$， 则有：

$$
\begin{align}
a(x)&=14+6x+3x^2+3x^3+4x^4+7x^5\\
b(x)&=12+9x+14x^2+13x^3+12x^4+11x^5\\
c(x)&=4+6x+11x^2+4x^3+2x^4+16x^5\\
\end{align}
$$

我们利用 SRS 进行承诺

$$
\begin{align}
[a(x)]_1 = (91,66)\\
[b(x)]_1 = (26,45)\\
[c(x)]_1 = (91,35)\\
\end{align}
$$



### Round 2

生成随机数 $(b_7,b_8,b_9)=(14,11,7) \in\mathbb{F}_{17}$, 计算 $z(x)$:

$$
z(x)=(b_7x^2+b_8x+b_9)\cdot Z_H(x) + acc(x)\\
$$

根据从验证者得到的挑战 $(\beta,\gamma)=(12,13)\in\mathbb{F}_{17}$ 计算出累加器向量

$$
\begin{align}
acc_0 &= 1\\
acc_i &= acc_{i-1}\frac{(a_i+\beta\omega^{i-1}+\gamma)(b_i+\beta k_1\omega^{i-1}+\gamma)(c_i+\beta k_2\omega^{i-1}+\gamma)}{(a_i+\beta S_{\sigma_1}(\omega^{i-1})+\gamma)(b_i+\beta S_{\sigma_2}(\omega^{i-1})+\gamma)(c_i+\beta S_{\sigma_3}(\omega^{i-1})+\gamma)}\\
acc_1 &= 1\cdot\frac{(3+12*1+13)(3+12*2*1+13)(9+12*3*1+13)}{(3+12*2+13)(3+12*1+13)(9+12*13+13)}\\
&=\frac{11\cdot 6\cdot 7}{6\cdot 11\cdot 8}=3\\
acc_2&=3\cdot\frac{(4+12*4+13)(4+12*2*4+13)(16+12*3*4+13)}{(4+12*8+13)(4+12*4+13)(16+12*9+13)}\\
&=3\cdot\frac{14\cdot 11\cdot 3}{11\cdot 14\cdot 1}=9\\
acc_3&=9\frac{(5+12*16+13)(5+12*2*16+13)(25+12*3*16+13)}{(5+12*15+13)(5+12*16+13)(25+12*5+13)}\\
&=9\cdot\frac{6\cdot 11\cdot 2}{11\cdot 6\cdot 13}=4\\
\end{align}
$$

通过插值得到累加器多项式

$$
\begin{align}
acc &= (1,3,9,4)\\
acc(x) &= 16x+5x^2+14x^3\\
\end{align}
$$

$$
\begin{align}
z(x)& = (14x^2+11x+7)(x^4-1)+16x+5x^2+14x^3\\
& = 10+5x+8x^2+14x^3+7x^4+11x^5+14x^6\\
\end{align}
$$

$$
[z(x)]_1 = |z(s)|\cdot G_1= (32,59)
$$




### Round 3

根据验证者发起的挑战 $\alpha=15\in\mathbb{F}_{17}$，计算商多项式
$$
\begin{align}
t(x) &= (a(x)b(x)q_M(x)+a(x)q_L(x)+b(x)q_R(x)+c(x)q_O(x)+PI(x)+q_C(x))\frac{1}{Z_H(x)}\\
&+(a(x)+\beta x+\gamma)(b(x)+\beta k_1 x+\gamma)(c(x)+\beta k_2 x+\gamma)z(x)\frac{\alpha}{Z_H(x)}\\
&-(a(x)+\beta S_{\sigma_1}(x)+\gamma)(b(x)+\beta S_{\sigma_2}(x)+\gamma)(c(x)+\beta S_{\sigma_2}(x)+\gamma)z(\omega x)\frac{\alpha}{Z_H(x)}\\
&+(z(x)-1)L_1(x)\frac{\alpha^2}{Z_H(x)}
\end{align}
$$
分解为度 $<n+2$ 的多项式 $t_{lo}(x), t_{mid}(x), t_{hi}(x)$ 
其中
$$t(x)=t_{lo}(x) + x^{n+2} t_{mid}(x)+ x^{2n+4} t_{hi}(x)$$

计算结果： $[t_{lo}(x)]_1, [t_{mid}(x)]_1, [t_{hi}(x)]_1$.

$$
\begin{align}
t(x)&=11x^{17} + 7x^{16} + 2x^{15} + 16x^{14} + 6*x^{13} + 15x^{12} + x^{11} + 10x^{10}\\
& + 2x^9 + x^8 + 8x^7 + 13x^6 + 13x^5 + 9x^3 + 13x^2 + 16x + 11\\
\end{align}
$$

$$
\begin{align}
t_{lo}&=11+16x+13x^2+9x^3+13x^5\\
t_{mid}&=13+8x+x^2+2x^3+10x^4+x^5\\
t_{hi}&=15+6x+16x^2+2x^3+7x^4+11x^5\\
\end{align}
$$

承诺结果：
$$
\begin{align}
[t_{lo}]_1&=(12,32)\\
[t_{mid}]_1&=(26,45)\\
[t_{hi}]_1&=(91,66)
\end{align}
$$



### Round 4

线性化。计算评估挑战 $\zeta=5\in\mathbb{F}_{19}$.

计算打开评估

$$\bar{a}=a(\zeta),\bar{b}=b(\zeta),\bar{c}=c(\zeta),\\
\bar{S_{\sigma_1}}=S_{\sigma_1}(\zeta), \bar{S_{\sigma_2}}=S_{\sigma_2}(\zeta),\\
\bar{t}=t(\zeta),\\
\bar{z_{\omega}}=z(\omega\zeta)
$$

计算线性化多项式（关于承诺值的线性多项式）：

$$
\begin{align}
r(x)&=\bar{a}\bar{b}q_m(x)+\bar{a}q_l(x)+\bar{b}q_r(x)+\bar{c}q_o(x)+q_c(x)\\
&+\alpha(\bar{a}+\beta\zeta+\gamma)(\bar{b}+\beta k_1\zeta+\gamma)(\bar{c}+\beta k_2\zeta+\gamma)z(x)\\
&-\alpha(\bar{a}+\beta\bar{S_{\sigma_1}}+\gamma)(\bar{b}+\beta\bar{S_{\sigma_2}}+\gamma)\beta\bar{z_{\omega}} S_{\sigma_3}(x)\\
&+\alpha^2z(x)L_1(\zeta)\\
\end{align}
$$

$r(x)$的定义与Plonk论文中不同，在进行线性化时，我们删除了所有常数项。这可以节省一个验证者标量乘法。

计算线性化评估$\bar{r}=r(\zeta)$。并输出
$$\bar{a},\bar{b},\bar{c},\bar{S_{\sigma_1}},\bar{S_{\sigma_2}},\bar{z_{\omega}},\bar{t},\bar{r}$$

假设$\zeta=5$，则有：（计算过程略）

$$
\bar{a}=15,\bar{b}=13,\bar{c}=5,\bar{S_{\sigma_1}}=1,\bar{S_{\sigma_2}}=12,\bar{t}=1,\bar{z_{\omega}}=15,\\
\bar{r}=15
$$

### Round 5

计算打开挑战 $v\in\mathbb{F}_{17}$

计算打开证明多项式 $W_{\zeta}(x)$:

$$
W_{\zeta}(x) = 
 \begin{matrix}
      \frac{1}{x-\zeta}
  \end{matrix}\cdot
 \begin{bmatrix}
  t_{lo}(x)+\zeta^{n+2}t_{mid}(x)+\zeta^{2n+4}t_{hi}(x)-\bar{t}\\
  +v(r(x) - \bar{r})\\
  +v^2(a(x) - \bar{a})\\
  +v^3(b(x) - \bar{b})\\
  +v^4(c(x) - \bar{c})\\
  +v^5(S_{\sigma_1}(x) - \bar{S_{\sigma_1}})\\
  +v^6(S_{\sigma_2}(x) - \bar{S_{\sigma_2}})\\
 \end{bmatrix}
$$

计算打开证明多项式 $W_{\zeta\omega}(x)$:

$$W_{\zeta\omega}(x)=\frac{z(x)-\bar{z_{\omega}}}{x-\zeta\omega}$$

输出

$$[W_{\zeta}(x)]_1,[W_{\zeta\omega}(x)]_1$$

设 $\zeta=5$，则有 $[W_{\zeta}(x)]_1=(91,35),[W_{\zeta\omega}(x)]_1=(65,98)$



### Proof

证据：
$$\pi=([a],[b],[c],[z],[t_{lo}],[t_{mid}],[t_{hi}],[W_{\zeta}],[W_{\zeta\omega}],\\
\bar{a},\bar{b},\bar{c},\bar{S_{\sigma_1}},\bar{S_{\sigma_2}},\bar{z_{\omega}},\bar{r})$$

具体值是：
$$
\begin{align}
\pi=(&(91,66),(26,45),(91,35),(32,59),(12,32),(26,45),(91,66),(91,35),(65,98),\\
&15,13,5,1,12,15,15)
\end{align}
$$



### Verify Preprocessing

利用SRS做预处理

$$
\begin{align}
[q_M]          &= [q_M(s)]          &= 12 (1,2) &= (12,69)\\
[q_L]          &= [q_L(s)]          &= 6 (1,2) &= (32,42) \\
[q_R]          &= [q_R(s)]          &= 6 (1,2) &= (32,42)\\
[q_O]          &= [q_O(s)]          &= 16 (1,2) &= (1,99)\\
[q_C]          &= [q_C(s)]          &= 0 (1,2) &= \infty\\
[S_{\sigma_1}] &= [S_{\sigma_1}(s)] &= 2 (1,2) &= (68,74)\\
[S_{\sigma_2}] &= [S_{\sigma_2}(s)] &= 13 (1,2) &= (65,3)\\
[S_{\sigma_3}] &= [S_{\sigma_3}(s)] &= 8 (1,2) &= (18,49)
\end{align}
$$




### Verifier Algorithm

1. 验证 $[a],[b],[c],[z],[t_{lo}],[t_{mid}],[t_{hi}],[W_{\zeta}],[W_{\zeta\omega}]\in G_1$。
2. 验证 $\bar{a},\bar{b},\bar{c},\bar{S_{\sigma_1}},\bar{S_{\sigma_2}},\bar{z_{\omega}},\bar{r}\in\mathbb{F}_{17}$。
3. 验证 $w_{i\in[l]}\in \mathbb{F}_{17}$（公共输入）。
4. 计算零多项式的评估：$Z_H(\zeta)=\zeta^n-1$。
5. 计算$L_1(\zeta)=\frac{\zeta^n-1}{n(\zeta-1)}$。
6. 计算公共输入多项式的评估：$PI(\zeta)=\sum_{i\in[l]}w_iL_i(\zeta)$。
7. 计算商多项式的评估：
    $$\bar{t}=\frac{\bar{r}+PI(\zeta)-(\bar{a}+\beta\bar{S_{\sigma_1}}+\gamma)(\bar{b}+\beta\bar{S_{\sigma_2}}+\gamma)(\bar{c}+\gamma)\alpha-L_1(\zeta)\alpha^2}{Z_H(\zeta)}$$
8. 计算批量多项式承诺的第一部分。定义$[D]=v[r(x)]+u[z]$：
    $$
    \begin{align}
    [D]&=\bar{a}\bar{b}v[q_M]+\bar{a}v[q_L]+\bar{b}v[q_R]+\bar{c}v[q_O]+v[q_C]\\
    &+((\bar{a}+\beta\zeta+\gamma)(\bar{b}+\beta k_1\zeta+\gamma)(\bar{c}+\beta k_2\zeta+\gamma)\alpha v+L_1(\zeta)\alpha^2 v+u)[z]\\
    &-(\bar{a}+\beta\bar{S_{\sigma_1}}+\gamma)(\bar{b}+\beta{S_{\sigma_2}}+\gamma)\alpha v\beta\bar{z_{\omega}}[S_{\sigma_3}]
    \end{align}
    $$
9. 计算完整的批量多项式承诺
    $$[F]=[t_{lo}]+\zeta^{n+2}[t_{mid}]+\zeta^{2n+4}[t_{hi}]+[D]+v^2[a]+v^3[b]+v^4[c]+v^5[S_{\sigma_1}]+v^6[S_{\sigma_2}]$$
10. 计算群编码的批量评估$[E]$：
    $$[E]=(\bar{t}+v\bar{r}+v^2\bar{a}+v^3\bar{b}+v^4\bar{c}+v^5\bar{S_{\sigma_1}}+v^6\bar{S_{\sigma_2}}+u\bar{z_{\omega}})\cdot[1]$$
11. 批量验证所有评估：
    $$e([W_{\zeta}]+u[W_{\zeta\omega}],[s]_2)=e(\zeta[W_{\zeta}]+u\zeta\omega[W_{\zeta\omega}]+[F]-[E],[1]_2)$$





<!-- pair accumulator polynomial
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
$$ -->

## Discrete Fourier Transform

$$
\newcommand{k}{\textcolor{green}{k}}
\newcommand{X}{\textcolor{purple}{X}}
\newcommand{dpi}{\textcolor{orange}{2 \pi}}

\X_{\k}=\textcolor{pink}{ \frac{1}{N} \sum_{n=0}^{N-1} }
\textcolor{blue}{ x_n}
\textcolor{red}{e}^{\textcolor{red}{\mathrm{i}} \dpi \k  \textcolor{pink}{\frac{n}{N}}}
$$


为了找到<span style="color: green;">特定频率</span>下的<span style="color: purple;">能量</span>，将<span style="color: blue;">信号</span>在<span style="color: green;">该频率</span>上<span style="color: orange;">绕圆圈</span><span style="color: red;">旋转</span>，并<span style="color: pink;">沿着该路径平分一堆点</span>。


## Reference

- [PLONK by Hand (Part 1: Setup)](https://research.metastate.dev/plonk-by-hand-part-1/)
- [Understanding PLONK](https://vitalik.ca/general/2019/09/22/plonk.html)
