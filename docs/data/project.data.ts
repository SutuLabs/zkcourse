const projectStr=`
- name: ZKEX
  url: https://twitter.com/ZKEX_Official
  tags: [zksync]
  description: |
    ZKEX 是一个即将推出的基于 ZK Rollups 技术的多链 DEX。目前已经上线了测试网，它力求做到跟币安等同的用户体验，支持跨多个区块链交易资产。同时，它也支持高级订单类型，如限价、止损和部分成交等功能。

- name: Increment
  url: https://twitter.com/IncrementHQ
  tags: [zksync]
  description: |
    Increment 是一个永续期货平台，利用 Curve V2 的 AMM 进行交易执行。它具有以下特点：自动集中流动性；动态费用；可参数化的池。

- name: ZigZagExchange
  url: https://twitter.com/ZigZagExchange
  tags: [zksync]
  description: |
    ZigZagExchange 是一个为以太坊 L2 构建的 P2P 订单簿 DEX。每个人都可以在 ZigZag 上列出一对交易对，而这在大多数订单簿 DEX 上是不可能的。

- name: Derivio
  url: https://twitter.com/derivio_xyz
  tags: [zksync]
  description: |
    Derivio 正在构建一个基于链上的衍生品生态系统。它提供了广泛的产品，允许交易现货、期权和高阶衍生品。目前已经在测试网上线，并且正在开发其他产品，如衍生品保险库等。

- name: zkGame
  url: https://twitter.com/zkGame_io
  tags: [zksync]
  description: |
    这是一个 Web3 原生的 GambleFi 协议。通过利用防篡改机制和 VRF 技术，为游戏提供透明性和公平性。项目已确认将推出代币，并与实时测试网络进行交互可能使您有资格参与空投。

- name: Tevaera
  url: https://twitter.com/tevaera
  tags: [zksync]
  description: |
    Tevaera 是一个类似于 Treasure DAO 的项目，但建立在 zkSync 上。该团队正在构建基于 zkSync 的链上游戏生态系统。除了游戏之外，他们还在开发一个 L3 游戏超级链，以及一种用于 P&E 经济的 DEX。

- name: ZKVoiceKey
  url: https://ethglobal.com/showcase/zkvoicekey-zeufj
  source: https://github.com/SoraSuegami/voice_recovery_circuit
  tags: [halo2]
  description: |
    ZKVoiceKey 提供了一种通过语音来恢复钱包私钥的新方法。还采用了 Fuzzy Commit 和 ZKP，从而避免了将语音信息直接存储在区块链上，而是可以通过语音的模糊匹配来进行身份验证。

- name: Tanuki
  url: https://ethglobal.com/showcase/tanuki-s8ew9 
  source: https://github.com/AlexCheema/eth-tokyo-23
  tags: [halo2]
  description: |
    Tanuki 是一个无需信任的钱包活动评分协议，其使用 ZKP 来无信任地读取链上的历史活动，以计算钱包的分数。
    出于各种需求（比如空投根据），许多协议现在都会需要对曾交互过的钱包进行评分，但当前评分方法大多是在链外进行的，因此存在中心化、不够透明、需要额外信任等问题。为解决这一问题，Tanuki 选择了利用 ZK 协处理器 Axiom，以无信任的方式读取和汇总链上历史数据，这使得每个协议能够公平、透明地计算相关指标，促进无信任的互动。

- name: Worldcoin
  url: https://worldcoin.org/
  tags: [zkml]
  description: |
    Worldcoin 就不过多叙述了，大家应该比较熟悉

- name: Modulus Labs
  url: https://www.moduluslabs.xyz/
  tags: [zkml]
  description: |
    Modulus Labs 是 zkML 较为多样化的项目之一，构建链上 AI 所需技术。既致力于用例，也致力于相关研究。在应用方面，Modulus Labs 已经开发了 RockyBot（一个链上交易机器人）和 Leela vs. the World（一个象棋游戏），真人与 Leela 象棋引擎的一个可经验证的链上实例对弈。

- name: Giza
  url: https://www.gizatech.xyz/
  tags: [zkml, stark]
  description: |
    Giza 是一个致力于通过 AI 发展经济的协议，能够使用完全无信任的方法在链上部署 AI 模型，由 StarkWare 合作支持，最终实现一个为 AI 发展提供替代路径的市场。

- name: Zkaptcha
  url: https://www.zkaptcha.xyz/
  tags: [zkml]
  description: |
    Zkaptcha 专注于 Web3 中的机器人问题，保护智能合约免受机器人攻击，使用零知识证明来创建抗女巫攻击的智能合约，为智能合约提供验证码服务。目前，该项目使终端用户通过完成验证码来产生一个人类工作的证明，未来，Zkaptcha 将继承 zkML，推出类似于现有的 Web 2 验证码服务，但也可以分析鼠标运动等行为，以确定用户是否为真人。
`;


import { load } from 'js-yaml';

const projects = load(projectStr)

export default {
  load() {
    return {
      data: projects
    }
  }
}