---
layout: exercices
routeAlias: 'module1-exercices'
---

<a name="module1-exercices" id="module1-exercices"></a>

# Exercices Pratiques
## Module 1 - Introduction à Vue.js et bases fondamentales

---

# Exercice 1 - Setup de l'environnement

### Objectif
Mettre en place votre environnement de développement Vue.js

### Instructions

1. Vérifier l'installation de Node.js (v20+)
2. Créer un nouveau projet avec Vite
3. Explorer la structure du projet
4. Lancer le serveur de développement
5. Modifier le composant App.vue

### Commandes

```bash
node --version
npm create vite@latest mon-projet-vue -- --template vue
cd mon-projet-vue
npm install
npm run dev
```

---

# Exercice 2 - Compteur simple

### Objectif
Créer un composant compteur avec les fonctionnalités de base

### Fonctionnalités à implémenter

- Afficher la valeur du compteur
- Bouton pour incrémenter (+1)
- Bouton pour décrémenter (-1)
- Bouton pour réinitialiser à 0
- Afficher si le nombre est pair ou impair

### Bonus

- Ajouter un bouton +5 et -5
- Bloquer le décrement si compteur = 0
- Changer la couleur selon positif/négatif

---

# Exercice 2 - Solution de base (1/2)

**Script :**

```vue
<script>
export default {
  data() {
    return {
      compteur: 0
    }
  },
  computed: {
    estPair() {
      return this.compteur % 2 === 0;
    }
  },
  methods: {
    increment() {
      this.compteur++;
    },
    decrement() {
      this.compteur--;
    },
    reset() {
      this.compteur = 0;
    }
  }
}
</script>
```

---

# Exercice 2 - Solution de base (2/2)

**Template :**

```vue
<template>
  <div>
    <h1>Compteur: {{ compteur }}</h1>
    <p>{{ estPair ? 'Pair' : 'Impair' }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

---

# Exercice 3 - Todo List

### Objectif
Créer une application de gestion de tâches

### Fonctionnalités

- Ajouter une tâche
- Afficher la liste des tâches
- Marquer une tâche comme terminée
- Supprimer une tâche
- Afficher le nombre de tâches restantes

### Bonus

- Filtrer (toutes/actives/terminées)
- Modifier une tâche
- Sauvegarder dans le localStorage
- Ajouter une priorité (haute/moyenne/basse)

---

# Exercice 3 - Structure de données

```vue
<script>
export default {
  data() {
    return {
      nouveauTodo: '',
      todos: [
        { id: 1, text: 'Apprendre Vue.js', done: false },
        { id: 2, text: 'Créer un projet', done: false }
      ]
    }
  },
  methods: {
    ajouterTodo() {
      if (this.nouveauTodo.trim()) {
        this.todos.push({
          id: Date.now(),
          text: this.nouveauTodo,
          done: false
        });
        this.nouveauTodo = '';
      }
    },
    supprimerTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id);
    }
  }
}
</script>
```

---

# Exercice 3 - Template

```vue
<template>
  <div>
    <h1>Ma Todo List</h1>
    
    <form @submit.prevent="ajouterTodo">
      <input 
        v-model="nouveauTodo" 
        placeholder="Nouvelle tâche..."
      />
      <button type="submit">Ajouter</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input 
          type="checkbox" 
          v-model="todo.done"
        />
        <span :class="{ done: todo.done }">
          {{ todo.text }}
        </span>
        <button @click="supprimerTodo(todo.id)">X</button>
      </li>
    </ul>
  </div>
