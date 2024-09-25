# 第 5 课 补充讲义

## 商多项式

商多项式
目的：不告知 $f(X)$ 是什么的情况下，证明 $y=f(z)$。
方法： 
- $f(z)=y$ 保证了 $f(X)-y$ 在 $X=z$ 处为零，因此 $X-z$ 是它的一个因子。
- 将 $f(X)-y$ 除以 $X-z$ ，结果是一个次低一阶的多项式 $q(X)$ 。


举一个具体例子来帮助理解：

假设 $f(X) = X^2 + 2X + 1$ ，并且我们知道 $f(1) = 4$ ，也就是 $y = 4$ 。那么：
$f(X) - y = (X^2 + 2X + 1) - 4 = X^2 + 2X - 3$
现在我们可以验证 $f(X) - y$ 在 $X = 1$ 处是否为零：
$f(1) - y = (1^2 + 2 \cdot 1 - 3) = 0$
所以 $X = 1$ 是 $f(X) - y$ 的一个根。

因此，我们可以将 $f(X) - y$ 分解为：
$f(X) - y = (X - 1)(X + 3)$
这里的商多项式 $q(X) = X + 3$ 。


## 验证着双线性映射的推导

验证者 $\mathcal{V}$ 检查 $e\left(C-[y]_{1}, [1]_2 \right) \stackrel{?}{=} e\left(\pi,[\tau]_{2}-[z]_{2}\right)$ .

$e\left(C-[y]_{1}, [1]_2\right) \stackrel{?}{=} e\left(\pi,[\tau]_{2}-[z]_{2}\right)$
$e\left(\textcolor{blue}{[f(\tau]_1}-[y]_{1}, [1]_2\right) \stackrel{?}{=} e\left(\textcolor{blue}{[q(\tau)]_1},[\tau]_{2}-[z]_{2}\right)$
$e\left(\textcolor{blue}{[f(\tau)-y]_{1}}, [1]_2\right) \stackrel{?}{=} e\left([q(\tau)]_1,\textcolor{blue}{[\tau - z]_{2}}\right)$
$f(\tau)-y \stackrel{?}{=} q(\tau) \cdot (\tau - z)$
$f(\tau)-y \stackrel{?}{=} \textcolor{blue}{\frac{f(\tau)-y}{\tau-z}} \cdot (\tau - z)$