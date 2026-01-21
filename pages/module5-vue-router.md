---
layout: new-section
routeAlias: 'module5-router'
---

# Module 5
## Navigation et routage avec Vue Router

---

# 🎉 Déjà le Module 5 !

### 📊 Votre progression

```
    ╔════════════════════════╗
    ║ ████████████████████░░ ║  80% complété
    ╚════════════════════════╝
```

### 🌟 Vous êtes presque au sommet !

À ce stade, vous savez :
✅ Créer des composants Vue.js réactifs
✅ Les rendre réutilisables avec les slots
✅ Maîtriser les techniques avancées
✅ Gérer l'état global avec Pinia

**Vous êtes déjà meilleurs que 70% des développeurs frontend !** 💪

### 🗺️ Module 5 : On crée une vraie application

Jusqu'ici, on a travaillé sur **une seule page**.
Maintenant, on va créer une **vraie application multi-pages** avec Vue Router !

### 🎯 Ce que vous allez construire

Une application avec :
- Page d'accueil
- Liste de produits
- Détail produit (route dynamique !)
- Page admin (protégée par authentification)
- Page 404

**En gros : une vraie app professionnelle !** 🚀

### 💡 Fun fact

Les applications modernes sont appelées **SPA** (Single Page Application), mais elles donnent l'illusion d'avoir plusieurs pages !

---

# Qu'est-ce que Vue Router ?

**Vue Router** est le routeur officiel pour les applications Vue.js

### 🗺️ Analogie : Vue Router est comme un GPS

Imaginez votre application comme une ville :
- **Les routes** = les rues de la ville 🏘️
- **Le Router** = votre GPS 📱
- **Les composants** = les destinations (maison, bureau, magasin...)

Quand vous tapez une adresse (URL), le GPS (Router) vous emmène à la bonne destination (composant) !

### 🆚 Sans Router : SPA = Single Page (vraiment UNE page)

**Application traditionnelle multi-pages** :
```
/index.html      ← Page 1 (rechargement complet ⏳)
/about.html      ← Page 2 (rechargement complet ⏳)
/contact.html    ← Page 3 (rechargement complet ⏳)
```

**SPA avec Router** :
```
/                ← Home Component (instantané ⚡)
/about           ← About Component (instantané ⚡)
/contact         ← Contact Component (instantané ⚡)
```
Une seule page HTML, mais l'illusion de plusieurs pages !

### Fonctionnalités

- 🛤️ **Navigation entre "pages"** : sans rechargement complet !
- 📍 **Gestion de l'URL** : /products/123 au lieu de ?page=products&id=123
- 🔙 **Historique** : boutons retour/avant fonctionnent
- 🔐 **Guards** : "Tu ne passeras pas !" sans authentification
- ⚡ **Lazy loading** : charger les pages à la demande
- 🎯 **Routes dynamiques** : /user/:id pour tous les utilisateurs

---

# Installation

```bash
npm install vue-router@4
```

---

# Configuration de base

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

---

# Intégration dans main.js

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.mount('#app');
```

---

# RouterView et RouterLink

```vue
<!-- App.vue -->
<template>
  <div>
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/about">À propos</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
    </nav>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>
```

---

# Routes dynamiques

```javascript
const routes = [
  {
    path: '/user/:id',
    name: 'user',
    component: UserProfile
  },
  {
    path: '/product/:slug',
    name: 'product',
    component: ProductDetail
  }
];
```

---

# Accéder aux paramètres de route

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

// Accéder aux paramètres
const userId = route.params.id;

// Accéder aux query params
const tab = route.query.tab;
</script>

<template>
  <div>
    <h1>User ID: {{ route.params.id }}</h1>
    <p>Tab: {{ route.query.tab }}</p>
  </div>
</template>
```

---

# Navigation programmatique

```vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToUser = (id) => {
  router.push(`/user/${id}`);
};

const goBack = () => {
  router.back();
};

const goToAbout = () => {
  router.push({ name: 'about' });
};

const goToProduct = () => {
  router.push({
    name: 'product',
    params: { slug: 'laptop' },
    query: { color: 'black' }
  });
};
</script>
```

---

# Lazy Loading des routes

```javascript
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue')
  }
];
```

---

# Routes imbriquées (Nested Routes)

