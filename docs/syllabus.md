---
lessons:
  - name: 初识零知识
    date: 4月8日周六
  - name: CIRCOM基础电路
    date: 4月22日周六
  - name: 数学基础构件
    date: 4月29日周六
  - name: CIRCOM实用电路
    date: 5月7日周日
  - name: 承诺方案
    date: 5月13日周六
  - name: 高效密码运算算法
    date: 5月20日周六
  - name: 算术化
    date: 5月27日周六
  - name: PLONK和多项式恒等式
    date: 6月3日周六
  - name: 证明系统栈；递归和组合
    date: 6月10日周六
  - name: 应用ZK结构 1
    date: 6月17日周六
  - name: 应用ZK结构 2
    date: 6月24日周六
  - name: 应用演示
    date: 7月1日周六
---

<script setup>
import { useData } from 'vitepress'
import { isProxy, toRaw } from 'vue';

const { frontmatter } = useData()
const lessons = toRaw(frontmatter.value).lessons

function getTitle(number) {
    return `第 ${number} 课【${ lessons[number - 1].date }】 ${ lessons[number - 1]?.name }`;
}

</script>

# 课程表  

::: details {{ getTitle(1) }}

在第一次课程中，我们将了解现在的零知识技术及应用。在课上我们将会讨论为什么零知识最近会成为一个令人兴奋的话题，以及为什么我们认为它有可能成为未来十年最大的技术故事之一

- [课程回放](https://www.youtube.com/watch?v=gTzXM1Se-38)
- [课堂幻灯片](pathname:///lecture/1-intro.pdf)
- [课后作业](./notes/exercise1)
- 补充材料：[交互式零知识三色问题演示](pathname://interactive/graph.html)
- 补充材料：[补充讲义](./notes/lecture1)

:::


::: details {{ getTitle(2) }}

_由于4月15日在香港有Web3嘉年华，主讲及许多学员都会前往，因此推迟_

本节课将会讨论实用的zkSNARK电路工程方法：使用工具如(circom/snarkjs/zkREPL) 为 groth16 zkSNARK 协议构建简单的零知识证明。我们将讨论 R1CS 编程模型（和成本模型）和简单的电路组件，例如位运算符、范围检查等。

- 课前预习：[Circom 2 Doc](https://docs.circom.io/)
- 课堂练习：[exercise](./notes/classexercise2)
- [课程回放](https://www.youtube.com/watch?v=CTJ1JkYLiyw)
- [课堂幻灯片](pathname:///lecture/2-circom1.pdf)
- [课后作业](./notes/exercise2)
- 补充材料：[补充讲义](./notes/lecture2)
- 补充材料：[Num2Bit](./notes/num2bit)
:::


<details class="details custom-block" open="">
<summary>{{ getTitle(3) }}</summary>
<!-- ::: details {{ getTitle(3) }} -->

我们将讨论现代证明系统的一些"基础构件"，包括：零知识的形式化，离散对数和其他常见的密码学难度来源，椭圆曲线密码学，和双线性映射密码学。

- 课前预习：[ZKP from Boaz Barak's book](https://intensecrypto.org/public/lec_14_zero_knowledge.html)
  | [PDF版本](https://files.boazbarak.org/crypto/lec_14_zero_knowledge.pdf)
<!-- - [课程回放](https://www.youtube.com/watch?v=CTJ1JkYLiyw) -->
- [课堂幻灯片](pathname:///lecture/3-math.pdf)
- [课后作业](./notes/exercise3)
- 补充材料：[Witness Indistinguishable Proofs and Constant Round Zero Knowledge](https://theory.cs.princeton.edu/uploads/Main/crypto_wi.pdf)
<!-- ::: -->
</details>


::: details {{ getTitle(4) }}
_由于5月6日是五一放假调休补上班的日子，所以往后推到周日_

在 "{{lessons[1]?.name}}" 的基础上，我们将编写和讨论更复杂的电路：包容证明验证、哈希函数、签名和加密验证。
:::


::: details {{ getTitle(5) }}

我们将在 ""{{lessons[2]?.name}}" 环节的基础上，构建向量、单变量多项式和多变量多项式承诺方案。
:::


::: details {{ getTitle(6) }}

我们将讨论高效打开和多项式算法的技术，包括数论变换（NTT）； 多标量乘法 (MSM)； 快速椭圆曲线翻倍加运算。
:::


::: details {{ getTitle(7) }}

我们讨论了算术化的几个例子：ZK程序的中间表示（IR），以及可以被证明系统使用的算术电路。
:::


::: details {{ getTitle(8) }}

我们将深入研究一种基于多项式承诺方案的 zkSNARK 构造：PLONK 协议，以及一种特定的类PLONK算术化。我们还将从多项式恒等式讨论像 LOOKUP 这样的证明。
:::


::: details {{ getTitle(9) }}

基于前四节的学习，我们将概述 zkSNARK 协议的前景，并建立证明系统的分类。我们还将讨论证明系统递归和组合。
:::


::: details {{ getTitle(10) }}

我们将讨论实用的ZK构造：假名消息传递的成员证明、基于无效器的隐私数字货币转移、zk-email等。
:::


::: details {{ getTitle(11) }}

我们将讨论 zkSNARK 的其他用途：非完整信息游戏、加密数据市场、ZKML、ZKVM、递归 ZK 证明等。
:::


::: details {{ getTitle(12) }}

在最后一节课中，学员和导师将展示他们开发的项目和 ZK 应用程序！
:::


::: details 结业典礼【待定】 ZK Shanghai Hackathon
> 内容待定
:::