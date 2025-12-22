---

# Exercices Pratiques - Module 7 🎯

Pratiquons Vue Router 4 !

---

# Exercice 1 : Configuration de base 🛤️

### Objectif : Créer une navigation simple

**Instructions :**

Configure Vue Router avec 3 pages :
- Home (`/`)
- About (`/about`)
- Contact (`/contact`)

---

# Solution Exercice 1 - Router ✅

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    }
  ]
})

export default router
```

---

# Solution Exercice 1 - App.vue ✅

```js
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/about">À propos</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
    </nav>
  </header>
  
  <main>
    <RouterView />
  </main>
</template>
```

---

# Solution Exercice 1 - Style ✅

```js
<style scoped>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f5f5f5;
}

nav a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

nav a.router-link-active {
  background: #42b883;
  color: white;
}
</style>
```

---

# Exercice 2 : Routes dynamiques 🔀

### Objectif : Créer une page de détail utilisateur

**Instructions :**

Crée une route `/user/:id` qui :
- Affiche l'ID de l'utilisateur
- Utilise les params comme props
- Affiche un message différent selon l'ID

---

# Solution Exercice 2 - Router ✅

```ts
// Ajouter dans routes
{
  path: '/user/:id',
  name: 'user',
  component: () => import('@/views/UserView.vue'),
  props: true  // Passe les params comme props
}
```

---

# Solution Exercice 2 - UserView ✅

```js
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
}>()

const userId = computed(() => parseInt(props.id))

const user = computed(() => ({
  1: { name: 'Alice', role: 'Admin' },
  2: { name: 'Bob', role: 'User' },
  3: { name: 'Charlie', role: 'Guest' }
}[userId.value] || { name: 'Inconnu', role: 'N/A' }))
</script>

<template>
  <div class="user-view">
    <h1>Profil Utilisateur #{{ id }}</h1>
    <p>Nom : {{ user.name }}</p>
    <p>Rôle : {{ user.role }}</p>
    <RouterLink to="/">← Retour</RouterLink>
  </div>
</template>
```

---

# Exercice 3 : Navigation programmatique 🎮

### Objectif : Naviguer avec du code

**Instructions :**

Crée un composant qui :
- A un champ input pour l'ID utilisateur
- Navigue vers `/user/:id` au clic d'un bouton
- A un bouton "Retour"

---

# Solution Exercice 3 ✅

```js
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userId = ref('')

function goToUser() {
  if (userId.value) {
    router.push({ name: 'user', params: { id: userId.value } })
  }
}

function goBack() {
  router.back()
}
</script>

<template>
  <div>
    <input v-model="userId" placeholder="ID utilisateur" />
    <button @click="goToUser">Voir profil</button>
    <button @click="goBack">Retour</button>
  </div>
</template>
```

---

# Exercice 4 : Routes imbriquées 📦

### Objectif : Créer un dashboard avec sous-pages

**Instructions :**

Crée une route `/dashboard` avec :
- `/dashboard` → Overview
- `/dashboard/stats` → Statistics
- `/dashboard/settings` → Settings

---

# Solution Exercice 4 - Router ✅

```ts
{
  path: '/dashboard',
  component: () => import('@/views/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'dashboard-overview',
      component: () => import('@/views/dashboard/Overview.vue')
    },
    {
      path: 'stats',
      name: 'dashboard-stats',
      component: () => import('@/views/dashboard/Stats.vue')
    },
    {
      path: 'settings',
      name: 'dashboard-settings',
      component: () => import('@/views/dashboard/Settings.vue')
    }
  ]
}
```

---

# Solution Exercice 4 - Layout ✅

```js
<!-- DashboardLayout.vue -->
<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <RouterLink :to="{ name: 'dashboard-overview' }">
          📊 Overview
        </RouterLink>
        <RouterLink :to="{ name: 'dashboard-stats' }">
          📈 Statistics
        </RouterLink>
        <RouterLink :to="{ name: 'dashboard-settings' }">
          ⚙️ Settings
        </RouterLink>
      </nav>
    </aside>
    
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>
```

---

# Solution Exercice 4 - Style ✅

```js
<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 1rem;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar a {
  color: #bdc3c7;
  padding: 0.5rem;
  border-radius: 4px;
}

.sidebar a.router-link-active {
  background: #42b883;
  color: white;
}

.content {
  flex: 1;
  padding: 2rem;
}
</style>
```

---

# Exercice 5 : Guard d'authentification 🔒

### Objectif : Protéger des routes

**Instructions :**

Crée un guard qui :
- Protège les routes avec `meta.requiresAuth`
- Redirige vers `/login` si non authentifié
- Stocke l'URL de redirection

---

# Solution Exercice 5 - Routes ✅

```ts
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]
```

---

# Solution Exercice 5 - Guard ✅

```ts
// Simule un état d'authentification
const isAuthenticated = () => !!localStorage.getItem('token')
const isAdmin = () => localStorage.getItem('role') === 'admin'

router.beforeEach((to) => {
  // Route requiert authentification
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }
  
  // Route requiert rôle admin
  if (to.meta.requiresAdmin && !isAdmin()) {
    return { name: 'dashboard' }
  }
})
```

---

# Solution Exercice 5 - LoginView ✅

```js
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function login() {
  // Simuler connexion
  localStorage.setItem('token', 'abc123')
  
  // Rediriger vers la page demandée ou dashboard
  const redirect = route.query.redirect as string || '/dashboard'
  router.push(redirect)
}
</script>

<template>
  <div class="login">
    <h1>Connexion</h1>
    <button @click="login">Se connecter</button>
  </div>
</template>
```

---

# Exercice Bonus : Transitions 🎭

### Objectif : Ajouter des animations entre routes

**Instructions :**

Ajoute une transition fade entre les pages avec :
- Animation de sortie puis entrée
- Durée de 300ms

---

# Solution Bonus ✅

```js
<!-- App.vue -->
<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

---

# Bravo ! 🎉

Tu as terminé les exercices du Module 7 !

Tu maîtrises maintenant :
- ✅ Configuration de Vue Router
- ✅ Routes dynamiques avec params
- ✅ Navigation programmatique
- ✅ Routes imbriquées
- ✅ Guards d'authentification

**Prochaine étape : Pinia - State Management ! 🍍**

