---
layout: home
title: DeepSeek导航 - 认准DeepSeek 671b 满血版
description: 精选优质网址导航，为您提供高效便捷的上网导航服务
head:
  - - meta
    - name: keywords
      content: 网址导航,DeepSeek导航,网站导航,上网导航,实用网站
  - - meta
    - name: author
      content: DeepSeek
  - - link
    - rel: canonical
      href: https://nav.deepseek.com
---

<script setup>
import { navigation } from './data/navigation'
</script>

<div class="nav-container">
  

  <NavGrid :categories="navigation.categories" />
</div>

<style scoped>
.nav-container {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 1rem;
}
@media (max-width: 640px) {
  .nav-container {
    margin-left: 0;
    margin-right: 0;
    padding-left:0;
    padding-right:0;
  }
}

.nav-header {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 2rem;
  background: var(--bg-gradient);
  border-radius: 12px;
}

.nav-header-content {
  max-width: 600px;
  margin: 0 auto;
}

.nav-header h1 {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.nav-header p {
  color: var(--text-color-light);
  font-size: 1.1rem;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .nav-header {
    padding: 2rem 1rem;
  }
  
  .nav-header h1 {
    font-size: 2rem;
  }
  
  .nav-header p {
    font-size: 1rem;
  }
}
</style> 