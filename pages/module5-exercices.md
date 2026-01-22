---
layout: exercices
routeAlias: 'module5-exercices'
---

# Exercices Pratiques
## Module 5 - Vue Router

---

# Exercice 1 - Configuration de base

### Objectif
Installer et configurer Vue Router

### Tâches

1. Installer Vue Router 4
2. Créer le dossier `router/`
3. Configurer les routes de base (Home, About, Contact)
4. Intégrer dans `main.js`
5. Ajouter RouterView et RouterLink dans App.vue

---

# Exercice 2 - Routes dynamiques

### Objectif
Créer des pages de détails avec routes dynamiques

### Tâches

- Route `/product/:id` pour les produits
- Route `/user/:username` pour les profils
- Afficher les paramètres dans le composant
- Navigation avec boutons (router.push)

---

# Exercice 3 - Lazy Loading

### Objectif
Optimiser le chargement avec lazy loading

### Tâches

- Convertir toutes les routes en lazy loading
- Vérifier dans Network tab du navigateur
- Ajouter des groupes de chunks (webpackChunkName)

---

# Exercice 4 - Guards d'authentification

### Objectif
Protéger les routes avec des guards

### Tâches

- Guard global `beforeEach`
- Protéger `/admin` et `/profile`
- Rediriger vers `/login` si non authentifié
- Utiliser le store Auth de Pinia
- Guard dans le composant avec `onBeforeRouteLeave`

---

# Exercice 5 - Routes imbriquées

### Objectif
Créer un dashboard avec routes imbriquées

### Routes

- `/dashboard` (layout)
  - `/dashboard` (overview)
  - `/dashboard/stats` (statistiques)
  - `/dashboard/settings` (paramètres)
  - `/dashboard/users` (utilisateurs)

---

# Exercice 6 - Page 404

### Objectif
Gérer les routes inexistantes

### Tâches

- Créer un composant NotFound.vue
- Route catch-all pour 404
- Design personnalisé
- Bouton retour à l'accueil

---

# Projet Fil Rouge - Partie 5

### Ajouter le routing à l'application

**Structure des routes** :

```
/ - Accueil (liste produits)
/products - Liste produits
/product/:id - Détail produit
/cart - Panier
/auth/login - Connexion
/auth/register - Inscription
/dashboard - Dashboard admin (protégé)
  /dashboard/products - Gestion produits
  /dashboard/users - Gestion utilisateurs
  /dashboard/orders - Commandes
/profile - Profil utilisateur (protégé)
/404 - Page not found
```

---

# Exercice 3 - Checklist

**Checklist** :
- ✅ Configuration Vue Router
- ✅ Routes dynamiques
- ✅ Lazy loading
- ✅ Guards d'authentification
- ✅ Routes imbriquées pour le dashboard
- ✅ Page 404
- ✅ Navigation programmatique
- ✅ Meta fields pour les titres de page

---
layout: new-section
---

# 🎯 Fil Rouge : TaskFlow
## Exercices Module 5

---

# TaskFlow - Exercice 1 : Configuration Router

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

# TaskFlow - Solution router/index.js (1/2)

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

# TaskFlow - Solution router/index.js (2/2)

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

# TaskFlow - main.js avec Router

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

# TaskFlow - App.vue avec Navigation

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

# TaskFlow - Exercice 2 : Guards de Navigation

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

# TaskFlow - Solution Navigation Guards (1/2)

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

# TaskFlow - Solution onBeforeRouteLeave

```vue
<script>
import { onBeforeRouteLeave } from 'vue-router';

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

# TaskFlow - Exercice 3 : TaskDetailView

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

# TaskFlow - Solution TaskDetailView.vue (1/2)

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

# TaskFlow - Solution TaskDetailView.vue (2/3)

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

# TaskFlow - Solution TaskDetailView.vue (3/3)

**Template - Header :**

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
  </div>
</template>
```

---

# TaskFlow - TaskDetailView Template

```vue
<template>
  <div class="task-detail" v-if="task">
    <!-- ... header précédent -->
    
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
    
    <!-- Mode lecture (suite slide suivante) -->
  </div>
</template>
```

---

# TaskFlow - TaskDetailView Mode Lecture

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

# TaskFlow - Exercice 4 : LoginView avec Redirect

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

# TaskFlow - Solution LoginView.vue (1/2)

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

# TaskFlow - Solution LoginView.vue (2/2)

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

# 🎯 Récap Module 5 - TaskFlow

### Ce que vous avez construit

✅ **Router config** : 7 routes avec lazy loading  
✅ **Guards** : Protection auth + admin  
✅ **TaskDetailView** : Vue détaillée avec édition  
✅ **LoginView** : Connexion avec redirect  
✅ **Navigation** : RouterLink, programmatic, breadcrumb  

### Concepts utilisés

- ✅ createRouter avec history mode
- ✅ Routes dynamiques (:id)
- ✅ Lazy loading (import())
- ✅ beforeEach (guard global)
- ✅ onBeforeRouteLeave (guard composant)
- ✅ useRouter, useRoute
- ✅ Meta fields
- ✅ Query params (redirect)
- ✅ router.push, router.back

### 🚀 Next : Module 6

On va **tester** TaskFlow avec **Vitest** !

- Tests unitaires des stores
- Tests des composants
- Tests des guards de navigation
