<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true,
      validator: (task) => {
        return task.id && task.title;
      }
    }
  },
  emits: ['toggle', 'delete', 'edit'],
  computed: {
    priorityColor() {
      const colors = {
        low: '#10b981',
        medium: '#f59e0b',
        high: '#f97316',
        urgent: '#ef4444'
      };
      return colors[this.task.priority] || colors.medium;
    },
    priorityLabel() {
      const labels = {
        low: 'Basse',
        medium: 'Moyenne',
        high: 'Haute',
        urgent: 'URGENT'
      };
      return labels[this.task.priority] || 'Moyenne';
    }
  }
}
</script>

<template>
  <div 
    class="task-item" 
    :class="{ done: task.done }"
  >
    <input 
      type="checkbox"
      :checked="task.done"
      @change="$emit('toggle', task.id)"
      class="task-checkbox"
    />
    
    <div class="task-content">
      <h3 class="task-title">{{ task.title }}</h3>
      <p v-if="task.description" class="task-description">
        {{ task.description }}
      </p>
    </div>
    
    <div class="task-meta">
      <span 
        class="task-priority"
        :style="{ backgroundColor: priorityColor }"
      >
        {{ priorityLabel }}
      </span>
    </div>
    
    <div class="task-actions">
      <button 
        @click="$emit('edit', task)"
        class="btn-edit"
        title="Modifier"
      >
        ✏️
      </button>
      <button 
        @click="$emit('delete', task.id)"
        class="btn-delete task-delete"
        title="Supprimer"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
}

.task-item:hover {
  background: #f3f4f6;
  transform: translateX(4px);
}

.task-item.done {
  opacity: 0.6;
}

.task-item.done .task-title {
  text-decoration: line-through;
}

.task-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.task-content {
  flex: 1;
}

.task-title {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.task-description {
  font-size: 0.875rem;
  color: #6b7280;
}

.task-priority {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: transform 0.2s;
}

.btn-edit:hover,
.btn-delete:hover {
  transform: scale(1.2);
}
</style>