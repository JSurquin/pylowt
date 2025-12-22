---
layout: new-section
routeAlias: 'pinia-state'
---

# Module 8 : Pinia - State Management 🍍

Le gestionnaire d'état officiel de Vue.js !

---

# Pourquoi un State Management ? 🤔

Quand ton application grandit, tu rencontres des problèmes :

<v-clicks>

- 📦 Données partagées entre composants éloignés
- 🔄 Prop drilling (passer des props niveau par niveau)
- 🐛 Difficile de suivre qui modifie quoi
- 🧪 Compliqué à tester

</v-clicks>

---

# L'analogie de la Banque 🏦

Imagine une banque :

<v-clicks>

- **Le store** = Le coffre-fort central
- **Le state** = L'argent dans le coffre
- **Les getters** = Les relevés de compte
- **Les actions** = Les transactions (dépôt, retrait)

</v-clicks>

---

# L'analogie de la Banque - Suite 🏦

Tout le monde peut consulter son solde (getters), mais les modifications passent par des transactions (actions) !

---

# Pinia vs Vuex 🥊

Pinia est le successeur de Vuex, plus simple et moderne :

| Critère | Pinia | Vuex |
|---------|-------|------|
| API | Simple | Verbose |
| TypeScript | Natif | Complexe |
| Mutations | Non (optionnelles) | Obligatoires |
| Modules | Auto | Configuration |

---

# Pinia vs Vuex - Résumé 🥊

Pinia = Vuex 5

C'est le gestionnaire d'état officiel recommandé pour Vue 3 !

---

# Installation 📦

```bash
# Inclus si tu as choisi "Yes" à la création du projet
npm create vue@latest

# Sinon, installation manuelle
npm install pinia
```

---

# Configuration 🔧

```ts
// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .mount('#app')
```

---

# Créer un store 📦

```ts
// src/stores/counter.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  
  // Getters
  const doubled = computed(() => count.value * 2)
  
  // Actions
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  return { count, doubled, increment, decrement }
})
```

---

# Utiliser un store 📖

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <p>Doubled: {{ counterStore.doubled }}</p>
    <button @click="counterStore.increment">+1</button>
    <button @click="counterStore.decrement">-1</button>
  </div>
</template>
```

---

# Syntaxe Options vs Setup 📋

Deux façons de définir un store :

**Setup (recommandé)** - comme un composable

**Options** - comme Options API

---

# Store avec Options 📋

```ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  
  getters: {
    doubled: (state) => state.count * 2
  },
  
  actions: {
    increment() {
      this.count++
    }
  }
})
```

---

# Store avec Setup (recommandé) ✨

```ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  return { count, doubled, increment }
})
```

---

# State 📊

L'état central du store :

```ts
export const useUserStore = defineStore('user', () => {
  // State primitif
  const isLoggedIn = ref(false)
  
  // State objet
  const user = ref<User | null>(null)
  
  // State tableau
  const notifications = ref<Notification[]>([])
  
  return { isLoggedIn, user, notifications }
})
```

---

# Getters 🔍

Valeurs dérivées du state (comme computed) :

```ts
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  
  // Getter simple
  const totalItems = computed(() => 
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  
  // Getter avec calcul
  const totalPrice = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    )
  )
  
  return { items, totalItems, totalPrice }
})
```

---

# Getters avec paramètres 🔍

```ts
export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  
  // Getter qui retourne une fonction
  const getProductById = computed(() => {
    return (id: number) => 
      products.value.find(p => p.id === id)
  })
  
  // Utilisation : store.getProductById(42)
  
  return { products, getProductById }
})
```

---

# Actions 🎬

Fonctions qui modifient le state :

```ts
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  
  async function login(email: string, password: string) {
    loading.value = true
    try {
      const response = await api.login(email, password)
      user.value = response.user
      localStorage.setItem('token', response.token)
    } finally {
      loading.value = false
    }
  }
  
  function logout() {
    user.value = null
    localStorage.removeItem('token')
  }
  
  return { user, loading, login, logout }
})
```

---

# Actions async 🌐

```ts
export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  async function fetchProducts() {
    loading.value = true
    error.value = null
    
    try {
      products.value = await api.getProducts()
    } catch (e) {
      error.value = 'Erreur de chargement'
      console.error(e)
    } finally {
      loading.value = false
    }
  }
  
  return { products, loading, error, fetchProducts }
})
```

---

# Destructuration avec storeToRefs 🔗

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

// ❌ Perd la réactivité !
const { count, doubled } = counterStore

// ✅ Garde la réactivité !
const { count, doubled } = storeToRefs(counterStore)

// Les actions n'ont pas besoin de storeToRefs
const { increment, decrement } = counterStore
</script>
```

