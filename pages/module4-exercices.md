---
layout: new-section
routeAlias: 'module4-exercices'
---

<a name="module4-exercices" id="module4-exercices"></a>

# Exercices Pratiques
## Module 4 - State Management avec Pinia

---

# Exercice 1 - Store Products

### Objectif
Créer un store pour gérer une liste de produits

### Fonctionnalités

- State: products[], loading, error
- Actions: fetchProducts(), addProduct(), deleteProduct(), updateProduct()
- Getters: productCount, totalValue, getProductById
- Intégration API (JSONPlaceholder ou mockAPI)

---

# Exercice 2 - Store Cart (Panier)

### Objectif
Créer un store pour gérer un panier d'achat

### Fonctionnalités

- State: items[] (avec quantity)
- Actions: addToCart(), removeFromCart(), updateQuantity(), clearCart()
- Getters: itemCount, totalItems, totalPrice, cartSummary
- Vérifier le stock avant d'ajouter

---

# Exercice 3 - Store Auth

### Objectif
Créer un store d'authentification

### Fonctionnalités

- State: user, token, isLoggedIn, permissions
- Actions: login(), logout(), refreshToken(), checkAuth()
- Getters: userFullName, hasPermission(perm)
- Persistence du token dans localStorage

---

# Exercice 4 - Interaction entre stores

### Objectif
Faire communiquer les stores entre eux

### Scénarios

- Cart doit vérifier si user est logged in (Auth store)
- Cart doit vérifier le stock (Products store)
- Products affiche différemment selon le role (Auth store)
- Actions admin disponibles selon permissions

---

# Exercice 5 - Plugin de persistence

### Objectif
Créer un plugin Pinia pour la persistence

### Fonctionnalités

- Auto-save dans localStorage
- Auto-load au démarrage
- Configuration par store (quels stores persister)
- Expiration optionnelle

---

# Projet Fil Rouge - Partie 4

### Intégrer Pinia dans l'application de produits

**Objectifs**:

1. Migrer le state local vers Pinia
2. Créer les stores: products, cart, auth
3. Implémenter la persistence du panier
4. Ajouter l'authentification simulée
5. Gérer les permissions (admin/user)
6. Intégrer les DevTools Vue

**Checklist**:
- ✅ Installation et configuration de Pinia
- ✅ Store products avec CRUD
- ✅ Store cart avec calculs
- ✅ Store auth avec permissions
- ✅ Persistence localStorage
- ✅ Communication entre stores
- ✅ TypeScript (bonus)

---
layout: new-section
---

# 🎯 Fil Rouge : TaskFlow
## Exercices Module 4

---

# TaskFlow - Exercice 1 : Store Tasks

### Objectif
Créer un store Pinia pour gérer les tâches

### Spécifications

**State** :
- `tasks` : Array de tâches
- `filter` : 'all' | 'active' | 'done'
- `loading` : Boolean
- `error` : String | null

**Actions** :
- `fetchTasks()` : Charger depuis API/localStorage
- `addTask(task)` : Ajouter une tâche
- `updateTask(id, updates)` : Modifier une tâche
- `deleteTask(id)` : Supprimer une tâche
- `toggleTask(id)` : Toggle done/undone
- `setFilter(filter)` : Changer le filtre

---

# TaskFlow - Solution Store Tasks (1/4)

```js
// stores/tasks.js
import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    filter: 'all',
    loading: false,
    error: null
  }),
  
  getters: {
    // Tâches filtrées selon le filtre actif
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
    
    // Nombre de tâches actives
    activeCount(state) {
      return state.tasks.filter(t => !t.done).length;
    },
    
    // Nombre de tâches terminées
    doneCount(state) {
      return state.tasks.filter(t => t.done).length;
    },
    
    // Tâches par priorité
    tasksByPriority(state) {
      return (priority) => {
        return state.tasks.filter(t => t.priority === priority);
      };
    },
    
    // Rechercher une tâche par ID
    getTaskById(state) {
      return (id) => state.tasks.find(t => t.id === id);
    }
  }
});
```