</template>
```

---

# Exercice 4 - Composant UserCard

### Objectif
Créer un composant réutilisable de carte utilisateur

### Props à recevoir

- `nom` (String, required)
- `email` (String, required)
- `age` (Number)
- `avatar` (String)
- `role` (String)

### Événements à émettre

- `click` : quand on clique sur la carte
- `edit` : quand on clique sur éditer
- `delete` : quand on clique sur supprimer

---

# Exercice 4 - Composant UserCard.vue

```vue
<script>
export default {
  props: {
    nom: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    age: Number,
    avatar: String,
    role: {
      type: String,
      default: 'user'
    }
  },
  emits: ['click', 'edit', 'delete']
}
</script>
```

---

# Exercice 4 - Template UserCard

```vue
<template>
  <div class="user-card" @click="emit('click')">
    <img 
      :src="avatar || '/default-avatar.png'" 
      :alt="nom"
    />
    <h3>{{ nom }}</h3>
    <p>{{ email }}</p>
    <p v-if="age">Âge: {{ age }} ans</p>
    <span class="role">{{ role }}</span>
    
    <div class="actions">
      <button @click.stop="emit('edit')">Éditer</button>
      <button @click.stop="emit('delete')">Supprimer</button>
    </div>
  </div>
</template>
```

---

# Exercice 5 - Liste d'utilisateurs

### Objectif
Utiliser le composant UserCard pour afficher une liste

### Fonctionnalités

- Afficher une liste de 5-10 utilisateurs
- Gérer le clic sur une carte (afficher détails)
- Gérer l'édition (modal ou form)
- Gérer la suppression (confirmation)
- Ajouter un nouveau utilisateur

### Bonus

- Recherche par nom
- Filtre par rôle
- Tri par nom/âge
- Pagination

---

# Exercice 5 - Utilisation du composant

```vue
<script>
import UserCard from './components/UserCard.vue';

export default {
  components: {
    UserCard
  },
  data() {
    return {
      users: [
        { 
          id: 1, 
          nom: 'Alice Martin', 
          email: 'alice@example.com',
          age: 28,
          role: 'admin'
        },
        { 
          id: 2, 
          nom: 'Bob Dupont', 
          email: 'bob@example.com',
          age: 35,
          role: 'user'
        }
      ]
    }
  },
  methods: {
    handleEdit(user) {
      console.log('Edit:', user);
    },
    handleDelete(userId) {
      this.users = this.users.filter(u => u.id !== userId);
    }
  }
}
</script>
```

---

# Exercice 5 - Template

```vue
<template>
  <div class="users-list">
    <h1>Liste des utilisateurs</h1>
    
    <div class="grid">
      <UserCard
        v-for="user in users"
        :key="user.id"
        v-bind="user"
        @edit="handleEdit(user)"
        @delete="handleDelete(user.id)"
      />
    </div>
  </div>
</template>
```

---

# Exercice 6 - Fetch API users

### Objectif
Récupérer et afficher des utilisateurs depuis une API

### Instructions

1. Utiliser l'API JSONPlaceholder : `https://jsonplaceholder.typicode.com/users`
2. Afficher un loader pendant le chargement
3. Afficher les utilisateurs dans des cartes
4. Gérer les erreurs
5. Ajouter un bouton pour recharger

### API à utiliser

```javascript
const API_URL = 'https://jsonplaceholder.typicode.com/users';
```

---

# Exercice 6 - Solution fetch

```vue
<script>
export default {
  data() {
    return {
      users: [],
      loading: true,
      error: null
    }
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        
        this.users = await response.json();
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>
```

---

# Exercice 6 - Template avec états

```vue
<template>
  <div>
    <h1>Utilisateurs</h1>
    
    <div v-if="loading" class="loader">
      Chargement...
    </div>
    
    <div v-else-if="error" class="error">
      Erreur: {{ error }}
      <button @click="fetchUsers">Réessayer</button>
    </div>
    
    <div v-else class="users-grid">
      <UserCard 
        v-for="user in users"
        :key="user.id"
        :nom="user.name"
        :email="user.email"
      />
    </div>
  </div>
</template>
```

---

# Exercice 7 - Composable useCompteur

### Objectif
Créer un composable réutilisable pour gérer un compteur

### Fonctionnalités du composable

- État du compteur
- Fonction increment
- Fonction decrement
- Fonction reset
- Computed pour pair/impair
- Option pour min/max

---

# Exercice 7 - Solution useCompteur.js

