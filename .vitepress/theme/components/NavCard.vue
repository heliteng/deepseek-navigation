<template>
  <div class="nav-card">
    <div class="nav-card-content">
      <div class="nav-card-header">
        <div 
          class="nav-icon-wrapper"
          :style="iconBgColor ? { background: iconBgColor } : {}"
        >
          <img 
            v-if="icon" 
            :src="icon" 
            :alt="title"
            class="nav-icon"
            width="32"
            height="32"
            loading="lazy"
          >
          <div v-else class="nav-icon-placeholder">
            {{ title.charAt(0) }}
          </div>
        </div>
        <h3 class="nav-title">{{ title }}</h3>
      </div>
      <p class="nav-description">{{ description }}</p>
      <div class="nav-tags" v-if="tags && tags.length">
        <span 
          v-for="tag in tags" 
          :key="tag"
          class="nav-tag"
          :class="getTagClass(tag)"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <div class="nav-card-footer">
      <button 
        @click="openModal" 
        class="nav-link"
        :class="{ 'external-link': !canUseIframe(url) }"
      >
        <span>{{ canUseIframe(url) ? '访问网站' : '直接访问' }}</span>
        <svg 
          class="icon" 
          viewBox="0 0 24 24" 
          width="16" 
          height="16"
        >
          <path 
            v-if="canUseIframe(url)"
            fill="currentColor" 
            d="M14 5.6c0-.28.22-.5.5-.5h4.9c.28 0 .5.22.5.5v4.9c0 .28-.22.5-.5.5s-.5-.22-.5-.5V6.7l-7.15 7.15c-.2.2-.5.2-.7 0-.2-.2-.2-.5 0-.7L18.3 6H14.5c-.28 0-.5-.22-.5-.5zm-12 2c0-.28.22-.5.5-.5h8c.28 0 .5.22.5.5s-.22.5-.5.5h-8c-.28 0-.5-.22-.5-.5zm0 4c0-.28.22-.5.5-.5h6c.28 0 .5.22.5.5s-.22.5-.5.5h-6c-.28 0-.5-.22-.5-.5zm0 4c0-.28.22-.5.5-.5h8c.28 0 .5.22.5.5s-.22.5-.5.5h-8c-.28 0-.5-.22-.5-.5z"
          />
          <path 
            v-else
            fill="currentColor" 
            d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zm-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-2z"
          />
        </svg>
      </button>
    </div>
  </div>
  
  <IframeModal
    v-if="canUseIframe(url)"
    :is-open="isModalOpen"
    :initial-url="url"
    :initial-title="title"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IframeModal from './IframeModal.vue';
import type { Tag } from '../../../types/navigation';

const props = defineProps<{
  title: string;
  url: string;
  icon?: string;
  iconBgColor?: string;
  description: string;
  tags: Tag[];
}>();

const isModalOpen = ref(false);

// 定义不允许在 iframe 中加载的网站列表
const noIframeUrls = [
  'https://chat.deepseek.com/',
  'https://www.wenxiaobai.com/chat',
  // 添加其他不支持 iframe 的网站
];

// 检查是否允许 iframe 加载
const canUseIframe = (url: string) => {
  return !noIframeUrls.some(noIframeUrl => url.startsWith(noIframeUrl));
};

const getTagClass = (tag: Tag) => {
  switch(tag) {
    case '免费': return 'tag-free';
    case '收费': return 'tag-paid';
    case '官方': return 'tag-official';
    case '免注册': return 'tag-no-register';
    case '需要注册': return 'tag-need-register';
    case '满血版': return 'tag-full-version';
    default: return '';
  }
};

const openModal = () => {
  if (props.url && !canUseIframe(props.url)) {
    // 对于不支持 iframe 的网站，直接打开新窗口
    window.open(props.url, '_blank');
  } else {
    isModalOpen.value = true;
    document.body.style.overflow = 'hidden'; // 禁用外部滚动
  }
};



const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = ''; // 恢复外部滚动
};
</script>

<style scoped>
.nav-card {
  position: relative;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  overflow: hidden;
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--primary-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-card:hover::before {
  opacity: 1;
}

.nav-card-content {
  flex: 1;
}

.nav-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.nav-icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--primary-gradient);
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.2);
  transition: all 0.3s ease;
}

.nav-icon {
  max-width: 75%;
  max-height: 75%;
  width: auto;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
  display: block;
  margin: auto;
}

.nav-icon-placeholder {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
}

.nav-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--heading-color);
  margin: 0;
}

.nav-description {
  color: var(--text-color-light);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

.nav-card-footer {
  margin-top: auto;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: var(--primary-gradient);
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  &.external-link {
    background: var(--bg-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    
    &:hover {
      background: var(--hover-color);
      border-color: var(--text-color-light);
    }
  }
}

.nav-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.2);
}

.icon {
  transition: transform 0.3s ease;
}

.nav-link:hover .icon {
  transform: translateX(2px);
}

/* 平板和桌面端 */
@media (min-width: 641px) {
  .nav-card {
    min-height: 180px;
  }
  
  .nav-card:hover {
    transform: translateY(-4px);
  }
}

/* 平板 */
@media (max-width: 960px) {
  .nav-card {
    padding: 1.3rem;
  }
  
  .nav-title {
    font-size: 1rem;
  }
  
  .nav-description {
    font-size: 0.85rem;
  }
}

/* 手机端 */
@media (max-width: 640px) {
  .nav-card {
    padding: 1.2rem;
    min-height: auto;
  }
  
  .nav-icon-wrapper {
    width: 36px;
    height: 36px;
  }
  
  .nav-icon {
    max-width: 70%;
    max-height: 70%;
  }
  
  .nav-card-header {
    gap: 0.8rem;
  }
  
  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}

/* 小屏手机 */
@media (max-width: 375px) {
  .nav-card {
    padding: 1rem;
  }
  
  .nav-icon-wrapper {
    width: 32px;
    height: 32px;
  }
  
  .nav-icon {
    max-width: 65%;
    max-height: 65%;
  }
  
  .nav-title {
    font-size: 0.95rem;
  }
}

.nav-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
}

.nav-tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-weight: 500;
}

.tag-free {
  background-color: #e6f7ff;
  color: #0088ff;
}

.tag-paid {
  background-color: #fff2e8;
  color: #ff4d4f;
}

.tag-official {
  background-color: #f6ffed;
  color: #52c41a;
}

.tag-no-register {
  background-color: #f9f0ff;
  color: #722ed1;
}

.tag-need-register {
  background-color: #f5f5f5;
  color: #595959;
}
.tag-full-version{
  background-color: #cadefc;
  color: #521262;
}

/* 调整移动端样式 */
@media (max-width: 640px) {
  .nav-tags {
    margin-top: 0.6rem;
  }
  
  .nav-tag {
    font-size: 0.7rem;
    padding: 0.15rem 0.5rem;
  }
}
</style> 