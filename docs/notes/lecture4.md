# 第 4 课 补充讲义

今天讲座涵盖的材料：

* 群签名动机及电路: https://0xparc.org/blog/zk-group-sigs
* circom 中的默克尔树: https://github.com/semaphore-protocol/semaphore/blob/main/packages/circuits/tree.circom
    * 更多注释: https://decentralizedthoughts.github.io/2020-12-22-what-is-a-merkle-tree/
* snarkjs电路编译过程
    * 步骤: https://github.com/iden3/snarkjs
    * 解释：[snarkjs](./snarkjs)
* 补充阅读
    * 无效器: https://semaphore.appliedzkp.org/docs/guides/identities
    * 拒绝/透露: https://0xparc.org/blog/zk-group-sigs
    * QuinSelector/IsZero: https://hackmd.io/@gubsheep/S1Hz96Yqo


<details>
<summary>英文原文</summary>

Materials covered in today's lecture:
* Group signature motivation and circuits from https://0xparc.org/blog/zk-group-sigs
* Merkle trees in circom from https://github.com/semaphore-protocol/semaphore/blob/main/packages/circuits/tree.circom
    * More notes in https://decentralizedthoughts.github.io/2020-12-22-what-is-a-merkle-tree/
* snarkjs circuit compilation process
    * Steps convered in https://github.com/iden3/snarkjs
    * Diagram and resources in https://zkiap.com/snarkjs
* With additional time
    * Nullifiers in https://semaphore.appliedzkp.org/docs/guides/identities
    * Deny/reveal from https://0xparc.org/blog/zk-group-sigs
    * QuinSelector / IsZero from https://hackmd.io/@gubsheep/S1Hz96Yqo

</details>


## 简单的 zkSNARK 签名方案

数字签名对应以下功能：
* $KeyGen → (sk, pk)$: 选择一个随机密钥 $sk$ 和对应的公钥 $pk$
* $Sign(m, sk) → s$：给定消息 $m$ 和密钥 $sk$，输出签名 $s$
* $Verify(m, s, pk) → 1/0$：给定消息 $m$、签名 $s$ 和公钥 $pk$，验证签名是否有效

我们可以仅使用哈希函数和 zkSNARKs 构建一个简单的数字签名！

<details>
<summary>英文原文</summary>

A digital signature corresponds of the following functions:
* $KeyGen → (sk, pk)$: selects a random secret key $sk$ and corresponding public key $pk$
* $Sign(m, sk) → s$: given a message $m$ and secret key $sk$, outputs a signature $s$
* $Verify(m, s, pk) → 1/0$: given a message $m$, a signature $s$, and a public key $pk$, verifies if signature is valid

We can build a simple digital signature with just a hash function and zkSNARKs! 

</details>

### KeyGen

```c
include "circomlib/poseidon.circom";

template SecretToPublic() {
    signal input sk;
    signal output pk;
    
    component poseidon = Poseidon(1);
    poseidon.inputs[0] <== sk;
    pk <== poseidon.out;
}
```

对于 sk = 5, pk = 19065150524771031435284970883882288895168425523179566388456001105768498065277. 

### Sign

```c
template Sign() {
    signal input m;
    signal input sk;
    signal input pk;

    // verify prover knows correct sk
    component checker = SecretToPublic();
    checker.sk <== sk;
    pk === checker.pk;
}

component main { public [ pk, m ] } = Sign();
```

证据**本身**变成了签名！ 您可能会注意到消息从未受到限制； 这不会破坏可靠性！ 您可以在 https://geometry.xyz/notebook/groth16-malleability 查看更多详细信息

<details>
<summary>英文原文</summary>

The proof **itself** becomes your signature! You may notice the message is never constrained; this does not break soundness! You can see more details at https://geometry.xyz/notebook/groth16-malleability

</details>

### Verify

验证证据以及 pk 和 m 的公共输入，以验证此 zkSNARK 签名。


<details>
<summary>英文原文</summary>

You need to verify the proof along with the public inputs of pk and m to verify this zkSNARK signature.

</details>


## 简单群签名

假设组 $G$ 中有 $n$ 个成员。 那么我们定义一个群签名方案为：

* $KeyGen → (sk_i, pk_i)$：为组中的每个成员选择一组随机的秘密密钥 $sk_i$ 和相应的公钥 $pk_i$
* $GroupSign(m, sk_i, G)$ → : 给定消息 $m$ 和密钥，输出组签名 $s$
* $GroupVerify(m, s, G) → 1/0$：给定消息 $m$、组签名 $s$ 和组 $G$，验证签名是否来自组

<details>
<summary>英文原文</summary>

Let's say there are $n$ members in a group $G$. Then we define a group signature scheme as:

