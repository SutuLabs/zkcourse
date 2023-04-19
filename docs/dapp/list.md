<script setup>
import { data } from '../data/project.data.ts'
import { ref, toRaw } from 'vue';
import { useData } from 'vitepress'
import SolarCodeCircleOutline from '../components/SolarCodeCircleOutline.vue'

const { site, frontmatter } = useData();
const tags = toRaw(frontmatter.value).tags ?? [];

const projects = ref(data.data.filter(_ => _.tags.filter(t => tags.includes(t)).length > 0)) 

const pattern = toRaw(site.value.themeConfig?.editLink)?.pattern;
const link = pattern ? pattern.replace(":path", "data/project.data.ts") : undefined;

</script>

# 项目列表

<span v-if="link">
请通过<a :href="link" target="_blank">此链接</a>修改项目。
</span>

<div v-for="p in projects" class="project">
  <span class="proj-title">
    <a :href="p.url" target="_blank">{{ p.name }}</a>
    &nbsp;
    <a v-if="p.source" :href="p.source" target="_blank">
      <SolarCodeCircleOutline />
    </a>
  </span>
  <br />
  <span class="proj-desc">{{ p.description }}</span>
</div>

<style>
  div.project {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    line-height: 1.25;
  }

  span.proj-title {
    font-weight: 500 !important;
    font-size: 1rem !important;
    line-height: 1.25;
  }

  span.proj-title svg {
    display: inline-block;
  }

  span.proj-desc {
    font-size: 0.9rem !important;
    line-height: 1.25;
  }
</style>
