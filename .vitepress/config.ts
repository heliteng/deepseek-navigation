import { defineConfig } from 'vitepress';
import { navigation } from '../data/navigation';

export default defineConfig({
  title: 'DeepSeek导航',
  description: '精选优质网址导航，为您提供高效便捷的上网导航服务',
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/images/favicon/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon/favicon-32x32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicon/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'keywords', content: 'deepseek,deepseek满血版,deepseek部署,deepseek免费合集,AI网站导航,AI导航,AI导航网站' }],
    ['meta', { name: 'author', content: 'DeepSeek' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'DeepSeek导航 - 精选优质网址导航' }],
    ['meta', { property: 'og:description', content: '精选优质网址导航，为您提供高效便捷的上网导航服务' }],
    ['meta', { property: 'og:url', content: 'https://deepseeks.netlify.app/' }],
    [
      'script',
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?9cca9f1def91939ba806bb3d45d8b269";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `,
    ],
  ],

  themeConfig: {
    siteTitle: 'DeepSeek导航',
    nav: [
      { text: '首页', link: '/' },
      ...navigation.categories.map(category => ({
        text: category.name,
        link: `/categories/${category.slug}`
      })),
      { text: '隐私政策', link: '/privacy-policy' }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo' }
    ],
    
    footer: {
      message: '精选优质网址导航',
      copyright: `Copyright © ${new Date().getFullYear()} DeepSeek导航`
    }
  },

  // SEO 优化
  lastUpdated: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://nav.deepseek.com'
  },

  // 性能优化
  cacheDir: '.vitepress/cache',
  
  // markdown 配置
  markdown: {
    headers: {
      level: [0, 0]
    },
    // 添加 SEO 友好的标题锚点
    anchor: {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#'
    }
  }
}); 