
<script>
import { useTasksStore } from '@/stores/tasks';
import { useCategoriesStore } from '@/stores/categories';
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';

export default {
  name: 'TaskListView',
  components: { TaskList, TaskForm },
  data() {
    return {
      showForm: false,
      editingTask: null
    };
  },
  computed: {
    tasksStore() { return useTasksStore(); },
    categoriesStore() { return useCategoriesStore(); }
  },
  methods: {
    handleAddTask(taskData) {
      this.tasksStore.addTask(taskData);
      this.showForm = false;
    },
    handleToggleTask(id) {
      this.tasksStore.toggleTask(id);
    },
    handleDeleteTask(id) {
      this.tasksStore.deleteTask(id);
    },
    handleEditTask(task) {
      this.editingTask = { ...task };
      this.showForm = true;
    },
    updateTask(taskData) {
      this.tasksStore.updateTask(this.editingTask.id, taskData);
      this.editingTask = null;
      this.showForm = false;
    },
    cancelForm() {
      this.showForm = false;
      this.editingTask = null;
    },
    goToTaskDetail(id) {
      this.$router.push({ name: 'TaskDetail', params: { id } });
    }
  },
  mounted() {
    this.tasksStore.fetchTasks();
  }
}
</script>

<template>
  <div class="task-list-view">
    <div class="view-header">
      <h1>Mes Tâches</h1>
      
      <button 
        @click="showForm = !showForm"
        class="btn-primary"
      >
        {{ showForm ? '✖ Annuler' : '➕ Nouvelle tâche' }}
      </button>
    </div>
    
    <TaskForm
      v-if="showForm"
      :editTask="editingTask"
      @submit="editingTask ? updateTask($event) : handleAddTask($event)"
      @cancel="cancelForm"
    />
    
    <TaskList
      :tasks="tasksStore.tasks"
      @toggle="handleToggleTask"
      @delete="handleDeleteTask"
      @edit="handleEditTask"
    />
  </div>
</template>

<style scoped>
.task-list-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.view-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}

.btn-primary {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #35a372;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.4);
}
</style>
