
import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    filter: 'all',
    loading: false,
    error: null,
    nextId: 1
  }),
  
  getters: {
    filteredTasks(state) {
      switch (state.filter) {
        case 'active':
          return state.tasks.filter(t => !t.done);
        case 'done':
          return state.tasks.filter(t => t.done);
        default:
          return state.tasks;
      }
    },
    
    activeCount(state) {
      return state.tasks.filter(t => !t.done).length;
    },
    
    doneCount(state) {
      return state.tasks.filter(t => t.done).length;
    },
    
    tasksByPriority: (state) => (priority) => {
      return state.tasks.filter(t => t.priority === priority);
    },
    
    getTaskById: (state) => (id) => {
      return state.tasks.find(t => t.id === id);
    }
  },
  
  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Charger depuis localStorage
        const saved = localStorage.getItem('taskflow-tasks');
        if (saved) {
          this.tasks = JSON.parse(saved);
          // Mettre à jour nextId
          if (this.tasks.length > 0) {
            this.nextId = Math.max(...this.tasks.map(t => t.id)) + 1;
          }
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    
    addTask(task) {
      const newTask = {
        id: this.nextId++,
        done: false,
        createdAt: new Date().toISOString(),
        ...task
      };
      
      this.tasks.push(newTask);
      this._persist();
    },
    
    updateTask(id, updates) {
      const index = this.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        this.tasks[index] = {
          ...this.tasks[index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this._persist();
      }
    },
    
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this._persist();
    },
    
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.done = !task.done;
        task.completedAt = task.done ? new Date().toISOString() : null;
        this._persist();
      }
    },
    
    setFilter(filter) {
      this.filter = filter;
    },
    
    clearCompleted() {
      this.tasks = this.tasks.filter(t => !t.done);
      this._persist();
    },
    
    markAllDone() {
      this.tasks.forEach(t => {
        t.done = true;
        t.completedAt = new Date().toISOString();
      });
      this._persist();
    },
    
    _persist() {
      localStorage.setItem('taskflow-tasks', JSON.stringify(this.tasks));
    }
  }
});
