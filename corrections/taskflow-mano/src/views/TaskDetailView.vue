
<script>
import { useTasksStore } from '@/stores/tasks';
import { useCategoriesStore } from '@/stores/categories';

export default {
  name: 'TaskDetailView',
  data() {
    return {
      isEditing: false,
      editForm: {}
    };
  },
  computed: {
    tasksStore() {
      return useTasksStore();
    },
    categoriesStore() {
      return useCategoriesStore();
    },
    taskId() {
      return parseInt(this.$route.params.id);
    },
    task() {
      return this.tasksStore.getTaskById(this.taskId);
    },
    category() {
      if (!this.task?.categoryId) return null;
      return this.categoriesStore.categoryById(this.task.categoryId);
    }
  },
  methods: {
    startEdit() {
      this.editForm = { ...this.task };
      this.isEditing = true;
    },
    
    saveEdit() {
      this.tasksStore.updateTask(this.taskId, this.editForm);
      this.isEditing = false;
    },
    
    cancelEdit() {
      this.isEditing = false;
    },
    
    async deleteTask() {
      if (confirm('Supprimer cette tâche ?')) {
        this.tasksStore.deleteTask(this.taskId);
        this.$router.push({ name: 'TaskList' });
      }
    },
    
    goBack() {
      this.$router.back();
    }
  },
  mounted() {
    if (!this.task) {
      this.$router.push({ name: 'NotFound' });
    }
  }
}
</script>

<template>
  <div class="task-detail" v-if="task">
    <nav class="breadcrumb">
      <RouterLink to="/">Accueil</RouterLink>
      <span>/</span>
      <RouterLink to="/tasks">Tâches</RouterLink>
      <span>/</span>
      <span>{{ task.title }}</span>
    </nav>
    
    <div class="task-header">
      <h1>{{ task.title }}</h1>
      
      <div class="task-actions">
        <button @click="startEdit" v-if="!isEditing">
          ✏️ Modifier
        </button>
        <button @click="deleteTask" class="btn-danger">
          🗑️ Supprimer
        </button>
        <button @click="goBack" class="btn-secondary">
          ← Retour
        </button>
      </div>
    </div>
    
    <div v-if="isEditing" class="edit-mode">
      <div class="form-group">
        <label>Titre</label>
        <input v-model="editForm.title" />
      </div>
      
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="editForm.description"></textarea>
      </div>
      
      <div class="form-group">
        <label>Priorité</label>
        <select v-model="editForm.priority">
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
          <option value="urgent">URGENT</option>
        </select>
      </div>
      
      <div class="form-actions">
        <button @click="saveEdit" class="btn-primary">
          💾 Sauvegarder
        </button>
        <button @click="cancelEdit" class="btn-secondary">
          Annuler
        </button>
      </div>
    </div>
    
    <div v-else class="view-mode">
      <div class="task-meta">
        <div class="meta-item">
          <strong>Statut :</strong>
          <span :class="task.done ? 'status-done' : 'status-active'">
            {{ task.done ? '✅ Terminée' : '⏳ En cours' }}
          </span>
        </div>
        
        <div class="meta-item">
          <strong>Priorité :</strong>
          <span :class="`priority-${task.priority}`">
            {{ task.priority }}
          </span>
        </div>
        
        <div class="meta-item" v-if="category">
          <strong>Catégorie :</strong>
          <span :style="{ color: category.color }">
            {{ category.icon }} {{ category.name }}
          </span>
        </div>
        
        <div class="meta-item">
          <strong>Créée le :</strong>
          {{ new Date(task.createdAt).toLocaleDateString('fr-FR') }}
        </div>
        
        <div class="meta-item" v-if="task.completedAt">
          <strong>Terminée le :</strong>
          {{ new Date(task.completedAt).toLocaleDateString('fr-FR') }}
        </div>
      </div>
      
      <div class="task-content">
        <h2>Description</h2>
        <p>{{ task.description || 'Aucune description' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.breadcrumb {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: #64748b;
  font-size: 0.875rem;
}

.breadcrumb a {
  color: #42b883;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.task-header h1 {
  font-size: 2rem;
  margin: 0;
}

.task-actions {
  display: flex;
  gap: 0.75rem;
}

.task-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
}

.edit-mode,
.view-mode {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #35a372;
}

.task-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.meta-item {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.meta-item strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.status-done {
  color: #10b981;
  font-weight: 600;
}

.status-active {
  color: #f59e0b;
  font-weight: 600;
}

.priority-low { color: #10b981; }
.priority-medium { color: #f59e0b; }
.priority-high { color: #f97316; }
.priority-urgent { color: #ef4444; font-weight: 600; }

.task-content h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.task-content p {
  color: #64748b;
  line-height: 1.6;
}
</style>