```javascript
import { ref, computed } from 'vue';

export function useCompteur(initialValue = 0, options = {}) {
  const { min = -Infinity, max = Infinity } = options;
  
  const count = ref(initialValue);
  
  const increment = (step = 1) => {
    count.value = Math.min(count.value + step, max);
  };
  
  const decrement = (step = 1) => {
    count.value = Math.max(count.value - step, min);
  };
  
  const reset = () => {
    count.value = initialValue;
  };
  
  const estPair = computed(() => count.value % 2 === 0);
  
  return {
    count,
    increment,
    decrement,
    reset,
    estPair
  };
}
```

---

# Exercice 7 - Utilisation avec mixin (1/2)

**Définition du mixin :**

```javascript
// Avec Options API, on utilise les mixins plutôt que les composables
const compteurMixin = {
  data() {
    return {
      count: 0,
      min: 0,
      max: 100
    }
  },
  computed: {
    estPair() {
      return this.count % 2 === 0;
    }
  },
  methods: {
    increment(step = 1) {
      this.count = Math.min(this.count + step, this.max);
    },
    decrement(step = 1) {
      this.count = Math.max(this.count - step, this.min);
    },
    reset() {
      this.count = 0;
    }
  }
};
```

---

# Exercice 7 - Utilisation avec mixin (2/2)

**Utilisation dans le composant :**

```vue
<script>
export default {
  mixins: [compteurMixin]
}
</script>

<template>
  <div>
    <h1>{{ count }}</h1>
    <p>{{ estPair ? 'Pair' : 'Impair' }}</p>
    <button @click="increment()">+1</button>
    <button @click="increment(5)">+5</button>
    <button @click="decrement()">-1</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

---

# Exercice 8 - Composable useFetch

### Objectif
Créer un composable pour gérer les appels API

### Fonctionnalités

- État data, loading, error
- Fonction fetch automatique
- Fonction refresh
- Support des méthodes GET/POST/PUT/DELETE
- Gestion du cache (bonus)

---

# Exercice 8 - Solution useFetch.js

```javascript
import { ref } from 'vue';

