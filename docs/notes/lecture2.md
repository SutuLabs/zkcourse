# 第 2 课 补充讲义

**如何使用这些笔记**：如果您正在关注PPT或课程回放，并想更深入地研究提到的某些主题，请在下面查找相应的标题以获取其他链接或上下文。

## 什么是 zkSNARK？

稍后将对此进行更详细的介绍，但是有很多很好的资源可以帮助您了解 zkSNARKs 的工作原理、它们的学术血统等。
  - 对于有自复杂性理论基础的人：[零知识的简洁故事](https://nibnalin.me/dust-nib/a-succinct-story-of-zero-knowledge.html)
  - [ZCash：什么是 zkSNARKs？](https://z.cash/technology/zksnarks/)（仅介绍部分；其余部分开始深入数学）

## circom/snarkjs/zkREPL 演示

如果您对基础设施或开发工具感兴趣，zkREPL 是一个非常酷的有用 ZK 开发工具示例。

在 [此处](https://0xparc.org/blog/zkrepl) 阅读更多相关信息，或在 [此处](https://www.youtube.com/watch?v=xoN3Ph836n4&amp;list=PLJijNyoOwnssZzIIxfochRxo5QRW5Uvfg&amp;index=16)。

### circomlib

[circomlib](https://github.com/iden3/circomlib/tree/master/circuits) 包含经过审计的通用电路构建块列表。 您可以在这个库中找到我们今天讨论的许多电路。

### 域大小和 BN254

circom 中的所有信号都是素数域中的域元素

```
r = 21888242871839275222246405745257275088548364400416034343698204186575808495617
```

这是一个 254 位素数，称为 BabyJubJub 素数。 这是 BN254 的曲线顺序，这是以太坊和（以前的）ZCash 使用的配对友好椭圆曲线。 您可以在 Jonathan Wang 的优秀文档 [此处](https://hackmd.io/@jpw/bn254) 中阅读更多关于 BN254 的信息。


## 零知识应用

### zkmessage

有关这方面的更多信息，请参阅 [第 1 课 练习](./exercise1.md)。

### 黑暗森林

您可以在 [这篇博文](https://blog.zkga.me/announcing-darkforest) 中阅读更多关于黑暗森林的信息。

如果您有兴趣深入挖掘，这里有一段关于“去中心化不完全信息游戏”的[视频](https://youtu.be/1C0z3bR-YdE) (30m) 悖论，以及一些用于去中心化游戏的 ZK 结构。 这是另一个 [视频](https://www.youtube.com/watch?v=z7V830zndoA) (30m)，讲述为什么去中心化游戏很有趣。

### Tornado Cash

Tornado Cash 使用与我们在第一节讨论的匿名投票应用程序相同的 ZK 结构。 我们在 [此处](https://learn.0xparc.org/materials/circom/learning-group-1/breaking-down-tornado) 深入了解 Tornado Cash 的工作原理，当然稍后我们也将在课程中讨论。

### ZKML

您可以在 [此处](https://0xparc.notion.site/public-ZK-resources-for-ML-specialists-70770f20778446d596aa340c2f47d4b2) 查看 ZKML 的资源集合。