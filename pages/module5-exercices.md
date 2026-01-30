---
layout: new-section
routeAlias: 'module5-exercices'
---

<a name="module5-exercices" id="module5-exercices"></a>

# Exercices Pratiques
## Module 5 - Vue Router

---

# 🎯 Fil Rouge : TaskFlow
## Exercices Module 5

Maintenant que vous avez vu tous les concepts théoriques du Module 5, il est temps d'ajouter la navigation et le routing à TaskFlow !

### Rappel des concepts du Module 5

<div class="text-sm">

**5.1 Configuration** : createRouter, routes, history mode  
**5.2 Navigation** : RouterLink, RouterView, programmatic navigation  
**5.3 Routes dynamiques** : Paramètres, props  
**5.4 Guards** : beforeEach, beforeEnter, onBeforeRouteLeave  
**5.5 Meta fields** : requiresAuth, title

</div>

### Les 7 exercices progressifs

Nous allons créer un système de navigation complet pour TaskFlow.

---

# Exercice 1 : Configuration Router

### Objectif
Configurer Vue Router pour TaskFlow

### Routes à créer

```
/ (Home)
/tasks (Liste des tâches)
/task/:id (Détail d'une tâche)
/categories (Catégories)
/login (Connexion)
/dashboard (Protégé - Admin)
/404 (Not Found)
```

### Installation

```bash
npm install vue-router@4
```

---

