<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-container">
      <div 
        class="modal-header"
        :class="{ 'header-collapsed': isHeaderCollapsed }"
        ref="headerRef"
      >
        <div class="tab-list">
          <button 
            v-for="site in availableSites" 
            :key="site.url"
            class="tab-button"
            :class="{ 
              'active': activeTab === site.url,
              'loaded': loadedTabs.includes(site.url),
              'no-iframe': !canUseIframe(site.url)
            }"
            @click="switchTab(site)"
          >
            <div class="tab-content">
              <img 
                v-if="site.icon"
                :src="site.icon"
                :alt="site.title"
                class="tab-icon"
              >
              <span class="tab-title" v-if="site.url!='https://chat.deepseek.com/'">{{ site.title }}</span>
              <button 
                v-if="activeTab === site.url && !noIframeUrls.includes(site.url)"
                class="refresh-button"
                @click.stop="refreshIframe(site.url)"
                title="刷新页面"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  width="14" 
                  height="14"
                  class="refresh-icon"
                >
                  <path 
                    fill="currentColor" 
                    d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                  />
                </svg>
              </button>
              <svg 
                v-if="!canUseIframe(site.url)" 
                class="external-icon" 
                viewBox="0 0 24 24" 
                width="12" 
                height="12"
              >
                <path fill="currentColor" d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
      
      <div class="header-controls">
        <button 
          v-if="!isMobile"
          class="toggle-button"
          :class="{ 'button-collapsed': isHeaderCollapsed }"
          @click="toggleHeader"
          :title="isHeaderCollapsed ? '展开导航' : '收起导航'"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="20" 
            height="20"
            :class="{ 'rotate-180': isHeaderCollapsed }"
          >
            <path 
              fill="currentColor" 
              d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
            />
          </svg>
        </button>

        <button 
          class="close-button"
          :class="{ 'mobile-close-button': isMobile }"
          @click="closeModal"
          title="关闭窗口"
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
        </button>
      </div>
      
      <div 
        class="modal-content"
        :class="{ 'header-hidden': isHeaderCollapsed }"
        ref="contentRef"
      >
        <div 
          v-for="site in availableSites"
          :key="site.url"
          class="iframe-container"
          :style="{ display: activeTab === site.url ? 'block' : 'none' }"
        >
          <iframe
            v-if="loadedTabs.includes(site.url)"
            :src="site.url"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            frameborder="0"
            allow="fullscreen"
            @load="onIframeLoad(site.url)"
            @error="onIframeError(site.url)"
            v-show="!errors[site.url]"
          ></iframe>
          <div v-if="errors[site.url]" class="error-container">
            <div class="error-content">
              <svg class="error-icon" viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <h3>无法加载页面</h3>
              <p>该网站不允许在框架中显示。您可以点击下方按钮直接访问：</p>
              <a 
                :href="site.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="direct-link"
              >
                直接访问网站
                <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zm-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { navigation } from '../../../data/navigation';
import { useWindowSize } from '@vueuse/core';

interface Site {
  title: string;
  url: string;
  icon?: string;
}

const props = defineProps<{
  isOpen: boolean;
  initialUrl: string;
  initialTitle: string;
}>();

const emit = defineEmits(['close']);

// 获取所有可用网站
const availableSites = computed(() => {
  return navigation.categories.flatMap(category => 
    category.items.map(item => ({
      title: item.title,
      url: item.url,
      icon: item.icon
    }))
  );
});

// 当前激活的标签
const activeTab = ref('');
// 已加载的标签
const loadedTabs = ref<string[]>([]);
// 错误状态
const errors = ref<Record<string, boolean>>({});

// 定义不允许在 iframe 中加载的网站列表
const noIframeUrls = [
  'https://chat.deepseek.com/',
  // 添加其他不支持 iframe 的网站
];

// 检查是否允许 iframe 加载
const canUseIframe = (url: string) => {
  return !noIframeUrls.some(noIframeUrl => url.startsWith(noIframeUrl));
};

// 初始化
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    activeTab.value = props.initialUrl;
    loadedTabs.value = [props.initialUrl];
  } else {
    // 关闭时重置状态
    activeTab.value = '';
    loadedTabs.value = [];
    errors.value = {};
  }
}, { immediate: true });

// 切换标签
const switchTab = (site: Site) => {
  if (canUseIframe(site.url)) {
    activeTab.value = site.url;
    if (!loadedTabs.value.includes(site.url)) {
      loadedTabs.value.push(site.url);
    }
  } else {
    // 对于不支持 iframe 的网站，直接打开新窗口
    window.open(site.url, '_blank');
  }
};

const closeModal = () => {
  emit('close');
};

const onIframeLoad = (url: string) => {
  errors.value[url] = false;
};

const onIframeError = (url: string) => {
  errors.value[url] = true;
};

