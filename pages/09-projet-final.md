---
layout: new-section
routeAlias: 'projet-final'
---

# Module 9 : Projet Final et Bonnes Pratiques 🚀

Consolidons tout ce que tu as appris !

---

# Récapitulatif des 3 jours 📚


**Jour 1 - Fondamentaux**
- Introduction à Vue.js 3
- Templates et Directives
- Réactivité et Computed

**Jour 2 - Composants**
- Composants Vue.js
- Composition API
- Formulaires et v-model

**Jour 3 - Écosystème**
- Vue Router 4
- Pinia State Management
- Projet Final


---

# Architecture Vue.js 3 Complete 🏗️

```mermaid {theme: 'base', themeVariables: {primaryColor: '#42b883', primaryTextColor: '#fff', lineColor: '#35495e'}}
flowchart TB
    subgraph App["🖥️ Application Vue.js"]
        subgraph UI["Interface"]
            V["Views/Pages"]
            C["Components"]
        end
        
        subgraph Logic["Logique"]
            CO["Composables"]
            S["Stores Pinia"]
        end
        
        R["Router"]
    end
    
    U["👤 User"] --> R
    R --> V
    V --> C
    C <--> CO
    C <--> S
    S <--> API["🌐 API Backend"]
    
    style App fill:#35495e,stroke:#42b883,stroke-width:3px
    style UI fill:#42b883,stroke:#35495e
    style Logic fill:#3498db,stroke:#35495e
```

---

# Architecture recommandée 📁

```
src/
├── assets/           # Images, fonts, CSS global
├── components/       
│   ├── common/       # BaseButton, BaseInput, BaseCard
│   ├── layout/       # TheHeader, TheSidebar, TheFooter
│   └── features/     # Composants métier
├── composables/      # Logique réutilisable
├── router/           # Configuration routes
├── stores/           # Pinia stores
├── views/            # Pages/écrans
├── types/            # Types TypeScript
├── utils/            # Fonctions utilitaires
├── App.vue
└── main.ts
```

---

# Conventions de nommage 📝


- **Composants** : PascalCase (`UserCard.vue`)
- **Composables** : camelCase avec préfixe `use` (`useAuth.ts`)
- **Stores** : camelCase avec préfixe `use` (`useUserStore.ts`)
- **Fichiers utils** : camelCase (`formatDate.ts`)
- **Types** : PascalCase (`User.ts`)


---

# Composants Base 🧱

Préfixe `Base` pour les composants génériques :

```
components/common/
├── BaseButton.vue
├── BaseInput.vue
├── BaseCard.vue
├── BaseModal.vue
├── BaseSelect.vue
└── BaseLoading.vue
```

---

# Composants Single-Instance 🎯

Préfixe `The` pour les composants utilisés une seule fois :

```
components/layout/
├── TheHeader.vue
├── TheSidebar.vue
├── TheFooter.vue
└── TheNavigation.vue
```

---

# TypeScript : Interfaces 📝

Définir des types clairs :

```ts
// types/user.ts
export interface User {
  id: number
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  createdAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}
```

---

# TypeScript : Props typées 📝

```js
<script setup lang="ts">
import type { User } from '@/types/user'

interface Props {
  user: User
  showActions?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
  size: 'md'
})
</script>
```

---

# Gestion des erreurs 🛡️

```ts
// composables/useApi.ts
export function useApi() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  async function execute<T>(fn: () => Promise<T>): Promise<T | null> {
    loading.value = true
    error.value = null
    
    try {
      return await fn()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erreur inconnue'
      return null
    } finally {
      loading.value = false
    }
  }
  
  return { loading, error, execute }
}
```

---

# Variables d'environnement 🔐

```bash
# .env
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=Mon App Vue
```

---

# Variables d'environnement - Usage 🔐

```ts
// Accès aux variables
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE

// Mode développement/production
if (import.meta.env.DEV) {
  console.log('Mode développement')
}
```

---

# Tests avec Vitest 🧪

```ts
// components/__tests__/Counter.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../Counter.vue'

describe('Counter', () => {
  it('increments count when button clicked', async () => {
    const wrapper = mount(Counter)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.text()).toContain('1')
  })
})
```

---

# Tests de Store 🧪

```ts
// stores/__tests__/counter.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../counter'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('increments count', () => {
    const store = useCounterStore()
    
    store.increment()
    
    expect(store.count).toBe(1)
  })
})
```

---

# Optimisation : Lazy Loading 🚀

```ts
// router/index.ts
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: 'stats',
        component: () => import('@/views/dashboard/StatsView.vue')
      }
    ]
  }
]
```

---

# Optimisation : Composants async 🚀

```js
<script setup>
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent(() =>
  import('./HeavyChart.vue')
)
</script>

<template>
  <Suspense>
    <template #default>
      <HeavyChart />
    </template>
    <template #fallback>
      <div>Chargement du graphique...</div>
    </template>
  </Suspense>
</template>
```

---

# Déploiement : Build 📦

```bash
# Build de production
npm run build

# Preview du build
npm run preview
```

---

# Déploiement : Build - Résultat 📦

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── favicon.ico
```

---

# Déploiement Vercel 🚀

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

# Déploiement Vercel - Commande 🚀

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

---

# Déploiement Netlify 🚀

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

# Checklist avant production ✅


- 🔐 Variables d'environnement configurées
- 🧪 Tests passent
- 📱 Responsive testé
- ♿ Accessibilité vérifiée
- 🚀 Bundle analysé (pas trop gros)
- 🔍 SEO (meta tags, sitemap)
- 📊 Analytics configurés


---

# Ressources pour aller plus loin 📚


- 📖 [vuejs.org](https://vuejs.org) - Documentation officielle
- 🍍 [pinia.vuejs.org](https://pinia.vuejs.org) - Pinia docs
- 🛤️ [router.vuejs.org](https://router.vuejs.org) - Vue Router docs
- 🧰 [vueuse.org](https://vueuse.org) - Composables utiles
- 💚 [Vue Mastery](https://www.vuemastery.com) - Cours vidéo
- 🎨 [VueUse](https://vueuse.org) - +200 composables


---

# Projet Final : Mini E-commerce 🛒

### Objectif : Créer une app e-commerce simple

**Fonctionnalités :**
- Liste de produits
- Ajout au panier
- Page panier
- Authentification simulée

---

# Projet Final - Structure 🛒

```
src/
├── components/
│   ├── ProductCard.vue
│   ├── CartItem.vue
│   └── TheHeader.vue
├── stores/
│   ├── products.ts
│   ├── cart.ts
│   └── user.ts
├── views/
│   ├── HomeView.vue
│   ├── CartView.vue
│   └── LoginView.vue
└── router/
    └── index.ts
```

---

# Ce que tu as appris 🎓


- ✅ Créer des applications Vue.js 3 modernes
- ✅ Utiliser la Composition API et les composables
- ✅ Gérer l'état avec Pinia
- ✅ Naviguer avec Vue Router 4
- ✅ Structurer un projet professionnel
- ✅ Appliquer les bonnes pratiques


---
layout: intro
---

# Félicitations ! 🎉

Tu as terminé la formation Vue.js 3 !

Tu es maintenant prêt(e) à créer des applications Vue.js professionnelles.

**Dernier défi : Le QCM Final ! 🏆**

