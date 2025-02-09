<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <!-- 顶部导航栏 -->
          <div 
            class="modal-header"
            :class="{ 'header-collapsed': isHeaderCollapsed }"
            @mouseenter="handleHeaderHover"
          >
            <div class="modal-title-wrapper">
              <h3 class="modal-title">{{ title }}</h3>
              <div class="modal-actions">
                <!-- 收起/展开按钮 -->
                <button 
                  class="action-btn toggle-btn"
                  @click="toggleHeader"
                  :title="isHeaderCollapsed ? '展开' : '收起'"
                >
                  <svg 
                    class="toggle-icon" 
                    :class="{ 'icon-collapsed': isHeaderCollapsed }"
                    viewBox="0 0 24 24" 
                    width="20" 
                    height="20"
                  >
                    <path 
                      fill="currentColor" 
                      d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
                    />
                  </svg>
                </button>
                <!-- 关闭按钮 -->
                <button 
                  class="action-btn close-btn"
                  @click="$emit('close')"
                  title="关闭"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- 内容区域 -->
          <div class="modal-content">
            <iframe
              :src="url"
              :title="title"
              class="modal-iframe"
              ref="iframe"
              @load="iframeLoaded = true"
            ></iframe>
            <div v-if="!iframeLoaded" class="loading-spinner">
              <div class="spinner"></div>
              <span>加载中...</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps<{
  show: boolean;
  title: string;
  url: string;
}>();

defineEmits<{
  (e: 'close'): void;
}>();

const iframeLoaded = ref(false);
const isHeaderCollapsed = ref(false);
let collapseTimer: number | null = null;

// 处理头部悬停
const handleHeaderHover = () => {
  if (collapseTimer) {
    clearTimeout(collapseTimer);
    collapseTimer = null;
  }
  isHeaderCollapsed.value = false;
};

// 切换头部显示状态
const toggleHeader = () => {
  isHeaderCollapsed.value = !isHeaderCollapsed.value;
  if (!isHeaderCollapsed.value && !collapseTimer) {
    startCollapseTimer();
  }
};

// 开始收起计时器
const startCollapseTimer = () => {
  if (collapseTimer) {
    clearTimeout(collapseTimer);
  }
  collapseTimer = window.setTimeout(() => {
    isHeaderCollapsed.value = true;
  }, 8000);
};

// 组件挂载时启动计时器
onMounted(() => {
  startCollapseTimer();
});

// 组件卸载前清理计时器
onBeforeUnmount(() => {
  if (collapseTimer) {
    clearTimeout(collapseTimer);
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-container {
  background: var(--bg-color);
  border-radius: 12px;
  width: 90vw;
  height: 90vh;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.modal-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  transition: transform 0.3s ease;
  z-index: 1;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-collapsed {
  transform: translateY(-100%);
}

.modal-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.modal-title {
  margin: 0;
  font-size: 1.2rem;
  color: var(--heading-color);
}

.modal-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-color-light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: var(--card-bg);
  color: var(--text-color);
}

.toggle-btn {
  position: fixed;
  top: 1rem;
  right: 4rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.close-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  line-height: 1;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.icon-collapsed {
  transform: rotate(180deg);
}

.modal-content {
  flex: 1;
  position: relative;
  overflow: hidden;
  margin-top: 0;
  height: 100%;
}

.modal-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: var(--bg-color);
}

/* 保持其他样式不变... */

@media (max-width: 640px) {
  .modal-container {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  
  .modal-overlay {
    padding: 0;
  }
  
  .modal-header {
    padding: 0.8rem 1rem;
  }
  
  .modal-title {
    font-size: 1.1rem;
  }
  
  .toggle-btn {
    right: 3.5rem;
  }
}
</style> 