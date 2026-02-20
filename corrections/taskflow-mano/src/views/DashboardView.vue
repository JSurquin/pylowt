
<script>
import { useTasksStore } from '@/stores/tasks';
import { useCategoriesStore } from '@/stores/categories';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'DashboardView',
  computed: {
    tasksStore() {
      return useTasksStore();
    },
    categoriesStore() {
      return useCategoriesStore();
    },
    authStore() {
      return useAuthStore();
    },
    stats() {
      return {
        total: this.tasksStore.tasks.length,
        active: this.tasksStore.activeCount,
        done: this.tasksStore.doneCount,
        categories: this.categoriesStore.categories.length
      };
    }
  }
}
</script>

<template>
  <div class="dashboard-view">
    <h1>📊 Dashboard Admin</h1>
    <p class="subtitle">Bienvenue {{ authStore.userDisplayName }}</p>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📋</div>
        <div class="stat-value">{{ stats.total }}</div>
        <div class="stat-label">Tâches totales</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-value">{{ stats.active }}</div>
        <div class="stat-label">Tâches actives</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-value">{{ stats.done }}</div>
        <div class="stat-label">Tâches terminées</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🏷️</div>
        <div class="stat-value">{{ stats.categories }}</div>
        <div class="stat-label">Catégories</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-view h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #64748b;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
