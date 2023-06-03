const projectStr=`

- name: Cairo 1.0 Hackathon
  url: https://taikai.network/pragma-oracle/hackathons/Cairo1hackathon/overview
  prizes: $80,000
  date: Jun 11 – July 3, 2023
  location: Online
  description: |
    为了促进 Cairo 1.0 的采用并鼓励新鲜思想加入我们的社区并构建创新应用程序，Pragma Oracle 正在组织为期两周的在线黑客马拉松。

- name: Autonomous Worlds hackathon
  url: https://ethglobal.com/events/autonomous
  prizes: $50,000
  date: May 18 – 26, 2023
  location: Online
  description: |
    由0xPARC协办的黑客松，基于MUD框架开发全链游（看起来类似于二层的方案）
`;


import { load } from 'js-yaml';

const projects = load(projectStr)

export default {
  load() {
    return {
      data: projects
    }
  }
}