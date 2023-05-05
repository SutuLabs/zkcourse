const projectStr=`
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