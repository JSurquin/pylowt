---
layout: new-section
routeAlias: 'module1-exercices'
---

<a name="module1-exercices" id="module1-exercices"></a>

# Exercices Pratiques
## Module 1 - Introduction à Vue.js et bases fondamentales

---

# 🎯 Fil Rouge : TaskFlow
## Exercices Module 1

Maintenant que vous avez vu tous les concepts théoriques du Module 1, il est temps de les mettre en pratique en construisant les composants de base de notre application TaskFlow !

### Les 5 exercices progressifs

Nous allons créer 5 exercices qui couvrent tous ces concepts dans le contexte de TaskFlow.

---

# Exercice 0 : Setup du projet TaskFlow

### Objectif

Mettre en place le projet TaskFlow avec Vite et créer la structure de base.

### Étapes à suivre

1. **Créer le projet avec Vite**
2. **Explorer la structure du projet**
3. **Créer les dossiers nécessaires**
4. **Lancer le serveur de développement**

### Concepts couverts

✅ **1.3 Outils et environnement** : Node.js, npm, Vite, structure de projet

---

# Exercice 0 - Étape 1 : Créer le projet

### Commandes

```bash
# Vérifier Node.js (v20+)
node --version

# Créer le projet TaskFlow avec Vite
npm create vite@latest taskflow-app -- --template vue

# Entrer dans le dossier
cd taskflow-app

# Installer les dépendances
npm install
```

### Ce qui se passe

- Vite génère un projet Vue 3 avec la structure optimale
- Configuration automatique du build tool
- Dépendances installées (vue, @vitejs/plugin-vue)

---

# Exercice 0 - Étape 2 : Structure du projet

### Arborescence générée

```
taskflow-app/
├── node_modules/         # Dépendances (ne pas modifier)
├── public/              
│   └── vite.svg         # Favicon
├── src/
│   ├── assets/          # Images, CSS
│   ├── components/      # Composants Vue (on va y travailler !)
│   ├── App.vue          # Composant racine
│   └── main.js          # Point d'entrée
├── index.html           # Page HTML principale
├── package.json         # Configuration npm
├── vite.config.js       # Configuration Vite
└── README.md
```

---

# Exercice 0 - Étape 3 : Créer la structure TaskFlow

### Créer les dossiers nécessaires

```bash
# Dans le dossier src/
mkdir src/components
```

### Structure finale souhaitée

```
src/
├── components/
│   ├── TaskItem.vue      # (Exercice 1)
│   ├── TaskList.vue      # (Exercice 2)
│   └── TaskForm.vue      # (Exercice 3)
├── App.vue
└── main.js
```

---

# Exercice 0 - Étape 4 : Lancer le projet

### Commande de démarrage

```bash
npm run dev
```

### Résultat attendu

```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Vérification

- Ouvrir http://localhost:5173/ dans votre navigateur
- Vous devriez voir la page d'accueil Vite + Vue
- Le hot reload fonctionne : modifiez App.vue et voyez les changements instantanés !

---

# Exercice 0 - Nettoyer App.vue

### Objectif

Préparer App.vue pour recevoir nos composants TaskFlow.

### ⚠️ IMPORTANT : Options API vs Composition API

**Attention !** Le template Vite génère par défaut du code avec **Composition API** :

```vue
<!-- Ce que Vite génère -->
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>
```

**Dans cette formation, nous utilisons l'Options API** :

```vue
<!-- Ce que nous allons utiliser -->
<script>
export default {
  name: 'App',
  data() { return {} },
  methods: {},
  computed: {}
}
</script>
```

**Pourquoi Options API ?**
- ✅ Plus facile à apprendre pour les débutants
- ✅ Structure claire (data, methods, computed bien séparés)
- ✅ Meilleure compréhension des concepts Vue
- ✅ La Composition API sera vue dans le Module Bonus !

---

### Remplacer le contenu de src/App.vue

```vue
<script>
export default {
  name: 'App'
}
</script>

<template>
  <div id="app">
    <header>
      <h1>🎯 TaskFlow</h1>
      <p>Votre gestionnaire de tâches moderne</p>
    </header>
    
    <main>
      <p>Prêt pour les exercices !</p>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #f5f7fa;
  color: #2c3e50;
}

#app {
  width: 100%;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

header h1 {
  font-size: 2.5rem;
  color: #42b883;
  margin-bottom: 0.5rem;
}

header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

