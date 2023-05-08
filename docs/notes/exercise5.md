# 第 5 课 练习

1. $KZG$ 多项式承诺方案在 $Setup$ 阶段涉及到计算对秘密评估点 $\tau$ 的幂的承诺，这被称为“可信设置”，通常在被称为“Powers of Tau”的仪式中利用多方计算生成。 假如说有一天，你在一张纸条上找到了 $\tau$ 的值。 你怎么能用它来制作一个假的 $KZG$ 证明呢？

2. 从 $KZG$ 多项式承诺方案构造一个**向量承诺方案**。 （提示：对于向量 $m=\left(m_{1}, \ldots, m_{q}\right)$，是否存在一个“插值多项式”$I(X)$ 使得 $I\left(x_{i}\right)=y_{i}$？）

::: tip 有趣的事实

Verkle 树 [1] 是一种使用向量承诺而不是哈希函数的 Merkle 树。 使用 KZG 向量承诺方案，您能看出为什么 Verkle 树更高效吗？

::::

3. $KZG$ 多项式承诺方案对关系 $p(x)=$ $y$ 进行披露证明 $\pi$。 你能扩展这个方案来产生一个多重证明 $\pi$，让我们相信 $p\left(x_{i}\right)=y_{i}$ 对于点列表和评估 $\left(x_{i }, y_{i}\right)$ ？ （提示：假设您有一个插值多项式 $I(X)$ 使得 $I\left(x_{i}\right)=y_{i}$）。


<details>
<summary>英文原文</summary>


1. The $Setup$ phase of the $KZG$ polynomial commitment scheme involves computing commitments to powers of a secret evaluation point $\tau$. This is called the "trusted setup" and is often generated in a multi-party computation known as the "Powers of Tau" ceremony. One day, you find the value of $\tau$ on a slip of paper. How can you use it to make a fake $KZG$ opening proof?

2. Construct a **vector commitment scheme** from the $KZG$ polynomial commitment scheme. (Hint: For a vector $m=\left(m_{1}, \ldots, m_{q}\right)$, is there an "interpolation polynomial" $I(X)$ such that $I(i)=m[i]$ ?)

::: tip Fun fact

The Verkle tree [1] is a Merkle tree that uses a vector commitment instead of a hash function. Using the KZG vector commitment scheme, can you see why a Verkle tree is more efficient?

:::

3. The $KZG$ polynomial commitment scheme makes an opening proof $\pi$ for the relation $p(x)=$ $y$. Can you extend the scheme to produce a multiproof $\pi$, that convinces us of $p\left(x_{i}\right)=y_{i}$ for a list of points and evaluations $\left(x_{i}, y_{i}\right)$ ? (Hint: assume that you have an interpolation polynomial $I(X)$ such that $I\left(x_{i}\right)=y_{i}$).

</details>

## 参考文献

- [1] J. Kuszmaul. Verkle trees. https://math.mit.edu/research/highschool/primes/materials/2018/Kuszmaul.pdf, 2019.