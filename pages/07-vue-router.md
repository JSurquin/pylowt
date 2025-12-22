---
layout: new-section
routeAlias: 'vue-router'
---

# Module 7 : Vue Router 4 🛤️

Navigation et routage pour tes applications Vue.js !

---

# Qu'est-ce que Vue Router ? 🤔

**Vue Router** est le routeur officiel de Vue.js.


- 🛤️ Associe des URLs à des composants
- 📱 Crée des SPAs (Single Page Applications)
- 🔗 Navigation sans rechargement de page
- 📊 Gère l'historique du navigateur


---

# L'analogie du GPS 🗺️

Imagine Vue Router comme un GPS :


- **Les routes** = Les adresses possibles
- **Les composants** = Les destinations
- **La navigation** = Le voyage d'un point A à B
- **Les params** = Les détails de l'adresse (numéro, étage)


---

# L'analogie du GPS - Suite 🗺️

Tu peux aller n'importe où sans redemander la carte complète (pas de rechargement) !

---

# Flow de navigation 🔄

```mermaid {theme: 'base', themeVariables: {primaryColor: '#42b883', primaryTextColor: '#fff', lineColor: '#35495e'}}
flowchart LR
    A["🔗 URL Change"] --> B["beforeEach Guard"]
    B --> C{"Auth OK?"}
    C -->|"Oui"| D["beforeEnter"]
    C -->|"Non"| E["Redirect /login"]
    D --> F["🎯 Load Component"]
    F --> G["afterEach"]
    G --> H["🖥️ Render View"]
    
    style A fill:#3498db,stroke:#35495e
    style H fill:#42b883,stroke:#35495e
    style E fill:#e74c3c,stroke:#35495e
```

---

# Installation 📦

```bash
# Vue Router est inclus si tu as choisi "Yes" à la création
npm create vue@latest

# Sinon, installation manuelle :
npm install vue-router@4
```

---

# Configuration de base 🔧

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
```

---

# Montage dans l'app 🔧

```ts
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
```

---

# RouterView et RouterLink 🔗

```js
<!-- App.vue -->
<template>
  <nav>
    <RouterLink to="/">Accueil</RouterLink>
    <RouterLink to="/about">À propos</RouterLink>
  </nav>
  
  <!-- Ici s'affiche le composant de la route active -->
  <RouterView />
</template>
```

---

# RouterLink : Navigation déclarative 🔗

```js
<template>
  <!-- String path -->
  <RouterLink to="/about">About</RouterLink>
  
  <!-- Objet avec name -->
  <RouterLink :to="{ name: 'about' }">About</RouterLink>
  
  <!-- Avec paramètres -->
  <RouterLink :to="{ name: 'user', params: { id: 42 } }">
    User 42
  </RouterLink>
  
  <!-- Avec query string -->
  <RouterLink :to="{ path: '/search', query: { q: 'vue' } }">
    Rechercher
  </RouterLink>
</template>
```

---

# Classe active automatique 🎨

RouterLink ajoute automatiquement des classes :

```js
<template>
  <!-- Ajoute .router-link-active quand actif -->
  <RouterLink to="/about">About</RouterLink>
  
  <!-- Personnaliser les classes -->
  <RouterLink 
    to="/about" 
    active-class="is-active"
    exact-active-class="is-exact"
  >
    About
  </RouterLink>
</template>
```

---

# Classe active - CSS 🎨

```css
.router-link-active {
  color: #42b883;
  font-weight: bold;
}

.router-link-exact-active {
  border-bottom: 2px solid #42b883;
}
```

---

# Routes dynamiques 🔀

Paramètres dans l'URL :

```ts
// router/index.ts
const routes = [
  {
    path: '/user/:id',
    name: 'user',
    component: UserView
  },
  {
    path: '/blog/:year/:month/:slug',
    name: 'blog-post',
    component: BlogPost
  }
]
```

---

# Accéder aux paramètres 📍

```js
<!-- UserView.vue -->
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// Accéder aux paramètres
console.log(route.params.id) // "42" (string !)
</script>

<template>
  <h1>Profil de l'utilisateur {{ route.params.id }}</h1>
</template>
```

---

# Paramètres en props (recommandé) ✨

```ts
// router/index.ts
const routes = [
  {
    path: '/user/:id',
    name: 'user',
    component: UserView,
    props: true  // Passe les params comme props
  }
]
```

---

# Paramètres en props - Composant ✨

```js
<!-- UserView.vue -->
<script setup>
const props = defineProps<{
  id: string
}>()
</script>

<template>
  <h1>Profil de l'utilisateur {{ id }}</h1>
</template>
```

---

# Paramètres en props - Avantages ✨


- ✅ Composant découplé du router
- ✅ Plus facile à tester
- ✅ Réutilisable sans router


---

# Navigation programmatique 🎮

```js
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToUser(id: number) {
  // Avec path
  router.push(`/user/${id}`)
  
  // Avec name et params
  router.push({ name: 'user', params: { id } })
  
  // Avec query
  router.push({ path: '/search', query: { q: 'vue' } })
}

function goBack() {
  router.back()  // Équivalent à router.go(-1)
}

