const { MerkleTree } = require("merkletreejs");
const { buildPoseidon } = require("circomlibjs");

buildPoseidon().then((poseidon) => {
  const poseidonHash = (inputs) => {
    const hash = poseidon(inputs.map(MerkleTree.bigNumberify));
    const bn = MerkleTree.bigNumberify(poseidon.F.toString(hash));
    return MerkleTree.bufferify(bn);
  };
  console.log(MerkleTree.bigNumberify(poseidonHash([5])));
});
