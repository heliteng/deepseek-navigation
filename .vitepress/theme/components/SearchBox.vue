<template>
  <div class="search-box">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="搜索网站..."
      @input="handleSearch"
    >
    <div v-if="showResults" class="search-results">
      <a
        v-for="result in searchResults"
        :key="result.url"
        :href="result.url"
        target="_blank"
        rel="noopener noreferrer"
        class="search-result-item"
      >
        <span class="title">{{ result.title }}</span>
        <span class="description">{{ result.description }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { navigation } from '../../../data/navigation';

const searchQuery = ref('');
const showResults = ref(false);

const searchResults = computed(() => {
  if (!searchQuery.value) return [];
  
  const results: any[] = [];
  navigation.categories.forEach(category => {
    category.items.forEach(item => {
      if (
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      ) {
        results.push(item);
      }
    });
  });
  
  return results.slice(0, 5);
});

const handleSearch = () => {
  showResults.value = searchQuery.value.length > 0;
};
</script>

<style scoped>
.search-box {
  position: relative;
  width: 300px;
}

input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-color);
  color: var(--text-color);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-top: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
}

.search-result-item {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--text-color);

  &:hover {
    background: var(--card-bg);
  }

  .title {
    display: block;
    font-weight: bold;
  }

  .description {
    display: block;
    font-size: 0.9rem;
    opacity: 0.8;
  }
}
</style> 