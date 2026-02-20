<script>
export default {
  name: 'TaskCard',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'success', 'warning', 'danger'].includes(value)
    },
    padding: {
      type: String,
      default: 'normal',
      validator: (value) => ['small', 'normal', 'large'].includes(value)
    }
  },
  computed: {
    cardClasses() {
      return [
        'task-card',
        `task-card--${this.variant}`,
        `task-card--${this.padding}`
      ];
    }
  }
}
</script>

<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="task-card__header">
      <slot name="header">
        <h3>Titre par défaut</h3>
      </slot>
    </div>
    
    <div class="task-card__body">
      <slot>
        <p>Contenu par défaut</p>
      </slot>
    </div>
    
    <div v-if="$slots.actions" class="task-card__actions">
      <slot name="actions"></slot>
    </div>
    
    <div v-if="$slots.footer" class="task-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s;
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.task-card--default {
  border-left: 4px solid #42b883;
}

.task-card--success {
  border-left: 4px solid #10b981;
}

.task-card--warning {
  border-left: 4px solid #f59e0b;
}

.task-card--danger {
  border-left: 4px solid #ef4444;
}

.task-card--small {
  padding: 0.75rem;
}

.task-card--normal {
  padding: 1.5rem;
}

.task-card--large {
  padding: 2rem;
}

.task-card__header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.task-card__body {
  margin-bottom: 1rem;
}

.task-card__actions {
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.task-card__footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
