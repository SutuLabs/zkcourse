#!/bin/bash

source env.sh

set -e

if ! [ -n "$input" ]; then
    input=$1
fi
output="markdown.md"

pandoc "$input" -o "$output"

sedi=(-i) && [ "$(uname)" == "Darwin" ] && sedi=(-i '')

# 在【】前后使用加粗
sed "${sedi[@]}" -E 's/【([^】]+)】/**【\1】**/g' "$output"

# 将“一周ZKP新闻 - 2024.8.7”前面加上##，并去掉
sed "${sedi[@]}" -E 's/\*\*一周ZKP新闻 - ([0-9.]+)\*\*/## 一周ZKP新闻 - \1/g' "$output"

# 使用 awk 将空行之后的行开头加上 - 并将其后面的行连接成一行
awk '
  BEGIN { RS=""; FS="\n"; ORS="\n\n" }
  {
    for(i=1; i<=NF; i++) {
      if(i==1) {
        $i = "- " $i;
      } else {
        $i = $i;
      }
    }
    print $0;
  }
' "$output" > "$output.tmp" && mv "$output.tmp" "$output"

sed "${sedi[@]}" -e 's/^- \*\*/**/g' "$output"
sed "${sedi[@]}" -e 's/^- ##/##/g' "$output"

# 所有`[`和`*注`开始的都放到新的一行，并且推进2格
sed "${sedi[@]}" -E 's/(\*注：.*)/\n  \1/g' "$output"
sed "${sedi[@]}" -E 's/\[([^\[ ]*)/\n  \[\1/g' "$output"
