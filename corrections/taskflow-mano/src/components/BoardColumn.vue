<script>
export default {
  name: 'BoardColumn',
  props: {
    title: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: '#42b883'
    }
  },
  emits: ['drop', 'task-click'],
  data() {
    return {
      isDragOver: false
    };
  },
  methods: {
    handleDragOver(e) {
      e.preventDefault();
      this.isDragOver = true;
    },
    handleDragLeave() {
      this.isDragOver = false;
    },
    handleDrop(e) {
      e.preventDefault();
      this.isDragOver = false;
      const taskId = e.dataTransfer.getData('taskId');
      this.$emit('drop', { taskId, columnTitle: this.title });
    }
  }
}
</script>

<template>
  <div 
    class="board-column"
    :class="{ 'drag-over': isDragOver }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div 
      class="board-column__header"
      :style="{ borderTopColor: color }"
    >
      <slot name="header" :title="title" :count="tasks.length">
        <h3>{{ title }}</h3>
        <span class="task-count">{{ tasks.length }}</span>
      </slot>
    </div>
    
    <div class="board-column__body">
      <template v-if="tasks.length > 0">
        <div 
          v-for="(task, index) in tasks"
          :key="task.id"
          class="board-column__task"
          draggable="true"
          @dragstart="e => e.dataTransfer.setData('taskId', task.id)"
          @click="$emit('task-click', task)"
        >
          <slot 
            name="task" 
            :task="task"
            :index="index"
            :isFirst="index === 0"
            :isLast="index === tasks.length - 1"
          >
            <div class="default-task">
              <h4>{{ task.title }}</h4>
              <p v-if="task.description">{{ task.description }}</p>
            </div>
          </slot>
        </div>
      </template>
      
      <div v-else class="board-column__empty">
        <slot name="empty">
          <p>Aucune tâche</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-column {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1rem;
  min-height: 400px;
  transition: all 0.2s;
}

.board-column.drag-over {
  background: #e0f2fe;
  border: 2px dashed #0ea5e9;
}

.board-column__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  border-radius: 8px;
  border-top: 4px solid;
}

.board-column__header h3 {
  margin: 0;
  color: #1f2937;
}

.task-count {
  background: #e5e7eb;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.board-column__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.board-column__task {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  cursor: grab;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.board-column__task:active {
  cursor: grabbing;
}

.board-column__task:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.default-task h4 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.default-task p {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.board-column__empty {
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
}
</style>
