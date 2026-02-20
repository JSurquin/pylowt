<script>
import TaskItem from './TaskItem.vue';

export default {
  name: 'TaskList',
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  emits: ['toggle', 'delete', 'edit'],
  data() {
    return {
      filter: 'all',
      searchQuery: '',
      searchResults: [],
      debounceTimer: null
    };
  },
  computed: {
    filteredTasks() {
      switch (this.filter) {
        case 'active':
          return this.tasks.filter(t => !t.done);
        case 'done':
          return this.tasks.filter(t => t.done);
        default:
          return this.tasks;
      }
    },
    activeCount() {
      return this.tasks.filter(t => !t.done).length;
    },
    doneCount() {
      return this.tasks.filter(t => t.done).length;
    },
    displayedTasks() {
      return this.searchQuery ? this.searchResults : this.filteredTasks;
    }
  },
  watch: {
    searchQuery(newQuery) {
      clearTimeout(this.debounceTimer);
      
      if (!newQuery) {
        this.searchResults = [];
        return;
      }
      
      this.debounceTimer = setTimeout(() => {
        this.searchResults = this.filteredTasks.filter(task => {
          const searchLower = newQuery.toLowerCase();
          return (
            task.title.toLowerCase().includes(searchLower) ||
            (task.description && task.description.toLowerCase().includes(searchLower))
          );
        });
      }, 300);
    }
  },
  methods: {
    toggleTask(id) {
      this.$emit('toggle', id);
    },
    deleteTask(id) {
      this.$emit('delete', id);
    },
    editTask(task) {
      this.$emit('edit', task);
    },
    clearCompleted() {
      const completedIds = this.tasks
        .filter(t => t.done)
        .map(t => t.id);
      
      completedIds.forEach(id => this.$emit('delete', id));
    }
  }
}
</script>

<template>
  <div class="task-list">
    <div class="search-bar">
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Rechercher une tâche..."
        class="search-input"
      />
    </div>
    
    <div class="filters">
      <button 
        @click="filter = 'all'"
        :class="{ active: filter === 'all' }"
        class="filter-btn"
      >
        Toutes ({{ tasks.length }})
      </button>
      <button 
        @click="filter = 'active'"
        :class="{ active: filter === 'active' }"
        class="filter-btn"
      >
        Actives ({{ activeCount }})
      </button>
      <button 
        @click="filter = 'done'"
        :class="{ active: filter === 'done' }"
        class="filter-btn"
      >
        Terminées ({{ doneCount }})
      </button>
    </div>
    
    <div v-if="displayedTasks.length === 0" class="empty-state">
      <p>{{ searchQuery ? 'Aucun résultat trouvé' : 'Aucune tâche pour le moment' }}</p>
    </div>
    
    <div v-else class="tasks-container">
      <TaskItem
        v-for="task in displayedTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
        @edit="editTask"
      />
    </div>
    
    <div v-if="doneCount > 0" class="list-footer">
      <button @click="clearCompleted" class="btn-clear">
        Effacer les tâches terminées
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-list {
  width: 100%;
}

.search-bar {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #42b883;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: #42b883;
  color: #42b883;
}

.filter-btn.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
}

.tasks-container {
  margin-bottom: 1rem;
}

.list-footer {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.btn-clear {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-clear:hover {
  background: #dc2626;
}
</style>
