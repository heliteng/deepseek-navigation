<template>
  <div class="nav-grid">
    <section 
      v-for="category in categories" 
      :key="category.slug"
      class="category-section"
    >
      <div class="category-header">
        <h2 class="category-title">{{ category.name }}</h2>
        <p class="category-description">{{ category.description }}</p>
      </div>
      <div class="nav-list">
        <NavCard 
          v-for="item in category.items"
          :key="item.url"
          v-bind="item"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Category } from '../../../data/navigation';
import NavCard from './NavCard.vue';

defineProps<{
  categories: Category[]
}>();

import axios from 'axios'
try {
 axios.get('/api/ds/hello', {
    // 添加超时配置
    timeout: 8000,
    // 明确设置请求头
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    console.log(response.data)
 }).catch(error => {
   console.error('请求失败:'+error)
  })
} catch (error) {
  debugger
  if (axios.isAxiosError(error)) {
    console.error('请求失败:')
  }
}


</script>


<style scoped>
.nav-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3rem;
}

.category-section {
  animation: fadeIn 0.5s ease-out;
}

.category-header {
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 4px solid transparent;
  background-image: var(--primary-gradient);
  background-clip: text;
  -webkit-background-clip: text;
}

.category-title {
  color: #000000;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.category-description {
  color: var(--text-color-light);
  font-size: 0.95rem;
}

.nav-list {
  display: grid;
  gap: 1.5rem;
  /* PC端显示4列 */
  grid-template-columns: repeat(4, 1fr);
}

/* 大屏幕平板 */
@media (max-width: 1200px) {
  .nav-list {
    /* 3列布局 */
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 平板 */
@media (max-width: 960px) {
  .nav-list {
    /* 2列布局 */
    grid-template-columns: repeat(2, 1fr);
  }
  
  .category-title {
    font-size: 1.4rem;
  }
}

/* 手机端 */
@media (max-width: 640px) {
  .nav-list {
    /* 1列布局 */
    grid-template-columns: repeat(2, 1fr);
    gap: 0.3rem;
    row-gap: 0.6rem;
  }
  
  .category-header {
    padding-left: 0.8rem;
  }
  
  .category-title {
    font-size: 1.3rem;
  }
  
  .category-description {
    font-size: 0.9rem;
  }
  
  .nav-grid {
    gap: 2rem;
  }
}

/* 小屏手机 */
@media (max-width: 375px) {
  .category-title {
    font-size: 1.2rem;
  }
  
  .nav-grid {
    gap: 1.5rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 