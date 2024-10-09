#!/bin/bash

set -e

input=../2024/q4.md
output="twitter.md"

sedi=(-i) && [ "$(uname)" == "Darwin" ] && sedi=(-i '')

cp "$input" "$output"

sed "${sedi[@]}" -e 's/^- /- \\\+ /g' "$output"
sed "${sedi[@]}" -E 's/^  \[(.*)\]\((.*)\)/\n  - \n  - \\\- \1: \2/g' "$output"

sed "${sedi[@]}" -E 's/### ([0-9.]+)/## 🚀 zkWeekly - \1\n<br\/>\n/g' "$output"