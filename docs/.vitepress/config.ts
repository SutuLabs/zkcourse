import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZK Shanghai 2023",
  description: "A course site for ZK Shanghai 2023",
  base: "/zkcourse/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '工作坊', link: '/information' }
    ],

    sidebar: [
      {
        text: '工作坊',
        items: [
          { text: '基本信息', link: '/information' },
          { text: '课程表', link: '/syllabus' },
          { text: '课程项目', link: '/project' },
          // { text: 'Honor Roll', link: '/honor' },
          { text: '引用材料', link: '/reference' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SutuLabs/zkcourse' }
    ]
  }
})
