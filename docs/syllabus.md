---
lessons:
  - name: ZK引言
    date: 4月8日周六
  - name: Circom 1
    date: 4月22日周六
  - name: 数学基础构件
    date: 4月29日周六
  - name: Circom 2
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
import { ref } from 'vue'

const i = ref(-1)
</script>

# 课程表  

::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

在第一次课程中，我们将了解现在的零知识技术及应用。在课上我们将会讨论为什么零知识最近会成为一个令人兴奋的话题，以及为什么我们认为它有可能成为未来十年最大的技术故事之一

- 补充材料：[交互式零知识三色问题演示](pathname://interactive/graph.html)
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

_由于4月15日在香港有Web3嘉年华，主讲及许多学员都会前往，因此推迟_

本节课将会讨论实用的zkSNARK电路工程方法：使用工具如(circom/snarkjs/zkREPL) 为 groth16 zkSNARK 协议构建简单的零知识证明。我们将讨论 R1CS 编程模型（和成本模型）和简单的电路组件，例如位运算符、范围检查等。
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

我们将讨论现代证明系统的一些"基础构件"，包括：零知识的形式化，离散对数和其他常见的密码学难度来源，椭圆曲线密码学，和双线性映射密码学。
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}
_由于5月6日是五一放假调休补上班的日子，所以往后推到周日_

在 "Circom 1" 的基础上，我们将编写和讨论更复杂的电路：包容证明验证、哈希函数、签名和加密验证。
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

我们将在 "数学基础构件" 环节的基础上，构建向量、单变量多项式和多变量多项式承诺方案。
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

我们将讨论高效打开和多项式算法的技术，包括数论变换（NTT）； 多标量乘法 (MSM)； 快速椭圆曲线翻倍加运算。
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

我们讨论了算术化的几个例子：ZK程序的中间表示（IR），以及可以被证明系统使用的算术电路。
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

我们将深入研究一种基于多项式承诺方案的 zkSNARK 构造：PLONK 协议，以及一种特定的类PLONK算术化。我们还将从多项式恒等式讨论像 LOOKUP 这样的证明。
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

基于前四节的学习，我们将概述 zkSNARK 协议的前景，并建立证明系统的分类。我们还将讨论证明系统递归和组合。
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

我们将讨论实用的ZK构造：假名消息传递的成员证明、基于无效器的隐私数字货币转移、zk-email等。
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

我们将讨论 zkSNARK 的其他用途：非完整信息游戏、加密数据市场、ZKML、ZKVM、递归 ZK 证明等。
:::


::: details 第 {{ (++i) + 1 }} 课【{{ $frontmatter.lessons[i].date }}】 {{ $frontmatter.lessons[i].name }}

在最后一节课中，学员和导师将展示他们开发的项目和 ZK 应用程序！
:::


::: details 结业典礼【待定】 ZK Shanghai Hackathon
> 内容待定
:::