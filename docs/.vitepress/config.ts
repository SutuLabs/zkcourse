import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3';

const customElements = [
  'mjx-container', 'mjx-assistive-mml', 'math', 'maction', 'maligngroup',
  'malignmark', 'menclose', 'merror', 'mfenced', 'mfrac', 'mi', 'mlongdiv',
  'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow',
  'ms', 'mscarries', 'mscarry', 'mscarries', 'msgroup', 'mstack', 'mlongdiv',
  'msline', 'mstack', 'mspace', 'msqrt', 'msrow', 'mstack', 'mstack', 'mstyle',
  'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder',
  'munderover', 'semantics', 'math', 'mi', 'mn', 'mo', 'ms', 'mspace', 'mtext',
  'menclose', 'merror', 'mfenced', 'mfrac', 'mpadded', 'mphantom', 'mroot',
  'mrow', 'msqrt', 'mstyle', 'mmultiscripts', 'mover', 'mprescripts', 'msub',
  'msubsup', 'msup', 'munder', 'munderover', 'none', 'maligngroup',
  'malignmark', 'mtable', 'mtd', 'mtr', 'mlongdiv', 'mscarries', 'mscarry',
  'msgroup', 'msline', 'msrow', 'mstack', 'maction', 'semantics', 'annotation',
  'annotation-xml',
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZK Shanghai",
  description: "A course site for ZK Shanghai",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '23春季工作坊', link: '/information' },
      { text: '24秋季工作坊', link: '/24fall/information' },
    ],

    sidebar: [
      {
        text: '2024 秋季工作坊',
        items: [
          { text: '基本信息', link: '/24fall/information' },
          { text: '课程表', link: '/24fall/syllabus' },
          { text: '引用材料', link: '/24fall/reference' },
        ]
      },
      {
        text: '2023 春季工作坊',
        items: [
          { text: '基本信息', link: '/information' },
          { text: '课程表', link: '/syllabus' },
          { text: '课程项目', link: '/project' },
          { text: '学员列表', link: '/roster' },
          { text: '作业情况', link: '/homework' },
          // { text: 'Honor Roll', link: '/honor' },
          { text: '引用材料', link: '/reference' },
        ]
      },
      {
        text: '数学知识',
        link: '/math/index',
        collapsed: false,
        items: [
          { text: '计算理论基础', link: '/math/computation' },
          { text: '困难问题', link: '/math/dlp' },
          { text: '群论', link: '/math/group-theory' },
          { text: '离散对数', link: '/math/discrete-logarithm' },
          { text: '随机函数', link: '/math/random' },
          { text: '乘法逆元', link: '/math/inverse' },
        ]
      },
      {
        text: 'zkDapps参考',
        link: '/dapp/index',
        collapsed: false,
        items: [
          { text: 'zkSync', link: '/dapp/zksync' },
          { text: 'halo2', link: '/dapp/halo2' },
          { text: 'zkML', link: '/dapp/zkml' },
        ]
      },
      {
        text: '其他资源',
        collapsed: false,
        items: [
          { text: 'Hackathon', link: '/other/hackathon' },
        ]
      }
    ],

    editLink: {
      pattern: 'https://github.com/SutuLabs/zkcourse/edit/main/docs/:path',
      text: '在GitHub编辑本页面'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SutuLabs/zkcourse' }
    ]
  },

  markdown: {
    config: (md) => {
      md.use(mathjax3);
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },
})
