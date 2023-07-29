<script setup>
import { data } from '../data/homework.data.ts'
import { ref, toRaw } from 'vue';
import { useData } from 'vitepress'
import TablerMoneybag from '../components/TablerMoneybag.vue'
import MaterialSymbolsLocationOn from '../components/MaterialSymbolsLocationOn.vue'
import MaterialSymbolsCalendarMonth from '../components/MaterialSymbolsCalendarMonth.vue'

const { site, frontmatter } = useData();

const homeworks = ref(data.data) 

const pattern = toRaw(site.value.themeConfig?.editLink)?.pattern;
const link = pattern ? pattern.replace(":path", "data/homework.data.ts") : undefined;

const script = ref("");
script.value += `declare -a repos=(\n`;
for (let i = 0; i < homeworks.value.length; i++) {
  const h = homeworks.value[i];
  script.value += `  '${h.github},${h.name}'\n`;
}
script.value += `)`;
</script>

# 课后作业列表

<span v-if="link">
请通过<a :href="link" target="_blank">此链接</a>修改此列表。
</span>

::: details 脚本

```bash-vue
#!/bin/bash

SAMPLE=sample
OUTPUT=homework.md
MAXLECTURE=7

{{script}}

echo "# 家庭作业">$OUTPUT

function getRepo() {
  repo=$1
  name=$2

  if [ -d "$name" ]; then
    echo updating $name
    git -C "$name" remote set-url origin $repo
    GIT_ASKPASS=/bin/true git -C "$name" pull
  else
    echo cloning $repo
    GIT_ASKPASS=/bin/true git clone $repo "$name"
  fi
}

getRepo https://github.com/SutuLabs/zkcourse-homework.git $SAMPLE
IFS=","
for repo in "${repos[@]}"; do
  read -a strarr <<< "$repo" # uses IFS
  getRepo ${strarr[0]}.git "${strarr[1]}"
done


echo "**图示：**">>$OUTPUT
echo "- ☑️ 已收到">>$OUTPUT
echo "- 🟡 未收到">>$OUTPUT
echo "- 💤 尚未布置">>$OUTPUT
echo "- 🔒 无法访问">>$OUTPUT
echo "- ⚠️ 格式错误">>$OUTPUT
echo>>$OUTPUT
echo>>$OUTPUT


echo -n '| 姓名 |'>>$OUTPUT
for i in {1..7}; do
  echo -n " ${i} |">>$OUTPUT
done
echo>>$OUTPUT

echo -n '|'>>$OUTPUT
for i in {0..7}; do
  echo -n " --- |">>$OUTPUT
done
echo>>$OUTPUT


for repo in "${repos[@]}"; do
  read -a strarr <<< "$repo" # uses IFS

  repo=${strarr[0]}
  name=${strarr[1]}

  echo -n "| [${name}](${repo}) |">>$OUTPUT

  echo working on $name
  if [ -d "$name" ]; then
    for i in {1..7}; do
      filename=lecture${i}-homework.md

      if [[ -f "$name/$filename" ]]; then
        if [[ $i -gt $MAXLECTURE ]]; then
          echo -n " 💤 |">>$OUTPUT
        else
          if cmp --silent -- "$name/$filename" "$SAMPLE/$filename"; then
            echo -n " 🟡 |">>$OUTPUT
          else
            echo -n " [☑️]($repo/blob/main/$filename) |">>$OUTPUT
          fi
        fi
      else
        echo -n " ⚠️ |">>$OUTPUT
      fi
    done
  else
    for i in {1..7}; do
      echo -n " 🔒 |">>$OUTPUT
    done
  fi

  echo>>$OUTPUT
done
```

:::