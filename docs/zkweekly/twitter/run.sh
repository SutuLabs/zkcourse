#!/bin/bash

set -e

input=../2024/q3.md
output="output.md"

sedi=(-i) && [ "$(uname)" == "Darwin" ] && sedi=(-i '')

cp "$input" "$output"

sed "${sedi[@]}" -e 's/^- /- \\\+ /g' "$output"
sed "${sedi[@]}" -E 's/^  \[(.*)\]\((.*)\)/\n  - \n  - \\\- \1: \2/g' "$output"

sed "${sedi[@]}" -E 's/## 一周ZKP新闻 - ([0-9.]+)/## 🚀 zkWeekly - \1\n<br\/>\n/g' "$output"