main {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
</style>
```

---

# Exercice 0 - Vérification finale

### Checklist

- ✅ Projet créé avec Vite
- ✅ Dépendances installées
- ✅ Structure de dossiers créée
- ✅ Serveur de développement lancé (http://localhost:5173/)
- ✅ App.vue nettoyé et prêt
- ✅ Hot reload fonctionne

### Commandes utiles

```bash
# Démarrer le serveur
npm run dev

# Construire pour la production (plus tard)
npm run build

# Prévisualiser le build de production
npm run preview
```

### 🎉 Félicitations !

Votre environnement TaskFlow est prêt ! Passons maintenant à la création des composants.

---

# Exercice 1 : TaskItem.vue

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
- `@edit` : Émettre quand on clique sur éditer

---

# Exercice 1 - Solution TaskItem.vue (1/2)

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
  emits: ['toggle', 'delete', 'edit'],
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

# Exercice 1 - Solution TaskItem.vue (2/2)

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
    
    <div class="task-actions">
      <button 
        class="task-edit"
        @click="$emit('edit', task)"
      >
        ✏️
      </button>
      <button 
        class="task-delete"
        @click="$emit('delete', task.id)"
      >
        🗑️
      </button>
    </div>
  </div>
</template>
```

---

# Exercice 1 - Solution TaskItem Styles

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

.task-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.task-edit,
.task-delete {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.task-edit:hover,
.task-delete:hover {
  opacity: 1;
}
</style>
```

---

# Exercice 2 : TaskList.vue

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

# Exercice 2 - Solution TaskList.vue (1/3)

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

# Exercice 2 - Solution TaskList.vue (2/3)

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

# Exercice 2 - Solution TaskList.vue (3/4)

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

# Exercice 2 - Solution TaskList.vue (4/4)

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

# Exercice 3 : TaskForm.vue

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

# Exercice 3 - Solution TaskForm.vue

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
  watch: {
    editTask: {
      handler(newTask) {
        if (newTask) {
          this.formData = { ...newTask };
        } else {
          this.resetForm();
        }
      },
      immediate: true
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
  }
}
</script>
```

---

# 💡 Pourquoi le watch ?

### Le problème sans watch

Sans le `watch`, si vous éditez une tâche puis annulez, **les inputs gardent les anciennes valeurs** quand vous créez une nouvelle tâche.

### La solution avec watch

Le `watch` avec `immediate: true` :
- ✅ Charge les données au montage (si `editTask` existe)
- ✅ Réagit quand `editTask` change
- ✅ **Réinitialise quand `editTask` devient `null`** ← FIX du bug !

**C'est une bonne pratique pour les formulaires d'édition !**

---

# Exercice 3 - Solution TaskForm Template

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

# Exercice 4 : Recherche avec Watch

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

# Exercice 4 - Solution Recherche (1/2)

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

# Exercice 4 - Solution Recherche (2/2)

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

# Exercice 5 : Intégration dans App.vue

### Objectif

Assembler tous les composants créés dans les exercices précédents pour créer l'application TaskFlow complète et fonctionnelle.

### Spécifications

**Data dans App.vue** :
- `tasks` : Array de tâches (avec id, title, description, priority, done)
- `showForm` : Boolean pour afficher/masquer le formulaire
- `editingTask` : Tâche en cours d'édition (ou null)

**Methods** :
- `addTask(taskData)` : Ajouter une nouvelle tâche
- `toggleTask(id)` : Basculer le statut done d'une tâche
- `deleteTask(id)` : Supprimer une tâche
- `editTask(task)` : Préparer l'édition d'une tâche
- `updateTask(taskData)` : Mettre à jour une tâche existante

### Concepts couverts

✅ **Intégration complète** : Tous les concepts du Module 1 réunis

---

# Exercice 5 - Solution App.vue (1/3)

**Script - Data et imports :**

```vue
<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';

export default {
  name: 'App',
  components: {
    TaskForm,
    TaskList
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: 'Apprendre Vue.js 3',
          description: 'Maîtriser les bases fondamentales',
          priority: 'high',
          done: false
        },
        {
          id: 2,
          title: 'Créer TaskFlow',
          description: 'Application complète de gestion de tâches',
          priority: 'urgent',
          done: false
        },
        {
          id: 3,
          title: 'Setup du projet',
          description: 'Installer Vite et créer la structure',
          priority: 'medium',
          done: true
        }
      ],
      showForm: false,
      editingTask: null
    }
  }
}
</script>
```

---

# Exercice 5 - Solution App.vue (2/3)

**Methods :**

```vue
<script>
export default {
  // ... data précédent
  methods: {
    addTask(taskData) {
      this.tasks.push({
        id: Date.now(),
        ...taskData,
        done: false
      });
      this.showForm = false;
    },
    
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.done = !task.done;
      }
    },
    
    deleteTask(id) {
      if (confirm('Supprimer cette tâche ?')) {
        this.tasks = this.tasks.filter(t => t.id !== id);
      }
    },
    
    editTask(task) {
      this.editingTask = { ...task };
      this.showForm = true;
    },
    
    updateTask(taskData) {
      const index = this.tasks.findIndex(t => t.id === this.editingTask.id);
      if (index !== -1) {
        this.tasks[index] = {
          ...this.editingTask,
          ...taskData
        };
      }
      this.editingTask = null;
      this.showForm = false;
    },
    
    cancelForm() {
      this.showForm = false;
      this.editingTask = null;
    }
  }
}
</script>
```

---

# Exercice 5 - Solution App.vue (3/3)

**Template :**

```vue
<template>
  <div id="app">
    <header>
      <h1>🎯 TaskFlow</h1>
      <p>Votre gestionnaire de tâches moderne</p>
    </header>
    
    <main>
      <div class="actions-bar">
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
        @submit="editingTask ? updateTask($event) : addTask($event)"
        @cancel="cancelForm"
      />
      
      <TaskList
        :tasks="tasks"
        @toggle="toggleTask"
        @delete="deleteTask"
        @edit="editTask"
      />
    </main>
  </div>
</template>
```

---

# Exercice 5 - Styles App.vue

```vue
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem;
}

#app {
  max-width: 900px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 2rem;
  color: white;
}

header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

main {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.actions-bar {
  margin-bottom: 2rem;
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
```

---

# Exercice 5 - Améliorations optionnelles

### Fonctionnalités bonus à ajouter

**1. Persistance localStorage** :
```javascript
mounted() {
  const saved = localStorage.getItem('taskflow-tasks');
  if (saved) {
    this.tasks = JSON.parse(saved);
  }
},
watch: {
  tasks: {
    handler(newTasks) {
      localStorage.setItem('taskflow-tasks', JSON.stringify(newTasks));
    },
    deep: true
  }
}
```

**2. Bouton "Tout effacer"** :
```javascript
clearAll() {
  if (confirm('Supprimer toutes les tâches ?')) {
    this.tasks = [];
  }
}
```

**3. Export/Import JSON** :
- Bouton pour télécharger les tâches en JSON
- Bouton pour importer un fichier JSON

---

# Exercice 5 - Test de l'application

### Checklist de validation

Testez toutes les fonctionnalités :

- ✅ Afficher la liste des tâches initiales
- ✅ Ouvrir le formulaire avec le bouton "Nouvelle tâche"
- ✅ Ajouter une nouvelle tâche
- ✅ Cocher/décocher une tâche (toggle done)
- ✅ Supprimer une tâche
- ✅ Filtrer les tâches (toutes/actives/terminées)
- ✅ Rechercher une tâche
- ✅ Voir les statistiques (compteurs)
- ✅ Éditer une tâche existante
- ✅ Annuler l'ajout/édition

### 🎉 Félicitations !

Vous avez créé une application Vue.js complète avec tous les concepts du Module 1 !

---

# 🎯 Récap Module 1 - TaskFlow

### Ce que vous avez construit

✅ **TaskItem.vue** : Composant de tâche avec props/events  
✅ **TaskList.vue** : Gestion de liste avec filtres et recherche  
✅ **TaskForm.vue** : Formulaire avec v-model et validation  
✅ **App.vue** : Intégration complète de tous les composants  

### Concepts du Module 1 utilisés

- ✅ **1.1 JavaScript ES6+** : Arrow functions, destructuring, spread operator
- ✅ **1.2 Architecture** : MVVM, organisation composants
- ✅ **1.3 Outils** : Vite, npm, structure projet
- ✅ **1.4 Composants** : .vue, data(), methods, structure
- ✅ **1.5 Directives** : v-bind, v-on, v-if, v-for, v-model
- ✅ **1.6 Communication** : Props (validation), Events ($emit)
- ✅ **1.7 Réactivité** : Computed properties, Watch (debounce)
- ✅ **1.8 Lifecycle** : mounted pour initialisation

### 🚀 Prochaine étape : Module 2

On va rendre nos composants **ultra-réutilisables** avec les **slots** !

- TaskCard avec slots (header, content, actions)
- Modal réutilisable
- BoardColumn flexible

---
layout: new-section
---

# Concepts du Module 1 - Couverture complète

Vérification que tous les concepts théoriques ont été mis en pratique

---

# Couverture des concepts - 1.1 à 1.4

### ✅ 1.1 JavaScript ES6+ (Rappels)

- **Arrow functions** : Utilisées dans methods, computed, watch
- **Destructuring** : Props, événements ($event)
- **Spread operator** : `{ ...task }`, `{ ...taskData }`
- **Modules ES6** : import/export des composants
- **Template literals** : Interpolation dans les templates

### ✅ 1.2 Architecture Vue.js

- **Pattern MVVM** : Séparation Model/View/ViewModel dans chaque composant
- **Organisation** : Structure components/, réutilisabilité
- **Single File Components** : .vue avec script/template/style

### ✅ 1.3 Outils et environnement

- **Node.js & npm** : Installation, gestion dépendances
- **Vite** : Création projet, dev server, hot reload
- **Structure projet** : src/, components/, main.js, App.vue

### ✅ 1.4 Votre premier composant Vue

- **Structure .vue** : script, template, style
- **data()** : État local réactif
- **methods** : Logique métier
- **Composants utilisés** : TaskItem, TaskList, TaskForm

---

# Couverture des concepts - 1.5 Directives

### ✅ 1.5 Directives et data binding

**Interpolation {{ }}** :
- TaskItem : `{{ task.title }}`, `{{ task.description }}`
- TaskList : `{{ activeCount }}`, `{{ doneCount }}`

**v-bind (:**) :
- Attributs : `:src`, `:alt`, `:class`, `:style`
- Props : `:task="task"`, `:tasks="tasks"`
- Classes dynamiques : `:class="{ done: task.done }"`
- Styles dynamiques : `:style="{ backgroundColor: priorityColor }"`

**v-on (@)** :
- Events : `@click`, `@change`, `@submit`
- Modificateurs : `@submit.prevent`, `@click.stop`
- Custom events : `@toggle`, `@delete`, `@edit`

**v-if / v-else** :
- Affichage conditionnel : TaskForm selon `showForm`
- Empty states : "Aucune tâche" si liste vide

**v-for** :
- Listes : `v-for="task in tasks"` avec `:key="task.id"`
- Rendu optimisé avec key unique

**v-model** :
- Input text : `v-model="formData.title"`
- Textarea : `v-model="formData.description"`
- Select : `v-model="formData.priority"`
- Checkbox : `v-model="task.done"`
- Search : `v-model="searchQuery"`

---

# Couverture des concepts - 1.6 Communication

### ✅ 1.6 Communication entre composants

**Props (Parent → Enfant)** :
- **Validation complète** : type, required, default, validator
- TaskItem : `task` (Object, required avec validator)
- TaskForm : `editTask` (Object, optional)
- TaskList : `tasks` (Array)

**Events (Enfant → Parent)** :
- **$emit** : `this.$emit('toggle', task.id)`
- **Déclaration** : `emits: ['toggle', 'delete']`
- **Validation** : Validation des types d'événements
- **Événements utilisés** : toggle, delete, edit, submit, cancel

**Gestion de listes** :
- v-for avec composants : `<TaskItem v-for="..." />`
- Propagation d'events : `@toggle="$emit('toggle', $event)"`

**Affichage conditionnel** :
- `v-if="showForm"` pour TaskForm
- `v-if="filteredTasks.length === 0"` pour empty state

---

# Couverture des concepts - 1.7 Réactivité

### ✅ 1.7 Réactivité avancée

**Computed properties** :
- **TaskItem** : `priorityColor()`, `priorityLabel()`
- **TaskList** : `filteredTasks()`, `activeCount()`, `doneCount()`, `displayedTasks()`
- **Mise en cache** : Recalculé uniquement si dépendances changent
- **Performance** : Évite recalculs inutiles

**Watch (Observateurs)** :
- **Watch simple** : `searchQuery` avec debounce de 300ms
- **Debounce pattern** : clearTimeout + setTimeout
- **Use case** : Recherche en temps réel sans surcharge

**Différence Computed vs Methods** :
- Computed : Valeurs dérivées avec cache (filtres, compteurs)
- Methods : Actions/opérations (addTask, deleteTask)

**Mixins** :
- Concept vu en théorie (réutilisation logique Options API)
- Pas utilisé dans TaskFlow Module 1 (concepts avancés)

---

# Couverture des concepts - 1.8 Lifecycle

### ✅ 1.8 Cycle de vie des composants

**mounted()** :
- **TaskForm** : Charger `editTask` si mode édition
- **App.vue** : Charger depuis localStorage (bonus)
- **Use case** : Initialisation, fetch data

**Lifecycle complet** :
- **beforeCreate** → **created** → **beforeMount** → **mounted**
- **beforeUpdate** → **updated** (quand réactivité change)
- **beforeUnmount** → **unmounted** (cleanup)

**Cleanup (unmounted)** :
- Concept vu en théorie
- Use case : clearInterval, removeEventListener
- Pas nécessaire dans TaskFlow Module 1

**Pattern utilisé** :
```javascript
mounted() {
  if (this.editTask) {
    this.formData = { ...this.editTask };
  }
}
```

---

# Checklist de validation finale

### Avant de passer au Module 2, vérifiez que vous maîtrisez :

**Fondamentaux** :
- ✅ Installation et configuration environnement (Node.js, npm, Vite)
- ✅ Syntaxe JavaScript ES6+ (arrow functions, destructuring, spread, modules)
- ✅ Création projet Vue avec Vite
- ✅ Structure .vue (script, template, style)

**Composants** :
- ✅ Création de composants réutilisables
- ✅ data(), methods, computed
- ✅ Props avec validation (type, required, default, validator)
- ✅ Events personnalisés ($emit, emits declaration)

**Directives** :
- ✅ Interpolation {{ }}
- ✅ v-bind (: shorthand) - classes, styles, props
- ✅ v-on (@ shorthand) - events, modificateurs
- ✅ v-if / v-else / v-show
- ✅ v-for avec :key
- ✅ v-model (input, textarea, select, checkbox)

**Réactivité** :
- ✅ Computed properties et mise en cache
- ✅ Watch avec options (debounce pattern)
- ✅ Différence computed vs methods

**Lifecycle** :
- ✅ mounted() pour initialisation
- ✅ Comprendre le cycle complet
- ✅ Cleanup (concept, même si pas utilisé)

---

# Ressources complémentaires

### Documentation officielle

- 📚 [Vue.js 3 Documentation](https://vuejs.org/) - Doc complète et tutoriels
- 🔧 [Vite Guide](https://vitejs.dev/) - Build tool rapide
- 📦 [npm Documentation](https://docs.npmjs.com/) - Gestionnaire de paquets

### Tutoriels vidéo

- 🎥 [Vue Mastery](https://www.vuemastery.com/) - Cours premium Vue.js
- 🎓 [Vue School](https://vueschool.io/) - Formations certifiantes
- 📺 Chaînes YouTube Vue.js (Net Ninja, Traversy Media)

### Outils de développement

- 🛠️ [Vue DevTools](https://devtools.vuejs.org/) - Extension navigateur indispensable
- 💻 [VS Code + Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - IDE support
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first

### Communauté

- 💬 [Discord Vue Land](https://chat.vuejs.org/) - Communauté active
- 🐦 [@vuejs](https://twitter.com/vuejs) - Actualités officielles
- 📰 [Vue.js News](https://news.vuejs.org/) - Newsletter hebdomadaire

---

# Félicitations ! 🎉

### Vous avez terminé le Module 1 !

Vous maîtrisez maintenant :
- ✅ Les bases fondamentales de Vue.js 3
- ✅ La création de composants réutilisables
- ✅ La communication parent-enfant
- ✅ La réactivité avec computed et watch
- ✅ Le cycle de vie des composants

### Votre première application

**TaskFlow** - Une application complète de gestion de tâches avec :
- 5 composants fonctionnels (App, TaskList, TaskItem, TaskForm)
- Props et events bien structurés
- Filtres, recherche, statistiques
- Interface moderne et réactive

### 🚀 Prochaine étape : Module 2 - Slots

Rendez-vous au Module 2 pour découvrir comment créer des composants encore plus flexibles et réutilisables avec les **slots** !

**Au programme** :
- Slots simples et nommés
- Scoped slots
- Composants génériques ultra-réutilisables
- TaskCard avec slots personnalisables
