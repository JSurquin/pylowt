
<script>
import { useCategoriesStore } from '@/stores/categories';

export default {
  name: 'CategoriesView',
  computed: {
    categoriesStore() {
      return useCategoriesStore();
    }
  }
}
</script>

<template>
  <div class="categories-view">
    <h1>Catégories</h1>
    
    <div class="categories-grid">
      <div 
        v-for="category in categoriesStore.categories"
        :key="category.id"
        class="category-card"
        :style="{ borderColor: category.color }"
      >
        <div class="category-icon">{{ category.icon }}</div>
        <h3>{{ category.name }}</h3>
        <div 
          class="category-badge"
          :style="{ backgroundColor: category.color }"
        >
          {{ categoriesStore.taskCountByCategory(category.id) }} tâches
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categories-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.categories-view h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border-left: 4px solid;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.2s;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.category-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.category-badge {
  display: inline-block;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
