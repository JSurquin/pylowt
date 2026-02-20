const { createApp } = Vue;

createApp({
  data() {
    return {
      newTodo: '',
      filter: 'all',
      todos: []
    };
  },
  
  computed: {
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.activeTodos;
        case 'completed':
          return this.completedTodos;
        default:
          return this.todos;
      }
    },
    
    activeTodos() {
      return this.todos.filter(todo => !todo.completed);
    },
    
    completedTodos() {
      return this.todos.filter(todo => todo.completed);
    },
    
    allCompleted() {
      return this.todos.length > 0 && this.todos.every(todo => todo.completed);
    }
  },
  
  methods: {
    addTodo() {
      const text = this.newTodo.trim();
      if (text) {
        this.todos.push({
          id: Date.now(),
          text: text,
          completed: false
        });
        this.newTodo = '';
        this.saveTodos();
      }
    },
    
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveTodos();
    },
    
    editTodo(todo) {
      const newText = prompt('Modifier la tâche:', todo.text);
      if (newText !== null && newText.trim()) {
        todo.text = newText.trim();
        this.saveTodos();
      }
    },
    
    toggleAll() {
      const value = !this.allCompleted;
      this.todos.forEach(todo => {
        todo.completed = value;
      });
      this.saveTodos();
    },
    
    clearCompleted() {
      this.todos = this.activeTodos;
      this.saveTodos();
    },
    
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    
    loadTodos() {
      const stored = localStorage.getItem('todos');
      if (stored) {
        try {
          this.todos = JSON.parse(stored);
        } catch (e) {
          console.error('Erreur lors du chargement des todos:', e);
          this.todos = [];
        }
      }
    }
  },
  
  mounted() {
    this.loadTodos();
  },
  
  watch: {
    todos: {
      handler() {
        this.saveTodos();
      },
      deep: true
    }
  }
}).mount('#app');