function replaceRoute() {
  router.replace('/new-page')  // Pas d'entrée historique
}
</script>
```

---

# Routes imbriquées (Nested Routes) 📦

```ts
const routes = [
  {
    path: '/user/:id',
    component: UserLayout,
    children: [
      {
        path: '',  // /user/:id
        name: 'user-profile',
        component: UserProfile
      },
      {
        path: 'posts',  // /user/:id/posts
        name: 'user-posts',
        component: UserPosts
      },
      {
        path: 'settings',  // /user/:id/settings
        name: 'user-settings',
        component: UserSettings
      }
    ]
  }
]
```

---

# Routes imbriquées - Layout 📦

```js
<!-- UserLayout.vue -->
<template>
  <div class="user-layout">
    <nav class="sidebar">
      <RouterLink :to="{ name: 'user-profile' }">Profil</RouterLink>
      <RouterLink :to="{ name: 'user-posts' }">Posts</RouterLink>
      <RouterLink :to="{ name: 'user-settings' }">Settings</RouterLink>
    </nav>
    
    <main>
      <!-- Composant enfant s'affiche ici -->
      <RouterView />
    </main>
  </div>
</template>
```

---

# Route 404 (Not Found) 🚫

```ts
const routes = [
  // ... autres routes ...
  
  // Route catch-all - doit être en dernier !
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]
```

---

# Route 404 - Composant 🚫

```js
<!-- NotFound.vue -->
<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page non trouvée</p>
    <RouterLink to="/">Retour à l'accueil</RouterLink>
  </div>
</template>
```

---

# Lazy Loading (Chargement différé) ⚡

```ts
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView  // Chargé immédiatement
  },
  {
    path: '/about',
    name: 'about',
    // Chargé uniquement quand on visite /about
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // Avec commentaire webpack/vite pour le chunking
    component: () => import(
      /* webpackChunkName: "dashboard" */
      '@/views/DashboardView.vue'
    )
  }
]
```

---

# Navigation Guards 🛡️

Protéger les routes avec des "gardiens" :


- **beforeEach** - Avant chaque navigation
- **beforeResolve** - Après les guards des composants
- **afterEach** - Après la navigation
- **beforeEnter** - Sur une route spécifique


---

# Guard global : beforeEach 🔒

```ts
// router/index.ts
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Rediriger vers login
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()  // Continuer
  }
})
```

---

# Guard global - Nouvelle syntaxe 🔒

```ts
// Vue Router 4 - Sans next()
router.beforeEach((to, from) => {
  const isAuthenticated = !!localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  // return true ou undefined pour continuer
})
```

---

# Meta données des routes 📋

```ts
const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title: 'Tableau de bord',
      roles: ['admin', 'user']
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      roles: ['admin']
    }
  }
]
```

---

# Utiliser les meta données 📋

```ts
router.beforeEach((to) => {
  // Mettre à jour le titre
  document.title = to.meta.title || 'Mon App'
  
  // Vérifier les rôles
  const userRole = getCurrentUserRole()
  
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    return { name: 'forbidden' }
  }
})
```

---

# Guard sur une route spécifique 🎯

```ts
const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: (to, from) => {
      if (!isAdmin()) {
        return { name: 'forbidden' }
      }
    }
  }
]
```

---

# Guard dans un composant 📦

```js
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

// Avant de quitter ce composant
onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    const answer = window.confirm(
      'Vous avez des modifications non sauvegardées. Quitter ?'
    )
    if (!answer) return false
  }
})

// Quand les params changent (ex: /user/1 → /user/2)
onBeforeRouteUpdate((to, from) => {
  // Recharger les données pour le nouvel ID
  loadUser(to.params.id)
})
</script>
```

---

# Scroll Behavior 📜

Contrôler le défilement lors de la navigation :

```ts
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Retour arrière : restaurer la position
    if (savedPosition) {
      return savedPosition
    }
    
    // Ancre dans l'URL
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    
    // Par défaut : haut de page
    return { top: 0, behavior: 'smooth' }
  }
})
```

---

# useRoute vs useRouter 🤔

```js
<script setup>
import { useRoute, useRouter } from 'vue-router'

// useRoute : accéder aux infos de la route actuelle
const route = useRoute()
console.log(route.params, route.query, route.path)

// useRouter : naviguer
const router = useRouter()
router.push('/about')
</script>
```

---

# useRoute vs useRouter - Résumé 🤔

- `useRoute()` = Lire (où suis-je ?)
- `useRouter()` = Écrire (où aller ?)

---

# RouterView avec transitions 🎭

```js
<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
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

# Résumé du Module 7 📝


- ✅ **Vue Router 4** gère la navigation SPA
- ✅ **RouterLink** et **RouterView** pour l'affichage
- ✅ **Routes dynamiques** avec params (`:id`)
- ✅ **Navigation programmatique** avec `useRouter`
- ✅ **Guards** pour protéger les routes
- ✅ **Lazy loading** pour optimiser les performances


---
layout: intro
---

# Prêt pour le QCM ? 🎯

Vérifions que tu maîtrises Vue Router !

