我需要几条sed命令将原始markdown转换为我的目标markdown。

大概规则有这几条：
1. 【】前后使用**加粗；
2. 一周ZKP新闻将**去掉后改为前面加##
3. 空行之后开始的行开头用- 开始，同时将其后面的到空行之前的行都连接到一行上；
4. 所有[和*注开始的都放到新的一行，并且推进2格；

原始markdown：
**一周ZKP新闻 - 2024.8.7**

【论文】

Nethermind Research的Dimitriou等人在《Mova: Nova folding without
committing to error
terms》论文中提出一种新的R1CS实例折叠方案，无需承诺错误或交叉项，提高了证明速度，且校验者成本与Hypernova相当，同时降低了通信轮数。*注：与Nova的1次通讯相比，通讯轮数为4还是增加了。*[论文](https://eprint.iacr.org/2024/1220)

Lavin等人在《A Survey on the Applications of Zero-Knowledge
Proofs》论文中综述了零知识证明在多个领域的应用进展。[论文](https://arxiv.org/abs/2408.00243)

【视频】

PSE组织了视频系列讲解他们的项目，第一期是Identity相关项目，包括TLSNotary、Semaphore和Anon
Aadhaar。[视频](https://www.youtube.com/watch?v=M85rQ3_TUPk)

CCF组织的SPP报告《约束满足问题建模与求解》，虽然与ZKP无关，但是从学术角度上讲，他们在解决类似的问题，对我有很大的启发。[回放](https://mp.weixin.qq.com/s/E0AKf0Q27UbDYf-cqrgaVg)

Dapp
Learning发布了一个系列的中文Groth16讲解视频。[视频1](https://www.youtube.com/watch?v=9Wn5MC3hslQ)，[视频2](https://www.youtube.com/watch?v=VM--LX3Q5Zw)，[视频3](https://www.youtube.com/watch?v=_VAD5GC4YR8)。

【博客】

Lambda Class发布博客《Pinocchio: verifiable computation
revisited》精解经典的Pinocchio协议。[博客](https://blog.lambdaclass.com/pinocchio-verifiable-computation-revisited/)

Anoma一口气发了两篇手写证明系统系列文章《SuperSpartan by
Hand》和《HyperNova by
Hand》。[SuperSpartan](https://anoma.net/blog/superspartan-by-hand)，[HyperNova](https://anoma.net/blog/hypernova-by-hand)。

Jolt发表长推讲解他们如何在Jolt虚拟机中使用Circom，代码尚未公开。*注：他们用Circom描述虚拟机的约束，不是支持Circom代码执行。*[𝕏](https://x.com/samrags_/status/1820429579787423759)

【开源】

Argument
Computer（递归证明系统Lurk开发者）发布Sphinx，是一个从SP1分叉出来的RISC-V
zkVM，重点打算支持Lurk。[代码](https://github.com/argumentcomputer/sphinx)

【信息】

Antalpha
Labs发布8月4日的ZKP相关总结笔记。[链接](https://mp.weixin.qq.com/s/rhTcoDBSlqq9EYqgVxddjA)

zkHack（zkMesh）发布了2024年7月ZKP相关动态回顾。[链接](https://substack.com/home/post/p-147198976)。

一个新的专注于ZKP安全的精选列表Awesome-ZKP-Security，整理了相关论文、教程和工具。[链接](https://github.com/StefanosChaliasos/Awesome-ZKP-Security)

一年一度的区块链盛会SBC24今晚21:00开始，与ZKP相关的议题包括证明系统安全、zkLogin、Starkware的Stwo、格基折叠证明系统LatticeFold等。[日程](https://www.sbc-conference.com/)，[直播链接](https://www.youtube.com/watch?v=Qm_48Ziqo3Y)。




目标markdown：
## 一周ZKP新闻 - 2024.8.7

**【论文】**

- Nethermind Research的Dimitriou等人在《Mova: Nova folding without committing to error terms》论文中提出一种新的R1CS实例折叠方案，无需承诺错误或交叉项，提高了证明速度，且校验者成本与Hypernova相当，同时降低了通信轮数。
  *注：与Nova的1次通讯相比，通讯轮数为4还是增加了。*
  [论文](https://eprint.iacr.org/2024/1220)

- Lavin等人在《A Survey on the Applications of Zero-Knowledge Proofs》论文中综述了零知识证明在多个领域的应用进展。
  [论文](https://arxiv.org/abs/2408.00243)

**【视频】**

- PSE组织了视频系列讲解他们的项目，第一期是Identity相关项目，包括TLSNotary、Semaphore和Anon Aadhaar。
  [视频](https://www.youtube.com/watch?v=M85rQ3_TUPk)

- CCF组织的SPP报告《约束满足问题建模与求解》，虽然与ZKP无关，但是从学术角度上讲，他们在解决类似的问题，对我有很大的启发。
  [回放](https://mp.weixin.qq.com/s/E0AKf0Q27UbDYf-cqrgaVg)

- Dapp Learning发布了一个系列的中文Groth16讲解视频。
  [视频1](https://www.youtube.com/watch?v=9Wn5MC3hslQ)，
  [视频2](https://www.youtube.com/watch?v=VM--LX3Q5Zw)，
  [视频3](https://www.youtube.com/watch?v=_VAD5GC4YR8)。

**【博客】**

- Lambda Class发布博客《Pinocchio: verifiable computation revisited》精解经典的Pinocchio协议。
  [博客](https://blog.lambdaclass.com/pinocchio-verifiable-computation-revisited/)

- Anoma一口气发了两篇手写证明系统系列文章《SuperSpartan by Hand》和《HyperNova by Hand》。
  [SuperSpartan](https://anoma.net/blog/superspartan-by-hand)，
  [HyperNova](https://anoma.net/blog/hypernova-by-hand)。

- Jolt发表长推讲解他们如何在Jolt虚拟机中使用Circom，代码尚未公开。
  *注：他们用Circom描述虚拟机的约束，不是支持Circom代码执行。*
  [𝕏](https://x.com/samrags_/status/1820429579787423759)

**【开源】**

- Argument Computer（递归证明系统Lurk开发者）发布Sphinx，是一个从SP1分叉出来的RISC-V zkVM，重点打算支持Lurk。
  [代码](https://github.com/argumentcomputer/sphinx)

**【信息】**

- Antalpha Labs发布8月4日的ZKP相关总结笔记。
  [链接](https://mp.weixin.qq.com/s/rhTcoDBSlqq9EYqgVxddjA)

- zkHack（zkMesh）发布了2024年7月ZKP相关动态回顾。
  [链接](https://substack.com/home/post/p-147198976)。

- 一个新的专注于ZKP安全的精选列表Awesome-ZKP-Security，整理了相关论文、教程和工具。
  [链接](https://github.com/StefanosChaliasos/Awesome-ZKP-Security)

- 一年一度的区块链盛会SBC24今晚21:00开始，与ZKP相关的议题包括证明系统安全、zkLogin、Starkware的Stwo、格基折叠证明系统LatticeFold等。
  [日程](https://www.sbc-conference.com/)，
  [直播链接](https://www.youtube.com/watch?v=Qm_48Ziqo3Y)。