export function useFetch(url, options = {}) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const execute = async (method = 'GET', body = null) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: body ? JSON.stringify(body) : null
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      data.value = await response.json();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}
```

---

# Projet Fil Rouge - Partie 1

### Application de gestion de produits

Créer une application complète avec les fonctionnalités suivantes :

**Phase 1 - Liste de produits**
- Afficher une liste de produits (nom, prix, description, image)
- Créer un composant ProductCard réutilisable
- Utiliser v-for pour la liste

**Phase 2 - CRUD basique**
- Ajouter un produit
- Supprimer un produit
- Éditer un produit

---

# Projet Fil Rouge - Structure

```javascript
// Structure de données
const produits = ref([
  {
    id: 1,
    nom: 'Ordinateur portable',
    prix: 899.99,
    description: 'PC performant',
    image: '/laptop.jpg',
    stock: 15,
    categorie: 'Informatique'
  },
  {
    id: 2,
    nom: 'Souris gaming',
    prix: 49.99,
    description: 'Souris RGB',
    image: '/mouse.jpg',
    stock: 42,
    categorie: 'Accessoires'
  }
]);
```

---

# Projet Fil Rouge - Fonctionnalités bonus

**Phase 3 - Recherche et filtres**
- Barre de recherche par nom
- Filtre par catégorie
- Filtre par prix (min-max)
- Tri (prix, nom, stock)

**Phase 4 - Computed et watchers**
- Total du panier
- Nombre d'articles
- Prix moyen
- Produits en rupture de stock

**Phase 5 - Persistance**
- Sauvegarder dans localStorage
- Charger au démarrage

---

# Ressources complémentaires

### Documentation officielle

- 📚 [Vue.js 3 Documentation](https://vuejs.org/)
- 🔧 [Vite Guide](https://vitejs.dev/)
- 📦 [npm Documentation](https://docs.npmjs.com/)

### Tutoriels

- 🎥 Vue Mastery
- 🎓 Vue School
- 📺 Chaînes YouTube Vue.js

### Outils

- 🛠️ [Vue DevTools](https://devtools.vuejs.org/)
- 💻 [VS Code + Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)

---

# Checklist de validation

Avant de passer au Module 2, assurez-vous de maîtriser :

- ✅ Installation et configuration de l'environnement
- ✅ Syntaxe JavaScript ES6+ (arrow functions, destructuring, async/await)
- ✅ Création d'un projet Vue avec Vite
- ✅ Utilisation des directives (v-bind, v-if, v-for, v-model)
- ✅ Création de composants
- ✅ Communication parent-enfant (props, emit)
- ✅ Propriétés calculées (computed)
- ✅ Watch (observateurs)
- ✅ Lifecycle hooks (onMounted, onUnmounted)
- ✅ Appels API avec fetch

---
layout: new-section
---

# 🎯 Fil Rouge : TaskFlow
## Exercices Module 1

---

# TaskFlow - Exercice 1 : TaskItem.vue

### Objectif
Créer le composant de base pour afficher une tâche

### Spécifications

**Props** :
- `task` (Object) : `{ id, title, description, done, priority }`

**Features** :
- Afficher le titre de la tâche
- Afficher la description
- Checkbox pour marquer comme terminée
- Badge de priorité (low, medium, high, urgent)
- Barrer le texte si `done === true`

**Événements** :
- `@toggle` : Émettre quand on coche/décoche
- `@delete` : Émettre quand on clique sur supprimer

---

# TaskFlow - Solution TaskItem.vue (1/2)

**Script :**

```vue
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
  emits: ['toggle', 'delete'],
  computed: {
    priorityColor() {
      const colors = {
        low: '#10b981',
        medium: '#f59e0b',
        high: '#f97316',
        urgent: '#ef4444'
      };
      return colors[this.task.priority] || '#6b7280';
    },
    priorityLabel() {
      const labels = {
        low: 'Basse',
        medium: 'Moyenne',
        high: 'Haute',
        urgent: 'URGENT'
      };
      return labels[this.task.priority] || 'Normal';
    }
  }
}
</script>
```

---

# TaskFlow - Solution TaskItem.vue (2/2)

**Template :**

```vue
<template>
  <div class="task-item" :class="{ done: task.done }">
    <div class="task-checkbox">
      <input 
        type="checkbox" 
        :checked="task.done"
        @change="$emit('toggle', task.id)"
      />
    </div>
    
    <div class="task-content">
      <h3 class="task-title">{{ task.title }}</h3>
      <p class="task-description">{{ task.description }}</p>
      
      <span 
        class="task-priority" 
        :style="{ backgroundColor: priorityColor }"
      >
        {{ priorityLabel }}
      </span>
    </div>
    
    <button 
      class="task-delete"
      @click="$emit('delete', task.id)"
    >
      🗑️
    </button>
  </div>
</template>
```

---

# TaskFlow - Solution TaskItem Styles

```vue
<style scoped>
.task-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
}

.task-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-item.done .task-title,
.task-item.done .task-description {
  text-decoration: line-through;
  opacity: 0.6;
}

.task-content {
  flex: 1;
}

.task-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.task-description {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
}