* $KeyGen → (sk_i, pk_i)$: selects a random set of secret keys $sk_i$ and corresponding public keys $pk_i$ for each member of group
* $GroupSign(m, sk_i, G)$ → : given a message $m$ and secret key, outputs a group signature $s$
* $GroupVerify(m, s, G) → 1/0$: given a message $m$, a group signature $s$, and the group $G$, verifies if the signature came from the group

</details>

### KeyGen

我们拥有与以前相同的 KeyGen，只是我们为组中的每个成员生成了 $n$ 个这些公私钥对。

<details>
<summary>英文原文</summary>

We have the same KeyGen as before, except we generate $n$ of these pairs for each of the members of the group.

</details>

### GroupSign 群签

```c
template GroupSign(n) {
    signal input sk;
    signal input pk[n];
    
    // even though m is not involved in the circuit, 
    // it is still constrained and cannot be 
    // changed after it is set.
    signal input m; 

    // get the public key
    component computePk = SecretToPublic();
    computePk.sk <== sk;

    // make sure computedPk is in the inputted group
    signal zeroChecker[n+1];
    zeroChecker[0] <== 1;
    for (var i = 0; i < n; i++) {
        zeroChecker[i+1] <== zeroChecker[i] * (pk[i] - computePk.pk);
    }
    zeroChecker[n] === 0;
}
```

### Verify

和以前一样，证据本身就是我们的签名！ 我们可以通过输入组的消息和公钥来验证它。 使用 `GroupSig(5)` 和密钥 5 进行验证的示例是：

<details>
<summary>英文原文</summary>

Just as before, the proof itself is our signature! We can verify it by inputting the message and public keys of the group. An example that will verify with `GroupSig(5)` and secret key 5 is:

</details>

```json
{
    "pk": ["19065150524771031435284970883882288895168425523179566388456001105768498065277", "1", "2", "3", "4"],
    "m": "1"
}
```

## 使用 Merkle 树的更大的组

以前的解决方案需要输入所有公钥作为输入，这对于较大的组来说可能会变得笨拙。 相反，我们使用默克尔树，它只需要输入 log(n) 个元素来证明成员资格：

```c
include "circomlib/poseidon.circom";

// if s == 0 returns [in[0], in[1]]
// if s == 1 returns [in[1], in[0]]
template DualMux() {
    signal input in[2];
    signal input s;
    signal output out[2];

    s * (1 - s) === 0;
    out[0] <== (in[1] - in[0])*s + in[0];
    out[1] <== (in[0] - in[1])*s + in[1];
}

template MerkleTreeInclusionProof(nLevels) {
    signal input leaf;
    signal input pathIndices[nLevels];
    signal input siblings[nLevels];
    signal input root;

    component mux[nLevels];
    component poseidons[nLevels];

    signal hashes[nLevels+1];
    hashes[0] <== leaf;

    for (var i = 0; i < nLevels; i++) {
        mux[i] = DualMux();
        mux[i].in[0] <== hashes[i];
        mux[i].in[1] <== siblings[i];
        mux[i].s <== pathIndices[i];

        poseidons[i] = Poseidon(2);
        poseidons[i].inputs[0] <== mux[i].out[0];
        poseidons[i].inputs[1] <== mux[i].out[1];
        hashes[i+1] <== poseidons[i].out;
    }

    root === hashes[nLevels];
}

component main { public [ leaf, root ] } = MerkleTreeInclusionProof(15);
```

使用以下输入进行测试：

```json
{
    "root": "12890874683796057475982638126021753466203617277177808903147539631297044918772",
    "leaf": "1355224352695827483975080807178260403365748530407",
    "siblings": [
        "1",
        "217234377348884654691879377518794323857294947151490278790710809376325639809",
        "18624361856574916496058203820366795950790078780687078257641649903530959943449",
        "19831903348221211061287449275113949495274937755341117892716020320428427983768",
        "5101361658164783800162950277964947086522384365207151283079909745362546177817",
        "11552819453851113656956689238827707323483753486799384854128595967739676085386",
        "10483540708739576660440356112223782712680507694971046950485797346645134034053",
        "7389929564247907165221817742923803467566552273918071630442219344496852141897",
        "6373467404037422198696850591961270197948259393735756505350173302460761391561",
        "14340012938942512497418634250250812329499499250184704496617019030530171289909",
        "10566235887680695760439252521824446945750533956882759130656396012316506290852",
        "14058207238811178801861080665931986752520779251556785412233046706263822020051",
        "1841804857146338876502603211473795482567574429038948082406470282797710112230",
        "6068974671277751946941356330314625335924522973707504316217201913831393258319",
        "10344803844228993379415834281058662700959138333457605334309913075063427817480"
    ],
    "pathIndices": [
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1"
    ]
}
```

<details>
<summary>英文原文</summary>

The previous solution required inputting all of the public keys as inputs, which can get unweildy with larger groups. Instead we use a Merkle Tree, which only requires inputting log(n) elements to prove membership:

</details>