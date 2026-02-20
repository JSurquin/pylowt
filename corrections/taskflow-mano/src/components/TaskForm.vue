<script>
export default {
  name: 'TaskForm',
  props: {
    editTask: {
      type: Object,
      default: null
    }
  },
  emits: ['submit', 'cancel'],
  data() {
    return {
      formData: {
        title: '',
        description: '',
        priority: 'medium'
      }
    };
  },
  computed: {
    isValid() {
      return this.formData.title.trim().length >= 3;
    }
  },
  watch: {
    editTask: {
      handler(newTask) {
        if (newTask) {
          this.formData = {
            title: newTask.title,
            description: newTask.description || '',
            priority: newTask.priority
          };
        } else {
          this.resetForm();
        }
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit() {
      if (!this.isValid) return;
      
      this.$emit('submit', { ...this.formData });
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        priority: 'medium'
      };
    }
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <h2>{{ editTask ? 'Modifier la tâche' : 'Nouvelle tâche' }}</h2>
    
    <div class="form-group">
      <label>Titre *</label>
      <input 
        v-model="formData.title"
        type="text"
        placeholder="Ex: Faire les courses"
        required
      />
    </div>
    
    <div class="form-group">
      <label>Description</label>
      <textarea 
        v-model="formData.description"
        placeholder="Détails optionnels..."
        rows="3"
      ></textarea>
    </div>
    
    <div class="form-group">
      <label>Priorité</label>
      <select v-model="formData.priority">
        <option value="low">Basse</option>
        <option value="medium">Moyenne</option>
        <option value="high">Haute</option>
        <option value="urgent">URGENT</option>
      </select>
    </div>
    
    <div class="form-actions">
      <button 
        type="submit"
        :disabled="!isValid"
        class="btn-submit"
      >
        {{ editTask ? '✅ Modifier' : '➕ Ajouter' }}
      </button>
      <button 
        type="button"
        @click="$emit('cancel')"
        class="btn-cancel"
      >
        Annuler
      </button>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.task-form h2 {
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b883;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

.btn-submit,
.btn-cancel {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit {
  background: #42b883;
  color: white;
  flex: 1;
}

.btn-submit:hover:not(:disabled) {
  background: #35a372;
  transform: translateY(-2px);
}

.btn-submit:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.btn-cancel {
  background: #6b7280;
  color: white;
}

.btn-cancel:hover {
  background: #4b5563;
}
</style>
