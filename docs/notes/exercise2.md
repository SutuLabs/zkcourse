# 第 2 课 练习

今天的练习是动手编码练习。 尝试自己编写以下电路。 如果遇到困难，可以查看解决方案。

如果您需要查找 circom 语言功能或语法，请查看 [circom 文档](https://docs.circom.io/circom-language/signals/)。 我建议尝试在 [zkREPL](zkrepl.dev) 中构建这些电路，以实现快速迭代。

我建议按顺序进行这些练习，因为后面的电路可能建立在前面的电路之上。

## 参考

### 域大小

circom 中的所有信号都是素数域中的域元素

```
r = 21888242871839275222246405745257275088548364400416034343698204186575808495617
```

这是一个 254 位素数，称为 [BabyJubJub](https://www.cs.utexas.edu/users/moore/acl2/manuals/current/manual/index-seo.php/ZKSEMAPHORE____BABY-JUBJUB-PRIME) 素数。 这是 BN254 的曲线顺序，这是以太坊和（以前的）ZCash 使用的配对友好椭圆曲线。 您可以在 Jonathan Wang 的优秀文档 [此处](https://hackmd.io/@jpw/bn254) 中阅读更多关于 BN254 的信息。

### 建议和常见问题

如果您正在使用 zkREPL 的输入注释功能测试您的电路（特别是如果您使用负数），请注意您需要将数字括在引号中，并且您需要编写 它们作为非负残基。 这是由于 JSON 无法解析大整数。

例如，测试值为`-1`的输入信号`x`应如下所示：

```
"x": "21888242871839275222246405745257275088548364400416034343698204186575808495616"
```

忘记打引号是测试失败的常见原因。

## 练习

### 转换为bit位 Num2Bits

- 参数：`nBits`
- 输入信号：`in`
- 输出信号：`b[nBits]`

输出信号应该是长度为`nBits`的位数组，相当于`in`的二进制表示。 `b[0]` 是最低有效位。

[解决方案](https://github.com/iden3/circomlib/blob/master/circuits/bitify.circom#L25)

### 判零 IsZero

- 参数：无
- 输入信号：`in`
- 输出信号：`out`

要求：如果`in`为零，`out`应为`1`。 如果`in`不为零，`out`应为`0`。 这个有点棘手！

[解决方案](https://github.com/iden3/circomlib/blob/master/circuits/comparators.circom#L24)

### 相等 IsEqual

- 参数：无
- 输入信号：`in[2]`
- 输出信号：`out`

要求：如果 `in[0]` 等于 `in[1]`，则 `out` 应为 `1`。 否则，`out` 应该是 `0`。


[解决方案](https://github.com/iden3/circomlib/blob/master/circuits/comparators.circom#L37)

### 选择器 Selector

- 参数：`nChoices`
- 输入信号：`in[nChoices]`, `index`
- 输出：`out`

要求：输出`out`应该等于`in[index]`。 如果 `index` 越界（不在 [0, nChoices) 中），`out` 应该是 `0`。

[解决方案](https://github.com/darkforest-eth/circuits/blob/master/perlin/QuinSelector.circom)

### 判负 IsNegative

注意：信号是模 p（Babyjubjub 素数）的残基，并且没有`负`数模 p 的自然概念。 但是，很明显，当我们将`p-1`视为`-1`时，模运算类似于整数运算。
所以我们定义一个约定：`取负` 按照惯例认为是 (p/2, p-1] 中的余数，非负是 [0, p/2) 中的任意数

- 参数：无
- 输入信号：`in`
- 输出信号：`out`

要求：如果根据我们的约定，`in` 为负数，则 `out` 应为 `1`。 否则，`out` 应该是 `0`。 您可以自由使用[CompConstant circuit](https://github.com/iden3/circomlib/blob/master/circuits/compconstant.circom)，它有一个常量参数`ct`，如果`in`（二进制数组）在解释为整数时严格大于 `ct` 则输出 `1` ，否则为 `0`。

[解决方案](https://github.com/iden3/circomlib/blob/master/circuits/sign.circom#L23)

- **理解检查**：为什么我们不能只使用 LessThan 或上一个练习中的比较器电路之一？

### 少于 LessThan

- 参数：无
- 输入信号：`in[2]`。 假设提前知道这些最多 $2^{252} - 1$。
- 输出信号：`out`

要求：如果 `in[0]` 严格小于 `in[1]`，则 `out` 应为 `1`。 否则，`out` 应该是 `0`。

- **扩展 1**：如果您知道输入信号最多为 $2^k - 1 (k ≤ 252)$，您如何减少该电路所需的约束总数？ 编写一个在`k`中参数化的电路版本。
- **扩展 2**：编写 LessEqThan（测试 in[0] 是否 ≤ in[1]）、GreaterThan 和 GreaterEqThan
    

[解决方案（扩展1）](https://github.com/iden3/circomlib/blob/master/circuits/comparators.circom#L89)

### 整数除法 IntegerDivide

注意：这个电路非常难！

- 参数：`nbits`。 使用 `assert` 断言这最多为 126！
- 输入信号：`dividend`, `divisor` （被除数，除数）
- 输出信号：`remainder`, `quotient` （余数，商）

要求：首先，检查`dividend`和`divisor`是否最多为`nbits`位长。 接下来，计算并约束`余数`和`商`。

- **扩展**：您将如何修改电路以处理负的被除数？
    

[解决方案](https://github.com/darkforest-eth/circuits/blob/master/perlin/perlin.circom#L44)（忽略第二个参数SQRT_P，这是无关紧要的）

### 排序 Sort 【可选】

- 参数：`N`
- 输入信号：`in[N]`
- 输出信号：`out[N]`

要求：将输入`in[N]`的`N`个数字按照从小到大进行排列，并输出到`out[N]`信号中。