// 关闭网站列表的点击外部处理
const handleClickOutside = (event: MouseEvent) => {
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const isHeaderCollapsed = ref(false);
const headerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const { width } = useWindowSize();

// 判断是否为移动端
const isMobile = computed(() => width.value <= 640);
console.log('isMobile:', isMobile.value)

// 监听窗口大小变化，调整布局
watch(isMobile, (newVal) => {
  if (newVal) {
    // 移动端时重置状态
    isHeaderCollapsed.value = false;
    if (headerRef.value) {
      headerRef.value.style.display = 'flex';
    }
  }
});

// 优化移动端的切换逻辑
const toggleHeader = () => {
  isHeaderCollapsed.value = !isHeaderCollapsed.value;
  
  // 确保在移动端时正确处理显示/隐藏
  if (headerRef.value && isMobile.value) {
    if (isHeaderCollapsed.value) {
      headerRef.value.style.transform = 'translateY(-100%)';
    } else {
      headerRef.value.style.transform = 'translateY(0)';
    }
  }
};

// 刷新 iframe
const refreshIframe = (url: string) => {
  const iframe = document.querySelector(`iframe[src="${url}"]`) as HTMLIFrameElement;
  if (iframe) {
    iframe.src = iframe.src;
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 10px;
}

.modal-container {
  background: white;
  width: 98vw;
  height: 96vh;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 60px;
  min-height: 60px;
  width: 100%;
  
  &.header-collapsed {
    height: 0;
    min-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-bottom-color: transparent;
    overflow: hidden;
  }
}

.tab-list {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  overflow-x: auto;
  max-width: calc(100% - 40px);
  padding: 0.5rem;
  scrollbar-width: thin;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  color: var(--text-color);
  opacity: 0.7;
  transition: all 0.2s ease;
  
  &.active {
    background: var(--primary-color);
    color: white;
    opacity: 1;
  }
  
  &:not(.active):hover {
    background: var(--hover-color);
    opacity: 0.9;
  }
  
  &.loaded:not(.active) {
    background: var(--hover-color);
    opacity: 0.8;
  }
  
  &.no-iframe {
    color: var(--text-color-light);
    border: 1px dashed var(--border-color);
    
    &:hover {
      background: var(--hover-color);
      border-style: solid;
    }
    
    .external-icon {
      margin-left: 4px;
      opacity: 0.7;
    }
  }
}

.header-controls {
  position: fixed;
  top: 1.6rem;
  right: 1.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1010;
}

.toggle-button,
.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: var(--primary-color);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-color-hover, #0066cc);
    transform: scale(1.05);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
}

.toggle-button {
  .rotate-180 {
    transform: rotate(180deg);
  }
  
  &.button-collapsed {
    background: var(--bg-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    
    &:hover {
      background: var(--hover-color);
      border-color: var(--text-color-light);
    }
  }
}

.modal-content {
  flex: 1;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: margin-top 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.header-hidden {
    margin-top: 0;
  }
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.iframe-container {
  width: 100%;
  height: 100%;
}

.error-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color);
}

.error-content {
  text-align: center;
  padding: 2rem;
  max-width: 400px;
}

.error-icon {
  color: var(--text-color-light);
  margin-bottom: 1rem;
}

.error-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--heading-color);
}

.error-content p {
  color: var(--text-color-light);
  margin-bottom: 1.5rem;
}

.direct-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: var(--primary-gradient);
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(22, 119, 255, 0.2);
  }
}

.direct-link .icon {
  transition: transform 0.3s ease;
}

.direct-link:hover .icon {
  transform: translateX(2px);
}

.tab-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-right: 0.5rem;
  position: relative;
}

.tab-icon {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  object-fit: cover;
}

.tab-title {
  font-size: 0.9rem;
}

.refresh-button {
  display: none;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
  opacity: 0.7;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 1;
    transform: rotate(180deg);
  }
}

.refresh-icon {
  transition: transform 0.3s ease;
}

.tab-button.active:hover .refresh-button {
  display: flex;
}

/* 美化滚动条 */
.tab-list::-webkit-scrollbar {
  height: 4px;
}

.tab-list::-webkit-scrollbar-track {
  background: transparent;
}

.tab-list::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 2px;
  
  &:hover {
    background: var(--text-color-light);
  }
}

/* 移动端适配 */
@media (max-width: 640px) {
  .modal-overlay {
    top: 52px;
    bottom: 0;
    padding:0;
    box-sizing: border-box;
    height: calc(100% - 52px);
  }

  .modal-container {
    width: 100vw;
    height: 100%; 
    padding: 0px;
    padding-bottom: 0px;
    box-sizing: border-box;
    border-radius: 0px;
  }
  
  .toggle-button,
  .close-button {
    width: 32px;
    height: 32px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  .header-controls {
    top: 0.5rem;
    right: 0.75rem;
    gap: 0.4rem;
  }
  
  .tab-button {
    padding: 0.4rem 0.8rem;
  }
  
  .tab-icon {
    width: 14px;
    height: 14px;
  }
  
  .tab-title {
    font-size: 0.85rem;
  }

  .modal-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    min-height: 52px;
    padding: 0.5rem 0.75rem;
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    &.header-collapsed {
      transform: translateY(-100%);
    }
  }
  
  .modal-content {
    margin-top: 0px;
    height: 100%;
    padding: 0px;
    &.header-hidden {
      padding-top: 0;
    }
  }
  .tab-list {
    max-width: calc(100% - 48px);
    padding: 0.25rem;
  }
  
  .refresh-button {
    width: 18px;
    height: 18px;
    
    svg {
      width: 12px;
      height: 12px;
    }
  }
  
  /* 移除移动端的控制按钮组样式 */
  .header-controls.mobile-controls {
    display: none;
  }
  
  /* 适配刘海屏 */
  /*.modal-container {
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
  }*/
  
  /* 优化滚动体验 */
  .tab-list {
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

/* 适配超小屏幕 */
@media (max-width: 375px) {
  .tab-button {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
  
  .tab-icon {
    width: 14px;
    height: 14px;
  }
  
}

.external-icon {
  flex-shrink: 0;
}
</style> 