.task-priority {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
```

---

# TaskFlow - Exercice 2 : TaskList.vue

### Objectif
Créer un composant pour gérer une liste de tâches

### Spécifications

**Data** :
- `tasks` (Array) : Liste des tâches
- `filter` : 'all' | 'active' | 'done'

**Computed** :
- `filteredTasks` : Tâches filtrées selon `filter`
- `activeCount` : Nombre de tâches non terminées
- `doneCount` : Nombre de tâches terminées

**Methods** :
- `toggleTask(id)` : Toggle le statut done
- `deleteTask(id)` : Supprimer une tâche
- `clearCompleted()` : Supprimer toutes les tâches terminées

**Bonus** :
- Afficher un message si aucune tâche
- Compteur de tâches

---

# TaskFlow - Solution TaskList.vue (1/3)

**Script - Data :**

```vue
<script>
import TaskItem from './TaskItem.vue';

export default {
  name: 'TaskList',
  components: {
    TaskItem
  },
  data() {
    return {
      tasks: [
        { 
          id: 1, 
          title: 'Apprendre Vue.js', 
          description: 'Suivre la formation complète',
          done: false, 
          priority: 'high' 
        },
        { 
          id: 2, 
          title: 'Créer TaskFlow', 
          description: 'Application de gestion de tâches',
          done: false, 
          priority: 'urgent' 
        },
        { 
          id: 3, 
          title: 'Setup projet', 
          description: 'Initialiser avec Vite',
          done: true, 
          priority: 'medium' 
        }
      ],
      filter: 'all'
    }
  }
}
</script>
```

---

# TaskFlow - Solution TaskList.vue (2/3)

**Computed et Methods :**

```vue
<script>
export default {
  // ... data précédent
  computed: {
    filteredTasks() {
      if (this.filter === 'active') {
        return this.tasks.filter(t => !t.done);
      }
      if (this.filter === 'done') {
        return this.tasks.filter(t => t.done);
      }
      return this.tasks;
    },
    activeCount() {
      return this.tasks.filter(t => !t.done).length;
    },
    doneCount() {
      return this.tasks.filter(t => t.done).length;
    }
  },
  methods: {
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.done = !task.done;
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(t => !t.done);
    }
  }
}
</script>
```

---

# TaskFlow - Solution TaskList.vue (3/4)

**Template - Header et Filtres :**

```vue
<template>
  <div class="task-list">
    <div class="task-header">
      <h2>Mes Tâches</h2>
      <div class="task-stats">
        <span>{{ activeCount }} actives</span>
        <span>{{ doneCount }} terminées</span>
      </div>
    </div>
    
    <div class="task-filters">
      <button 
        @click="filter = 'all'"
        :class="{ active: filter === 'all' }"
      >
        Toutes ({{ tasks.length }})
      </button>
      <button 
        @click="filter = 'active'"
        :class="{ active: filter === 'active' }"
      >
        Actives ({{ activeCount }})
      </button>
      <button 
        @click="filter = 'done'"
        :class="{ active: filter === 'done' }"
      >
        Terminées ({{ doneCount }})
      </button>
    </div>
  </div>
</template>
```

---

# TaskFlow - Solution TaskList.vue (4/4)

**Template - Liste et Actions :**

```vue
<template>
  <div class="task-list">
    <!-- ... header et filtres de la slide précédente ... -->
    
    <div class="tasks">
      <TaskItem 
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
      />
      
      <div v-if="filteredTasks.length === 0" class="empty">
        Aucune tâche
      </div>
    </div>
    
    <button 
      v-if="doneCount > 0"
      class="clear-completed"
      @click="clearCompleted"
    >
      Supprimer les tâches terminées ({{ doneCount }})
    </button>
  </div>
</template>
```

---

# TaskFlow - Exercice 3 : TaskForm.vue

### Objectif
Créer un formulaire pour ajouter/éditer des tâches

### Spécifications

**Data** :
- `formData` : `{ title, description, priority }`

**Props** (optionnel) :
- `editTask` : Tâche à éditer (si mode édition)

**Validation** :
- Titre requis (min 3 caractères)
- Description optionnelle
- Priorité par défaut : 'medium'

**Événements** :
- `@submit` : Émettre les données du formulaire
- `@cancel` : Annuler l'édition

---

# TaskFlow - Solution TaskForm.vue

```vue
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
    }
  },
  computed: {
    isValid() {
      return this.formData.title.trim().length >= 3;
    }
  },
  methods: {
    handleSubmit() {
      if (this.isValid) {
        this.$emit('submit', { ...this.formData });
        this.resetForm();
      }
    },
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        priority: 'medium'
      };
    }
  },
  mounted() {
    if (this.editTask) {
      this.formData = { ...this.editTask };
    }
  }
}
</script>
```

---

# TaskFlow - Solution TaskForm Template

```vue
<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div class="form-group">
      <label>Titre *</label>
      <input 
        v-model="formData.title"
        type="text"
        placeholder="Ma nouvelle tâche..."
        required
      />
    </div>
    
    <div class="form-group">
      <label>Description</label>
      <textarea 
        v-model="formData.description"
        placeholder="Détails de la tâche..."
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
      <button type="submit" :disabled="!isValid">
        {{ editTask ? 'Modifier' : 'Ajouter' }}
      </button>
      <button type="button" @click="$emit('cancel')">
        Annuler
      </button>
    </div>
  </form>