---

# TaskFlow - Solution Store Tasks (2/4)

```js
// stores/tasks.js (suite)
export const useTasksStore = defineStore('tasks', {
  // ... state et getters précédents
  
  actions: {
    // Charger les tâches
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      
      try {
        // Option 1: Depuis localStorage
        const stored = localStorage.getItem('taskflow-tasks');
        if (stored) {
          this.tasks = JSON.parse(stored);
        }
        
        // Option 2: Depuis une API
        // const response = await fetch('/api/tasks');
        // this.tasks = await response.json();
        
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    
    // Ajouter une tâche
    addTask(task) {
      const newTask = {
        id: Date.now(),
        done: false,
        createdAt: new Date().toISOString(),
        ...task
      };
      
      this.tasks.push(newTask);
      this._persist();
    },
    
    // Suite dans la slide suivante...
  }
});
```

---

# TaskFlow - Solution Store Tasks (3/4)

```js
// stores/tasks.js (suite)
export const useTasksStore = defineStore('tasks', {
  // ... state, getters et actions précédentes
  
  actions: {
    // ... actions précédentes
    
    // Modifier une tâche
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
    
    // Supprimer une tâche
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this._persist();
    },
    
    // Toggle done/undone
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.done = !task.done;
        task.completedAt = task.done ? new Date().toISOString() : null;
        this._persist();
      }
    },
    
    // Changer le filtre
    setFilter(filter) {
      this.filter = filter;
    },
    
    // Suite dans la slide suivante...
  }
});
```

---

# TaskFlow - Solution Store Tasks (4/4)

```js
// stores/tasks.js (suite)
export const useTasksStore = defineStore('tasks', {
  // ... state, getters et actions précédentes
  
  actions: {
    // ... actions précédentes
    
    // Supprimer toutes les tâches terminées
    clearCompleted() {
      this.tasks = this.tasks.filter(t => !t.done);
      this._persist();
    },
    
    // Marquer toutes comme terminées
    markAllDone() {
      this.tasks.forEach(t => {
        t.done = true;
        t.completedAt = new Date().toISOString();
      });
      this._persist();
    },
    
    // Méthode privée pour la persistence
    _persist() {
      localStorage.setItem('taskflow-tasks', JSON.stringify(this.tasks));
    }
  }
});
```

---

# TaskFlow - Utilisation Store Tasks (1/2)

**Script :**

```vue
<script>
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';

export default {
  name: 'TaskList',
  setup() {
    const tasksStore = useTasksStore();
    
    // ✅ Utiliser storeToRefs pour garder la réactivité
    const { filteredTasks, activeCount, doneCount, loading } = storeToRefs(tasksStore);
    
    return {
      tasksStore,
      filteredTasks,
      activeCount,
      doneCount,
      loading
    };
  },
  mounted() {
    this.tasksStore.fetchTasks();
  },
  methods: {
    addNewTask() {
      this.tasksStore.addTask({
        title: 'Nouvelle tâche',
        description: 'Description',
        priority: 'medium'
      });
    },
    handleToggle(id) {
      this.tasksStore.toggleTask(id);
    },
    handleDelete(id) {
      this.tasksStore.deleteTask(id);
    }
  }
}
</script>
```

---

# TaskFlow - Utilisation Store Tasks (2/2)

**Template :**

```vue
<template>
  <div>
    <div class="stats">
      <span>{{ activeCount }} actives</span>
      <span>{{ doneCount }} terminées</span>
    </div>
    
    <div v-if="loading">Chargement...</div>
    
    <TaskItem 
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
      @toggle="handleToggle"
      @delete="handleDelete"
    />
    
    <button @click="addNewTask">➕ Nouvelle tâche</button>
  </div>
</template>
```

---

# TaskFlow - Exercice 2 : Store Categories

### Objectif
Créer un store pour gérer les catégories de tâches

