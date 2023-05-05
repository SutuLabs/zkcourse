<script setup>
import { data } from '../data/hackathon.data.ts'
import { ref, toRaw } from 'vue';
import { useData } from 'vitepress'
import TablerMoneybag from '../components/TablerMoneybag.vue'
import MaterialSymbolsLocationOn from '../components/MaterialSymbolsLocationOn.vue'
import MaterialSymbolsCalendarMonth from '../components/MaterialSymbolsCalendarMonth.vue'

const { site, frontmatter } = useData();

const hackathons = ref(data.data) 

const pattern = toRaw(site.value.themeConfig?.editLink)?.pattern;
const link = pattern ? pattern.replace(":path", "data/hackathon.data.ts") : undefined;

</script>

# 黑客松列表

此页收集了一系列同时期正在进行的与零知识证明有关的黑客松，欢迎学员们将本课程学到的知识进行实践，并获得优异成绩。

<span v-if="link">
请通过<a :href="link" target="_blank">此链接</a>修改此列表。
</span>

<div v-for="p in hackathons" class="hackathon">
  <span class="proj-title">
    <a :href="p.url" target="_blank">{{ p.name }}</a>
  </span>
  <br />
  <span>
    <MaterialSymbolsCalendarMonth />
    {{ p.date }}
  </span>
  &nbsp;
  <span v-if="p.prizes">
    <TablerMoneybag />
    {{p.prizes}}
  </span>
  &nbsp;
  <span v-if="p.location">
    <MaterialSymbolsLocationOn />
    {{p.location}}
  </span>
  <br />
  <span class="proj-desc">{{ p.description }}</span>
</div>

<style>
  div.hackathon {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    line-height: 1.25;
  }

  span.proj-title {
    font-weight: 500 !important;
    font-size: 1rem !important;
    line-height: 1.25;
  }

  span svg {
    display: inline-block;
  }

  span.proj-desc {
    font-size: 0.9rem !important;
    line-height: 1.25;
  }
</style>