```javascript
const routes = [
  {
    path: '/user/:id',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'user-profile',
        component: UserProfile
      },
      {
        path: 'posts',
        name: 'user-posts',
        component: UserPosts
      },
      {
        path: 'settings',
        name: 'user-settings',
        component: UserSettings
      }
    ]
  }
];
```

---

# Component avec routes imbriquées

```vue
<!-- UserLayout.vue -->
<template>
  <div class="user-layout">
    <aside>
      <RouterLink :to="`/user/${userId}`">Profil</RouterLink>
      <RouterLink :to="`/user/${userId}/posts`">Posts</RouterLink>
      <RouterLink :to="`/user/${userId}/settings`">Paramètres</RouterLink>
    </aside>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>
```

---

# Named Views

Plusieurs RouterView dans la même route

```javascript
const routes = [
  {
    path: '/',
    components: {
      default: Home,
      sidebar: Sidebar,
      footer: Footer
    }
  }
];
```

---

# Utilisation des Named Views

```vue
<template>
  <div>
    <RouterView name="sidebar" />
    <RouterView />
    <RouterView name="footer" />
  </div>
</template>
```

---

# Guards de navigation - beforeEach

### 🚦 Les Guards sont comme des feux de circulation

Imaginez un **videur de boîte de nuit** :
- Il vérifie votre carte d'identité 🪪
- Si vous avez l'âge requis → **next()** (vous entrez ✅)
- Sinon → **next('/home')** (vous dégagez ❌)

### 🛡️ Types de guards

**beforeEach** : Garde global (vérifie TOUT le monde)
**beforeEnter** : Garde spécifique (juste pour une route)
**beforeRouteEnter** : Garde dans le composant

### 💡 Cas d'usage typiques

- 🔐 **Authentification** : "Es-tu connecté ?"
- 👮 **Autorisation** : "As-tu le droit d'être admin ?"
- 💾 **Sauvegarde** : "As-tu sauvegardé tes modifications ?"
- 📊 **Analytics** : Tracker les visites de pages

```javascript
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuth();
  
  // Si la route nécessite l'auth ET que l'user n'est pas connecté
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // ❌ Redirection vers login
  } else {
    next(); // ✅ Passe ton chemin, tu es bon !
  }
});
```

### 🆚 En React Router v6 : loaders et actions (concept similaire)

---

# Guards par route

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from) => {
      if (!isAdmin()) {
        return false;
      }
    }
  }
];
```

---

# Guards dans le composant

```vue
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
    'Voulez-vous vraiment quitter ? Les modifications non sauvegardées seront perdues.'
  );
  
  if (!answer) return false;
});

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    await fetchUser(to.params.id);
  }
});
</script>
```

---

# Redirections

```javascript
const routes = [
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/old-path',
    redirect: { name: 'new-route' }
  },
  {
    path: '/search/:searchText',
    redirect: to => {
      return { path: '/search', query: { q: to.params.searchText } };
    }
  }
];
```

---

# Route 404

```javascript
const routes = [
  // ... autres routes
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
];
```

---

# Meta fields

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Administration'
    }
  }
];

router.beforeEach((to) => {
  document.title = to.meta.title || 'Mon App';
});
```

---

# Mode history vs hash

```javascript
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

// Mode History (recommandé)
// URL: https://example.com/user/123
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Mode Hash
// URL: https://example.com/#/user/123
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
```

---

# Transitions entre routes

```vue
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
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

---

# Scroll Behavior

```javascript
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash };
    }
    return { top: 0 };
  }
});
```

---

# Résumé Module 5

✅ Installation et configuration Vue Router

✅ Routes basiques et dynamiques

✅ Navigation programmatique

✅ Lazy loading

✅ Routes imbriquées

✅ Guards de navigation

✅ Redirections et 404

✅ Meta fields

✅ Modes history et hash

---

# Travaux pratiques

1. 🛤️ Créer un système de routing complet
2. 🔐 Implémenter des guards d'authentification
3. ⚡ Lazy loading des pages
4. 🎯 Routes dynamiques pour les produits
5. 🏗️ Routes imbriquées pour le dashboard
6. 🚫 Page 404 personnalisée

### Projet fil rouge

Ajouter le routing à l'application de produits