</template>
```

---

# TaskFlow - Exercice 4 : Recherche avec Watch

### Objectif
Ajouter une recherche en temps réel avec debounce

### Spécifications

**Data** :
- `searchQuery` : Terme de recherche

**Watch** :
- Surveiller `searchQuery`
- Appliquer un debounce de 300ms
- Filtrer les tâches par titre/description

**Computed** :
- `searchResults` : Tâches filtrées par recherche

### Bonus
- Surligner les résultats
- Afficher "Aucun résultat"

---

# TaskFlow - Solution Recherche (1/2)

```vue
<script>
export default {
  data() {
    return {
      tasks: [ /* ... */ ],
      searchQuery: '',
      searchResults: [],
      debounceTimer: null
    }
  },
  watch: {
    // ✅ WATCH avec debounce
    searchQuery(newQuery) {
      clearTimeout(this.debounceTimer);
      
      if (!newQuery.trim()) {
        this.searchResults = [];
        return;
      }
      
      this.debounceTimer = setTimeout(() => {
        const query = newQuery.toLowerCase();
        this.searchResults = this.tasks.filter(task => {
          return task.title.toLowerCase().includes(query) ||
                 task.description.toLowerCase().includes(query);
        });
      }, 300);
    }
  },
  computed: {
    displayedTasks() {
      return this.searchQuery.trim() 
        ? this.searchResults 
        : this.filteredTasks;
    }
  }
}
</script>
```

---

# TaskFlow - Solution Recherche (2/2)

```vue
<template>
  <div class="task-list">
    <!-- Header -->
    <div class="search-bar">
      <input 
        v-model="searchQuery"
        type="search"
        placeholder="🔍 Rechercher une tâche..."
        class="search-input"
      />
      <span v-if="searchQuery" class="search-info">
        {{ searchResults.length }} résultat(s)
      </span>
    </div>
    
    <!-- Filters -->
    <div class="task-filters">
      <!-- ... boutons filtres ... -->
    </div>
    
    <!-- Task List -->
    <div class="tasks">
      <TaskItem 
        v-for="task in displayedTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
      />
      
      <div v-if="displayedTasks.length === 0" class="empty">
        {{ searchQuery 
          ? `Aucune tâche trouvée pour "${searchQuery}"` 
          : 'Aucune tâche' 
        }}
      </div>
    </div>
  </div>
</template>
```

---

# 🎯 Récap Module 1 - TaskFlow

### Ce que vous avez construit

✅ **TaskItem.vue** : Composant de tâche avec props/events  
✅ **TaskList.vue** : Gestion de liste avec filtres  
✅ **TaskForm.vue** : Formulaire avec v-model et validation  
✅ **Recherche** : Watch avec debounce  

### Concepts utilisés

- ✅ Data binding & v-model
- ✅ Directives (v-for, v-if, v-bind, v-on)
- ✅ Props & Events (communication parent/enfant)
- ✅ Computed properties (filtrage, compteurs)
- ✅ Watch (recherche avec debounce)
- ✅ Lifecycle hooks (mounted)

### 🚀 Next : Module 2

On va rendre nos composants **ultra-réutilisables** avec les **slots** !

- TaskCard avec slots (header, content, actions)
- Modal réutilisable
- BoardColumn flexible