# Exercice 1 - Solution router/index.js (1/2)

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: {
      title: 'TaskFlow - Accueil',
      requiresAuth: false
    }
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: () => import('../views/TaskListView.vue'),
    meta: {
      title: 'Mes Tâches',
      requiresAuth: true
    }
  },
  {
    path: '/task/:id',
    name: 'TaskDetail',
    component: () => import('../views/TaskDetailView.vue'),
    meta: {
      title: 'Détail de la tâche',
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/CategoriesView.vue'),
    meta: {
      title: 'Catégories',
      requiresAuth: true
    }
  }
];
```

---

# Exercice 1 - Solution router/index.js (2/2)

```js
// router/index.js (suite)
const routes = [
  // ... routes précédentes
  
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Connexion',
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: {
      title: 'Dashboard Admin',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: 'Page non trouvée'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

---

# Exercice 1 - main.js avec Router

```js
// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './styles/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');
```

---

# Exercice 1 - App.vue avec Navigation

```vue
<script>
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    authStore.checkAuth();
    
    return {
      authStore
    };
  }
}
</script>

<template>
  <div id="app">
    <nav class="main-nav">
      <div class="nav-brand">
        <RouterLink to="/">
          📋 TaskFlow
        </RouterLink>
      </div>
      
      <div class="nav-links">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/tasks">Mes Tâches</RouterLink>
        <RouterLink to="/categories">Catégories</RouterLink>
        
        <RouterLink 
          v-if="authStore.canCreateCategories"
          to="/dashboard"
        >
          Dashboard
        </RouterLink>
      </div>
      
      <div class="nav-user">
        <span v-if="authStore.isAuthenticated">
          👤 {{ authStore.userDisplayName }}
        </span>
        <RouterLink v-else to="/login">
          Connexion
        </RouterLink>
      </div>
    </nav>
    
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
```

---

# Exercice 2 : Guards de Navigation

### Objectif
Protéger les routes avec des guards

### Spécifications

**Guard global** :
- Vérifier l'authentification
- Rediriger vers `/login` si non authentifié
- Rediriger les admins uniquement vers `/dashboard`

**Guard dans composant** :
- `onBeforeRouteLeave` : Confirmer avant de quitter une page d'édition

---

# Exercice 2 - Solution Navigation Guards

```js
// router/index.js (avec guards)
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// ... définition des routes

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ✅ GUARD GLOBAL
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Changer le titre de la page
  document.title = to.meta.title || 'TaskFlow';
  
  // Vérifier si la route nécessite une authentification
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Rediriger vers login avec query pour revenir après
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    });
    return;
  }
  
  // Vérifier si la route nécessite les droits admin
  if (to.meta.requiresAdmin && !authStore.canCreateCategories) {
    alert('Accès réservé aux administrateurs');
    next({ name: 'Home' });
    return;
  }
  
  // Si déjà connecté et tente d'aller sur /login
  if (to.name === 'Login' && authStore.isAuthenticated) {
    next({ name: 'TaskList' });
    return;
  }
  
  next();
});

export default router;
```

---

# Exercice 2 - Solution onBeforeRouteLeave

```vue
<script>
import { onBeforeRouteLeave } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'TaskEditView',
  setup() {
    const hasUnsavedChanges = ref(false);
    
    // ✅ GUARD dans le composant
    onBeforeRouteLeave((to, from, next) => {
      if (hasUnsavedChanges.value) {
        const answer = window.confirm(
          'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?'
        );
        
        if (answer) {
          next();
        } else {
          next(false);
        }
      } else {
        next();
      }
    });
    
    return {
      hasUnsavedChanges
    };
  }
}
</script>

<template>
  <div>
    <h1>Éditer la tâche</h1>
    
    <form @input="hasUnsavedChanges = true">
      <!-- Formulaire -->
    </form>
  </div>
</template>
```

---

# Exercice 3 : TaskDetailView

### Objectif
Créer la vue de détail d'une tâche

### Spécifications

**Route** : `/task/:id`

**Fonctionnalités** :
- Charger la tâche depuis le store
- Afficher tous les détails
- Modifier en ligne
- Bouton supprimer
- Breadcrumb de navigation
- Bouton retour

---

# Exercice 3 - Solution TaskDetailView.vue (1/4)

```vue
<script>
import { useTasksStore } from '@/stores/tasks';
import { useCategoriesStore } from '@/stores/categories';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'TaskDetailView',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const tasksStore = useTasksStore();
    const categoriesStore = useCategoriesStore();
    
    // ✅ Récupérer l'ID depuis la route
    const taskId = parseInt(route.params.id);
    
    return {
      router,
      taskId,
      tasksStore,
      categoriesStore
    };
  },
  data() {
    return {
      isEditing: false,
      editForm: {}
    };
  },
  computed: {
    task() {
      return this.tasksStore.getTaskById(this.taskId);
    },
    category() {
      if (!this.task?.categoryId) return null;
      return this.categoriesStore.categoryById(this.task.categoryId);
    }
  },
  mounted() {
    // Si tâche inexistante, rediriger vers 404
    if (!this.task) {
      this.router.push({ name: 'NotFound' });
    }
  }
}
</script>
```

---

# Exercice 3 - Solution TaskDetailView.vue (2/4)

**Methods :**

```vue
<script>
export default {
  // ... setup et computed précédents
  
  methods: {
    startEdit() {
      this.editForm = { ...this.task };
      this.isEditing = true;
    },
    
    saveEdit() {
      this.tasksStore.updateTask(this.taskId, this.editForm);
      this.isEditing = false;
    },
    
    cancelEdit() {
      this.isEditing = false;
    },
    
    async deleteTask() {
      if (confirm('Supprimer cette tâche ?')) {
        this.tasksStore.deleteTask(this.taskId);
        this.router.push({ name: 'TaskList' });
      }
    },
    
    goBack() {
      this.router.back();
    }
  }
}
</script>
```

---

# Exercice 3 - Solution TaskDetailView.vue (3/4)

**Template - Header et Édition :**

```vue
<template>
  <div class="task-detail" v-if="task">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <RouterLink to="/">Accueil</RouterLink>
      <span>/</span>
      <RouterLink to="/tasks">Tâches</RouterLink>
      <span>/</span>
      <span>{{ task.title }}</span>
    </nav>
    
    <!-- En-tête -->
    <div class="task-header">
      <h1>{{ task.title }}</h1>
      
      <div class="task-actions">
        <button @click="startEdit" v-if="!isEditing">
          ✏️ Modifier
        </button>
        <button @click="deleteTask" class="btn-danger">
          🗑️ Supprimer
        </button>
        <button @click="goBack" class="btn-secondary">
          ← Retour
        </button>
      </div>
    </div>
    
    <!-- Mode édition -->
    <div v-if="isEditing" class="edit-mode">
      <div class="form-group">
        <label>Titre</label>
        <input v-model="editForm.title" />
      </div>
      
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="editForm.description"></textarea>
      </div>
      
      <div class="form-group">
        <label>Priorité</label>
        <select v-model="editForm.priority">
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
          <option value="urgent">URGENT</option>
        </select>
      </div>
      
      <div class="form-actions">
        <button @click="saveEdit" class="btn-primary">
          💾 Sauvegarder
        </button>
        <button @click="cancelEdit" class="btn-secondary">
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>
```

---

# Exercice 3 - Solution TaskDetailView.vue (4/4)

**Template - Mode Lecture :**

```vue
<template>
  <div class="task-detail" v-if="task">
    <!-- ... header et mode édition précédents -->
    
    <!-- Mode lecture -->
    <div v-else class="view-mode">
      <div class="task-meta">
        <div class="meta-item">
          <strong>Statut :</strong>
          <span :class="task.done ? 'status-done' : 'status-active'">
            {{ task.done ? '✅ Terminée' : '⏳ En cours' }}
          </span>
        </div>
        
        <div class="meta-item">
          <strong>Priorité :</strong>
          <span :class="`priority-${task.priority}`">
            {{ task.priority }}
          </span>
        </div>
        
        <div class="meta-item" v-if="category">
          <strong>Catégorie :</strong>
          <span :style="{ color: category.color }">
            {{ category.icon }} {{ category.name }}
          </span>
        </div>
        
        <div class="meta-item">
          <strong>Créée le :</strong>
          {{ new Date(task.createdAt).toLocaleDateString('fr-FR') }}
        </div>
        
        <div class="meta-item" v-if="task.completedAt">
          <strong>Terminée le :</strong>
          {{ new Date(task.completedAt).toLocaleDateString('fr-FR') }}
        </div>
      </div>
      
      <div class="task-content">
        <h2>Description</h2>
        <p>{{ task.description || 'Aucune description' }}</p>
      </div>
    </div>
  </div>
</template>
```

---

# Exercice 4 : LoginView avec Redirect

### Objectif
Gérer la connexion avec redirection après login

### Spécifications

**Route** : `/login`

**Fonctionnalités** :
- Formulaire de connexion
- Appeler `authStore.login()`
- Rediriger vers la page d'origine (`query.redirect`)
- Sinon rediriger vers `/tasks`

---

# Exercice 4 - Solution LoginView.vue (1/2)

**Script :**

```vue
<script>
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();
    
    return {
      router,
      route,
      authStore
    };
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null,
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      this.error = null;
      this.loading = true;
      
      try {
        await this.authStore.login(this.form.email, this.form.password);
        
        // ✅ Rediriger vers l'URL d'origine ou /tasks
        const redirect = this.route.query.redirect || '/tasks';
        this.router.push(redirect);
        
      } catch (err) {
        this.error = 'Email ou mot de passe incorrect';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
```

---

# Exercice 4 - Solution LoginView.vue (2/2)

**Template :**

```vue
<template>
  <div class="login-view">
    <div class="login-card">
      <h1>📋 TaskFlow</h1>
      <h2>Connexion</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="form.email"
            type="email"
            required
            placeholder="admin@taskflow.com"
          />
        </div>
        
        <div class="form-group">
          <label>Mot de passe</label>
          <input 
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
          />
        </div>
        
        <div v-if="error" class="error">
          {{ error }}
        </div>
        
        <button 
          type="submit"
          :disabled="loading"
          class="btn-primary"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
      
      <p class="demo-info">
        💡 Utilisez <code>admin@taskflow.com</code> pour tester les permissions admin
      </p>
    </div>
  </div>
</template>
```

---

# Exercice 5 : TaskListView.vue

### Objectif
Créer la vue principale qui affiche toutes les tâches

### Spécifications

**Imports** :
- `useTasksStore`, `useCategoriesStore`
- Composants : `TaskForm`, `TaskList`

**Fonctionnalités** :
- Afficher la liste des tâches
- Ajouter une tâche
- Toggle tâche terminée
- Supprimer une tâche
- Cliquer sur une tâche pour voir le détail

---

# Exercice 5 - Solution TaskListView.vue

```vue
<script>
import { useTasksStore } from '@/stores/tasks';
import { useCategoriesStore } from '@/stores/categories';
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';

export default {
  name: 'TaskListView',
  components: { TaskList, TaskForm },
  computed: {
    tasksStore() { return useTasksStore(); },
    categoriesStore() { return useCategoriesStore(); }
  },
  methods: {
    handleAddTask(taskData) {
      this.tasksStore.addTask(taskData);
    },
    handleToggleTask(id) {
      this.tasksStore.toggleTask(id);
    },
    handleDeleteTask(id) {
      this.tasksStore.deleteTask(id);
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
    <h1>Mes Tâches</h1>
    
    <TaskForm @add-task="handleAddTask" />
    
    <TaskList
      :tasks="tasksStore.filteredTasks"
      @toggle="handleToggleTask"
      @delete="handleDeleteTask"
      @task-click="goToTaskDetail"
    />
  </div>
</template>
```

---

# Exercice 6 : NotFoundView.vue

### Objectif
Créer une page 404 élégante

### Spécifications

- Grand titre "404"
- Message "Page non trouvée"
- Afficher l'URL demandée : `{{ $route.fullPath }}`
- Bouton "Retour à l'accueil" : `this.$router.push('/')`

---

# Exercice 6 - Solution NotFoundView.vue

```vue
<script>
export default {
  name: 'NotFoundView',
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page non trouvée</h2>
    <p>La page que vous recherchez n'existe pas.</p>
    
    <div class="url-info">
      URL demandée : <code>{{ $route.fullPath }}</code>
    </div>
    
    <button @click="goHome" class="btn-primary">
      Retour à l'accueil
    </button>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h1 {
  font-size: 8rem;
  font-weight: bold;
  color: #ef4444;
  margin: 0;
}

.not-found h2 {
  font-size: 2rem;
  color: #64748b;
  margin: 1rem 0;
}

.url-info {
  margin: 2rem 0;
  color: #64748b;
  font-size: 0.875rem;
}

code {
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
}
</style>
```

---

# Exercice 7 : HomePage.vue

### Objectif
Créer une page d'accueil attractive

### Spécifications

- Hero avec titre + description
- Boutons : `<RouterLink to="/tasks">` et `<RouterLink to="/login">`
- 3 feature cards (avec icônes emoji)

---

# Exercice 7 - Solution HomePage.vue (1/2)

**Script et Template Hero :**

```vue
<script>
export default {
  name: 'HomePage'
}
</script>

<template>
  <div class="home-page">
    <div class="hero">
      <h1>📋 Bienvenue sur TaskFlow</h1>
      <p class="hero-subtitle">
        Gérez vos tâches efficacement avec Vue.js 3
      </p>
      
      <div class="hero-actions">
        <RouterLink to="/tasks" class="btn-primary">
          Voir mes tâches
        </RouterLink>
        <RouterLink to="/login" class="btn-secondary">
          Se connecter
        </RouterLink>
      </div>
    </div>
  </div>
</template>
```

---

# Exercice 7 - Solution HomePage.vue (2/2)

**Template Features :**

```vue
<template>
  <div class="home-page">
    <!-- ... hero précédent -->
    
    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">✅</div>
        <h3>Gestion simple</h3>
        <p>Créez, modifiez et supprimez vos tâches facilement</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3>Priorisez</h3>
        <p>Définissez des priorités pour rester organisé</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🏷️</div>
        <h3>Catégorisez</h3>
        <p>Organisez vos tâches par catégories</p>
      </div>
    </div>
  </div>
</template>
```

**Styles** : Grid layout, hover effects, responsive

---

# 🎯 Récap Module 5 - TaskFlow

### Ce que vous avez construit

✅ **Router config** : 7 routes avec lazy loading  
✅ **Guards** : Protection auth + admin  
✅ **TaskDetailView** : Vue détaillée avec édition  
✅ **LoginView** : Connexion avec redirect  
✅ **TaskListView** : Liste avec navigation  
✅ **NotFoundView** : Page 404 élégante  
✅ **HomePage** : Page d'accueil attractive  

### Concepts du Module 5 utilisés

- ✅ **5.1 Configuration** : createRouter, routes, history mode
- ✅ **5.2 Navigation** : RouterLink, RouterView, programmatic
- ✅ **5.3 Routes dynamiques** : :id params, props: true
- ✅ **5.4 Guards** : beforeEach, onBeforeRouteLeave
- ✅ **5.5 Meta fields** : requiresAuth, title

### Détails techniques

- **createRouter** : createWebHistory() pour URL propres
- **Lazy loading** : import() pour chaque route
- **beforeEach** : Guard global pour auth + title
- **onBeforeRouteLeave** : Confirmation avant quitter
- **useRouter** : router.push(), router.back()
- **useRoute** : route.params, route.query
- **Meta fields** : requiresAuth, requiresAdmin
- **Query params** : redirect après login
- **Breadcrumb** : Navigation contextuelle

### 🚀 Prochaine étape : Module 6

On va **tester** TaskFlow avec **Vitest** !

- Tests unitaires des stores
- Tests des composants
- Tests des guards de navigation

---

# Ressources complémentaires

### Documentation officielle

- 📚 [Vue Router Documentation](https://router.vuejs.org/)
- 🎯 [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- 🚀 [Lazy Loading](https://router.vuejs.org/guide/advanced/lazy-loading.html)

### Concepts avancés

- 🔧 Nested Routes (routes imbriquées)
- ⚡ Scroll Behavior
- 🎭 Transitions de routes
- 🔗 Named Views

### Exemples

- 💡 [Vue Router Examples](https://github.com/vuejs/vue-router/tree/main/examples)
- 🎨 [Advanced Routing Patterns](https://router.vuejs.org/guide/advanced/)

---

# Félicitations ! 🎉

### Vous avez terminé le Module 5 !

Vous maîtrisez maintenant :
- ✅ Configuration complète de Vue Router
- ✅ Routes dynamiques avec paramètres
- ✅ Lazy loading des composants
- ✅ Navigation guards (global + composant)
- ✅ Navigation programmatique
- ✅ Meta fields pour la configuration
- ✅ Query params et redirections
- ✅ Gestion des erreurs 404

### Votre application TaskFlow

**Navigation complète** :
- 7 routes configurées
- Guards d'authentification
- Vues détaillées
- Page 404 personnalisée
- Login avec redirect

### 🚀 Prochaine étape : Module 6

Rendez-vous au Module 6 pour tester TaskFlow avec Vitest !
