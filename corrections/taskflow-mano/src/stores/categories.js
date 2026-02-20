
import { defineStore } from 'pinia';
import { useTasksStore } from './tasks';

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [
      { id: 1, name: 'Personnel', icon: '👤', color: '#42b883' },
      { id: 2, name: 'Travail', icon: '💼', color: '#3b82f6' },
      { id: 3, name: 'Urgent', icon: '🔥', color: '#ef4444' },
      { id: 4, name: 'Courses', icon: '🛒', color: '#f59e0b' }
    ],
    selectedCategory: null
  }),
  
  getters: {
    categoryById: (state) => (id) => {
      return state.categories.find(c => c.id === id);
    },
    
    activeCategory(state) {
      return state.selectedCategory
        ? this.categoryById(state.selectedCategory)
        : null;
    },
    
    tasksByCategory() {
      return (categoryId) => {
        const tasksStore = useTasksStore();
        return tasksStore.tasks.filter(t => t.categoryId === categoryId);
      };
    },
    
    taskCountByCategory() {
      return (categoryId) => {
        const tasksStore = useTasksStore();
        return tasksStore.tasks.filter(t => t.categoryId === categoryId).length;
      };
    }
  },
  
  actions: {
    addCategory(category) {
      const newCategory = {
        id: Date.now(),
        ...category
      };
      this.categories.push(newCategory);
      this._persist();
    },
    
    updateCategory(id, updates) {
      const index = this.categories.findIndex(c => c.id === id);
      if (index !== -1) {
        this.categories[index] = {
          ...this.categories[index],
          ...updates
        };
        this._persist();
      }
    },
    
    deleteCategory(id) {
      // Vérifier qu'aucune tâche n'utilise cette catégorie
      const tasksStore = useTasksStore();
      const hasTasks = tasksStore.tasks.some(t => t.categoryId === id);
      
      if (hasTasks) {
        throw new Error('Impossible de supprimer une catégorie contenant des tâches');
      }
      
      this.categories = this.categories.filter(c => c.id !== id);
      
      if (this.selectedCategory === id) {
        this.selectedCategory = null;
      }
      
      this._persist();
    },
    
    selectCategory(id) {
      this.selectedCategory = id;
    },
    
    _persist() {
      localStorage.setItem('taskflow-categories', JSON.stringify(this.categories));
    }
  }
});