### Spécifications

**State** :
- `categories` : Array de catégories
- `selectedCategory` : ID de la catégorie active

**Actions** :
- `addCategory(category)`
- `updateCategory(id, updates)`
- `deleteCategory(id)`
- `selectCategory(id)`

**Getters** :
- `categoryById(id)` : Trouver une catégorie
- `tasksByCategory(categoryId)` : Tâches d'une catégorie

**Interaction** :
- Utiliser le store `tasks` dans les getters

---

# TaskFlow - Solution Store Categories (1/2)

```js
// stores/categories.js
import { defineStore } from 'pinia';
import { useTasksStore } from './tasks';

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [
      { id: 1, name: 'Personnel', color: '#3b82f6', icon: '👤' },
      { id: 2, name: 'Travail', color: '#8b5cf6', icon: '💼' },
      { id: 3, name: 'Urgent', color: '#ef4444', icon: '🚨' }
    ],
    selectedCategory: null
  }),
  
  getters: {
    // Catégorie par ID
    categoryById(state) {
      return (id) => state.categories.find(c => c.id === id);
    },
    
    // Catégorie sélectionnée
    activeCategory(state) {
      return state.categories.find(c => c.id === state.selectedCategory);
    },
    
    // ✅ Tâches de la catégorie (utilise le store tasks)
    tasksByCategory() {
      return (categoryId) => {
        const tasksStore = useTasksStore();
        return tasksStore.tasks.filter(t => t.categoryId === categoryId);
      };
    },
    
    // Nombre de tâches par catégorie
    taskCountByCategory() {
      return (categoryId) => {
        const tasksStore = useTasksStore();
        return tasksStore.tasks.filter(
          t => t.categoryId === categoryId && !t.done
        ).length;
      };
    }
  }
});
```

---

# TaskFlow - Solution Store Categories (2/2)

```js
// stores/categories.js (suite)
export const useCategoriesStore = defineStore('categories', {
  // ... state et getters précédents
  
  actions: {
    // Ajouter une catégorie
    addCategory(category) {
      const newCategory = {
        id: Date.now(),
        ...category
      };
      this.categories.push(newCategory);
      this._persist();
    },
    
    // Modifier une catégorie
    updateCategory(id, updates) {
      const index = this.categories.findIndex(c => c.id === id);
      if (index !== -1) {
        this.categories[index] = {
          ...this.categories[index],
          ...updates
        };
        this._persist();
      }
    },
    
    // Supprimer une catégorie
    deleteCategory(id) {
      // ⚠️ Avant de supprimer, vérifier qu'aucune tâche ne l'utilise
      const tasksStore = useTasksStore();
      const hasTasks = tasksStore.tasks.some(t => t.categoryId === id);
      
      if (hasTasks) {
        throw new Error('Impossible de supprimer une catégorie contenant des tâches');
      }
      
      this.categories = this.categories.filter(c => c.id !== id);
      this._persist();
    },
    
    // Sélectionner une catégorie
    selectCategory(id) {
      this.selectedCategory = id;
    },
    
    // Persistence
    _persist() {
      localStorage.setItem('taskflow-categories', JSON.stringify(this.categories));
    }
  }
});
```

---

# TaskFlow - Exercice 3 : Store Auth

### Objectif
Créer un store d'authentification pour TaskFlow

### Spécifications

**State** :
- `user` : Object | null
- `token` : String | null
- `isAuthenticated` : Boolean

**Actions** :
- `login(email, password)` : Authentifier
- `logout()` : Déconnecter
- `checkAuth()` : Vérifier le token au démarrage

**Getters** :
- `userDisplayName` : Nom formaté
- `canDeleteTasks` : Permission
- `canCreateCategories` : Permission

---

# TaskFlow - Solution Store Auth (1/2)

**State et Getters :**

