import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { navigation } from '../data/navigation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePages() {
  // 确保目录存在
  mkdirSync(join(__dirname, '../pages/categories'), { recursive: true });

  // 生成分类页面
  for (const category of navigation.categories) {
    const content = `---
title: ${category.name} - DeepSeek导航
description: ${category.description}
---

<script setup>
import { computed } from 'vue'
import { navigation } from '../../data/navigation'

const category = computed(() => navigation.categories.find(c => c.slug === '${category.slug}'))
</script>

<template>
  <div v-if="category" class="category-page">
    <h1>{{ category.name }}</h1>
    <p class="description">{{ category.description }}</p>
    <NavGrid :categories="[category]" />
  </div>
  <div v-else class="not-found">
    <h1>分类不存在</h1>
    <p>抱歉，未找到该分类。</p>
    <a href="/" class="back-home">返回首页</a>
  </div>
</template>

<style scoped>
.category-page {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.description {
  color: var(--text-color-light);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.not-found {
  text-align: center;
  padding: 4rem 1rem;
}

.back-home {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--primary-gradient);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  transition: opacity 0.3s;
}

.back-home:hover {
  opacity: 0.9;
}

@media (max-width: 640px) {
  h1 {
    font-size: 1.5rem;
  }
  
  .description {
    font-size: 1rem;
  }
}
</style>
`;

    writeFileSync(
      join(__dirname, '../pages/categories', `${category.slug}.md`),
      content
    );
  }

  // 生成 sitemap.xml
  const baseUrl = 'https://nav.deepseek.com';
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${navigation.categories.map(category => `
  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `).join('')}
</urlset>`;

  writeFileSync(join(__dirname, '../public', 'sitemap.xml'), sitemap);
}

generatePages().catch(console.error); 