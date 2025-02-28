<template>
  <div class="theme-container" :class="{ 'dark': isDark }">
    <header class="nav-header">
      <div class="container">
        <div class="logo">
          <a href="/" class="site-title">{{ siteTitle }}</a>
        </div>
        <div></div>
        <div class="theme-toggle" @click="toggleDark()">
          {{ isDark ? '🌙' : '☀️' }}
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <Content style="width: 100%" />
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} {{ siteTitle }}</p>
        <p style="padding-right: 20px">今日访问量: {{ todayVisits }}  </p> <!-- 新增访问量显示 -->
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import { useDark, useToggle } from '@vueuse/core';

const { site } = useData();
const siteTitle = site.value.title;
const isDark = useDark();
const toggleDark = useToggle(isDark);


import { ref, onMounted } from 'vue';

// 新增访问量数据
const todayVisits = ref(0);
onMounted(async () => {
  try {
    const response = await axios.get('/api/ds/nav/stat', {
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.data && response.data.data) {
      todayVisits.value = response.data.data || 0;
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
});
import axios from 'axios'
try {
  axios.get('/api/ds/nav/stat', {
    // 添加超时配置
    timeout: 8000,
    // 明确设置请求头
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    console.log(response.data?.data)
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
.theme-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  display: flex;
  align-items: center;
}

.container {
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-content {
  flex: 1;
  margin-top: var(--header-height);
  padding: 2rem 0;
}

.footer {
  padding: 2rem 0;
  text-align: center;
  color: var(--text-color-light);
  .container{
    text-align: center;
  }
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
}

.site-title {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-decoration: none;
}

@media (min-width: 1440px) {
  .container {
    max-width: 1360px;
  }
}

@media (max-width: 960px) {
  .container {
    padding: 0 1.2rem;
  }
  
  .logo {
    font-size: 1.3rem;
  }
}

@media (max-width: 640px) {
  .container {
    /*padding: 0 1rem;*/
    padding: 0 0px;
  }
  
  .nav-header {
    height: var(--header-height-mobile, 3.2rem);
  }
  
  .logo {
    font-size: 1.2rem;
  }
  
  .main-content {
    margin-top: var(--header-height-mobile, 3.2rem);
    padding: 1.5rem 0;
  }
  
  .footer {
    padding: 1.5rem 0;
    font-size: 0.9rem;
  }
}

@media (max-width: 375px) {
  .container {
    padding: 0 0.2rem;
  }
}
</style> 