```js
// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),
  
  getters: {
    userDisplayName(state) {
      if (!state.user) return 'Invité';
      return `${state.user.firstName} ${state.user.lastName}`;
    },
    
    canDeleteTasks(state) {
      return state.user?.role === 'admin' || state.user?.role === 'editor';
    },
    
    canCreateCategories(state) {
      return state.user?.role === 'admin';
    }
  }
});
```

---

# TaskFlow - Solution Store Auth (2/3)

**Action login :**

```js
// stores/auth.js (suite)
export const useAuthStore = defineStore('auth', {
  // ... state et getters précédents
  
  actions: {
    async login(email, password) {
      try {
        // Simulation d'appel API
        // const response = await fetch('/api/auth/login', { ... });
        
        // Mock pour l'exemple
        const mockUser = {
          id: 1,
          email,
          firstName: 'John',
          lastName: 'Doe',
          role: email === 'admin@taskflow.com' ? 'admin' : 'user'
        };
        
        this.user = mockUser;
        this.token = 'fake-jwt-token-' + Date.now();
        this.isAuthenticated = true;
        
        // Sauvegarder dans localStorage
        localStorage.setItem('taskflow-token', this.token);
        localStorage.setItem('taskflow-user', JSON.stringify(this.user));
        
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    }
  }
});
```

---

# TaskFlow - Solution Store Auth (3/3)

**Actions logout et checkAuth :**

```js
// stores/auth.js (suite)
export const useAuthStore = defineStore('auth', {
  // ... state, getters et login précédents
  
  actions: {
    // ... login précédent
    
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('taskflow-token');
      localStorage.removeItem('taskflow-user');
    },
    
    checkAuth() {
      const token = localStorage.getItem('taskflow-token');
      const user = localStorage.getItem('taskflow-user');
      
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
      }
    }
  }
});
```

---

# TaskFlow - Interaction entre Stores (1/2)

**Script :**

```vue
<script>
import { useTasksStore } from '@/stores/tasks';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

export default {
  name: 'TaskActions',
  setup() {
    const tasksStore = useTasksStore();
    const authStore = useAuthStore();
    
    const { canDeleteTasks } = storeToRefs(authStore);
    
    return {
      tasksStore,
      authStore,
      canDeleteTasks
    };
  },
  methods: {
    handleDelete(taskId) {
      // ✅ Vérifier la permission AVANT de supprimer
      if (!this.canDeleteTasks) {
        alert('Vous n\'avez pas la permission de supprimer des tâches');
        return;
      }
      
      this.tasksStore.deleteTask(taskId);
    },
    
    handleAddCategory() {
      if (!this.authStore.canCreateCategories) {
        alert('Seuls les admins peuvent créer des catégories');
        return;
      }
      
      // Logique de création...
    }
  }
}
</script>
```

---

# TaskFlow - Interaction entre Stores (2/2)

**Template :**

```vue
<template>
  <div>
    <p>Connecté en tant que : {{ authStore.userDisplayName }}</p>
    
    <button 
      v-if="canDeleteTasks"
      @click="handleDelete(task.id)"
    >
      🗑️ Supprimer
    </button>
    
    <p v-else class="warning">
      Vous n'avez pas les permissions de suppression
    </p>
  </div>
</template>
```

---

# 🎯 Récap Module 4 - TaskFlow

### Ce que vous avez construit

✅ **Store Tasks** : CRUD complet avec filtres  
✅ **Store Categories** : Gestion de catégories  
✅ **Store Auth** : Authentification et permissions  
✅ **Interactions** : Communication entre stores  

### Concepts utilisés

- ✅ defineStore avec Options API
- ✅ State, Getters, Actions
- ✅ storeToRefs pour la réactivité
- ✅ Utilisation d'un store dans un autre
- ✅ Persistence localStorage
- ✅ Gestion des permissions
- ✅ Getters paramétrés
- ✅ Actions asynchrones

### 🚀 Next : Module 5

On va ajouter le **routing** à TaskFlow avec **Vue Router** !

- Navigation entre vues
- Routes dynamiques (/task/:id)
- Guards de navigation (auth required)
