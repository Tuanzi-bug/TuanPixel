import { sidebar } from 'vuepress-theme-hope';

export default sidebar({
  '/': [
    '',
    'village/',
    'road/',
    {
      text: '幻灯片',
      icon: 'person-chalkboard',
      link: 'https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html',
    },
  ],
});
