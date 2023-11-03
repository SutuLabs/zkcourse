---
dates:
  - date: 11月25日周六
  - date: 11月25日周六
  - date: 12月2日周六
  - date: 12月2日周六
  - date: 12月9日周六
  - date: 12月9日周六
  - date: 12月16日周六
  - date: 12月16日周六
lessons:
  - name: 现代 ZKP 漫谈
  - name: 算术电路技术栈
  - name: ZKP 背后的抽象代数
  - name: Halo2 基础电路
  - name: ZKP 原语
  - name: STARK 基础电路
  - name: 递归 ZKP
  - name: Plonky2 递归电路
---

<script setup>
import { useData } from 'vitepress'
import { isProxy, toRaw } from 'vue';

const { frontmatter } = useData()
const lessons = toRaw(frontmatter.value).lessons
const dates = toRaw(frontmatter.value).dates

function getTitle(number) {
    return `第 ${number} 课【${ dates[number - 1].date }】 ${ lessons[number - 1]?.name }`;
}

</script>

# 课程表  

::: warning 注意
课程时间为暂定
:::

<details class="details custom-block" open="">
<summary>{{ getTitle(1) }}</summary>
<!-- ::: details {{ getTitle(1) }} -->

介绍零知识证明的基础理论，讲解完美零知识性及发展动机与常见应用，并以模块化 SNARK 为例为大家说明如何选择性学习零知识证明相关理论。


</details>
<!-- ::: -->


<details class="details custom-block" open="">
<summary>{{ getTitle(2) }}</summary>
<!-- ::: details {{ getTitle(2) }} -->

介绍三种约束系统（R1CS、Plonk(ish)、AIR）的算术化特点，以及对应前端技术栈方案特点。
并通过编写Mina合约，了解和练习R1CS约束系统。

- [练习](./notes/exercise2)

</details>
<!-- ::: -->


<details class="details custom-block" open="">
<summary>{{ getTitle(3) }}</summary>
<!-- ::: details {{ getTitle(3) }} -->

我们主要讨论抽象代数，理解从群环域的理论到ZKP常用的密码学基础构件。

</details>
<!-- ::: -->


<details class="details custom-block" open="">
<summary>{{ getTitle(4) }}</summary>
<!-- ::: details {{ getTitle(4) }} -->

本节课将会讨论实用的 zkSNARK 电路工程方法：使用 halo2 证明系统构建简单的零知识证明。我们将讨论 Plonkish 编程模型和简单的电路组件，例如位运算符、范围检查等。

- [练习](./notes/exercise4)
- 参考课程： https://learn.0xparc.org/halo2/

</details>
<!-- ::: -->


<details class="details custom-block" open="">
<summary>{{ getTitle(5) }}</summary>
<!-- ::: details {{ getTitle(5) }} -->

我们将讨论一些初级的ZKP原语，从汉密尔顿回路开始，包含二次剩余问题，Schnorr协议，Pedersen承诺，再到KZG承诺。

- 参考课程： [https://zkshanghai.xyz/](../syllabus.md)

</details>
<!-- ::: -->


<details class="details custom-block" open="">
<summary>{{ getTitle(6) }}</summary>
<!-- ::: details {{ getTitle(6) }} -->

我们将构造一个相对复杂的证明系统，以 STARK 为例，从零构建一个可证明的二次斐波那契数列电路。

- [练习](./notes/exercise6)
- 参考课程： https://starkware.co/stark-101/

</details>
<!-- ::: -->


<details class="details custom-block" open="">
<summary>{{ getTitle(7) }}</summary>
<!-- ::: details {{ getTitle(7) }} -->

我们将讨论证明系统递归和组合方式，以此打开更加广阔的实用性大门。

</details>
<!-- ::: -->


<details class="details custom-block" open="">
<summary>{{ getTitle(8) }}</summary>
<!-- ::: details {{ getTitle(8) }} -->

我们将接着上节课，利用 Plonky2 框架来实践一种实用的递归证明方法。

- [练习](./notes/exercise8)

</details>
<!-- ::: -->
