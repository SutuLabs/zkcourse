
<template>
  <input v-model="hashInput" @change="calculateHash()" class="hash-input" />
  <span v-if="hashOutput" class="hash-output">{{ hashOutput }}</span>
</template>

<script>
import mimc from '../utils/mimc';
import { ref } from 'vue';

export default {
  name: 'MimcCalculator',
  setup() {
    const hashInput = ref("");
    const hashOutput = ref("");
    const calculateHash = () => {
      const splicedInput = hashInput.value
        .split(',')
        .filter((str) => str.length > 0)
        .map((str) => Number(str));

      const res = mimc(...splicedInput);
      hashOutput.value = res.toString();
    }
    return {
      hashInput,
      hashOutput,
      calculateHash,
    }
  }
}
</script>

<style scoped>
.hash-input {
  border: 1px solid #ccc;
  font-size: 1rem;
}

.hash-output {
  font-size: 0.8rem;
}
</style>