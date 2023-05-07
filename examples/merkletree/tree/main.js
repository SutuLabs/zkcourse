const { MerkleTree } = require("merkletreejs");
const { buildPoseidon } = require("circomlibjs");

BigInt.prototype.toJSON = function () {
  return this.toString();
};

NUMBER = 100;
// NUMBER = 4;

buildPoseidon().then((poseidon) => {
  const poseidonHash = (inputs) => {
    const hash = poseidon(inputs.map(MerkleTree.bigNumberify));
    const bn = MerkleTree.bigNumberify(poseidon.F.toString(hash));
    return MerkleTree.bufferify(bn);
  };

  const hash = poseidonHash;
  const randomNumbers = [];
  for (let i = 0; i < NUMBER; i++) {
    randomNumbers.push((Math.random() * 1000000).toFixed(0));
  }
  // const randomNumbers= ["1","2","3"];
  const leaves = randomNumbers.map((x) => hash([x]));

  // const randomLeaf = randomNumbers[(Math.random() * randomNumbers.length).toFixed(0)];
  const randomLeaf = randomNumbers[0];

  const tree = new MerkleTree(leaves, hash, { concatenator: (hashes) => hashes });

  const root = MerkleTree.bigNumberify(tree.getRoot());
  const leaf = MerkleTree.bigNumberify(hash([randomLeaf]));
  const proof = tree.getProof(leaf);
  const proofArr = proof.map((_) => ({ indices: _.position == "right" ? "0" : "1", sibling: MerkleTree.bigNumberify(_.data) }));

  if (!tree.verify(proof, leaf, root)) throw new Error("failed to verify!");

  console.log("Tree height:", proof.length);
  console.log(
    JSON.stringify(
      { root, leaf, siblings: proofArr.map((_) => _.sibling), pathIndices: proofArr.map((_) => _.indices) },
      undefined,
      2
    )
  );
});