---

# storeToRefs - Pourquoi ? 🔗

<v-clicks>

- Le state et les getters sont réactifs via Proxy
- La destructuration "casse" le proxy
- `storeToRefs` convertit en refs individuelles
- Les actions sont des fonctions normales, pas besoin

</v-clicks>

---

# Modifier le state directement 📝

```ts
const store = useUserStore()

// ✅ Modification directe (contrairement à Vuex !)
store.user = { name: 'John', email: 'john@mail.com' }
store.notifications.push({ message: 'Hello!' })
```

---

# $patch : Modifications groupées 📦

```ts
const store = useUserStore()

// Modifier plusieurs propriétés à la fois
store.$patch({
  user: { name: 'John', email: 'john@mail.com' },
  isLoggedIn: true
})

// Avec une fonction (pour les tableaux)
store.$patch((state) => {
  state.notifications.push({ message: 'New!' })
  state.count++
})
```

---

# $reset : Réinitialiser le state 🔄

```ts
// ⚠️ Fonctionne uniquement avec la syntaxe Options !
const store = useCounterStore()
store.$reset()  // Remet le state à son état initial
```

---

# $reset avec Setup Store 🔄

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  
  // Créer manuellement une fonction reset
  function $reset() {
    count.value = 0
  }
  
  return { count, $reset }
})
```

---

# Souscrire aux changements 👂

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// Écouter les changements
store.$subscribe((mutation, state) => {
  console.log('State changed:', mutation.type)
  console.log('New state:', state)
  
  // Sauvegarder dans localStorage
  localStorage.setItem('counter', JSON.stringify(state))
})
</script>
```

---

# Stores composés 🧩

Un store peut utiliser d'autres stores :

```ts
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const productStore = useProductStore()
  
  const items = ref<CartItem[]>([])
  
  async function checkout() {
    if (!userStore.isLoggedIn) {
      throw new Error('Veuillez vous connecter')
    }
    
    // Utiliser les données d'autres stores
    await api.checkout({
      userId: userStore.user!.id,
      items: items.value
    })
  }
  
  return { items, checkout }
})
```

---

# Plugins Pinia 🔌

Étendre les fonctionnalités de Pinia :

```ts
// plugins/persistedState.ts
import { PiniaPluginContext } from 'pinia'

export function persistedState({ store }: PiniaPluginContext) {
  // Restaurer le state au chargement
  const saved = localStorage.getItem(store.$id)
  if (saved) {
    store.$patch(JSON.parse(saved))
  }
  
  // Sauvegarder à chaque changement
  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state))
  })
}
```

---

# Plugins Pinia - Utilisation 🔌

```ts
// main.ts
import { createPinia } from 'pinia'
import { persistedState } from './plugins/persistedState'

const pinia = createPinia()
pinia.use(persistedState)
```

---

# pinia-plugin-persistedstate 📦

Plugin populaire pour la persistance :

```bash
npm install pinia-plugin-persistedstate
```

---

# pinia-plugin-persistedstate - Usage 📦

```ts
// main.ts
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

---

# pinia-plugin-persistedstate - Store 📦

```ts
// Dans le store
export const useUserStore = defineStore('user', () => {
  // ...
}, {
  persist: true  // Active la persistance
})
```

---

# Vue DevTools 🔧

Pinia s'intègre parfaitement avec Vue DevTools :

<v-clicks>

- 📊 Voir l'état de tous les stores
- ⏱️ Timeline des actions
- ✏️ Modifier le state en temps réel
- 📸 Snapshots et time-travel

</v-clicks>

---

# Bonnes pratiques 📚

<v-clicks>

- 🎯 Un store par domaine (user, products, cart)
- 📁 Organiser dans `/stores/`
- 🔧 Préférer la syntaxe Setup
- 🧪 Tester les stores indépendamment
- 🔒 Valider les actions côté serveur

</v-clicks>

---

# Organisation des stores 📁

```
src/stores/
├── index.ts        # Export centralisé (optionnel)
├── user.ts         # Store utilisateur
├── products.ts     # Store produits
├── cart.ts         # Store panier
└── notifications.ts # Store notifications
```

---

# Résumé du Module 8 📝

<v-clicks>

- ✅ **Pinia** est le state manager officiel de Vue 3
- ✅ **State** = données centralisées
- ✅ **Getters** = valeurs dérivées (computed)
- ✅ **Actions** = fonctions qui modifient le state
- ✅ **storeToRefs** pour destructurer le state
- ✅ **Plugins** pour étendre (persistance, etc.)

</v-clicks>

---
layout: intro
---

# Prêt pour le QCM ? 🎯

Vérifions que tu maîtrises Pinia !

