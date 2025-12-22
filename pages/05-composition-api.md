---
layout: new-section
routeAlias: 'composition-api'
---

# Module 4 : Composition API 🎯

La nouvelle façon d'organiser ton code Vue.js !

---

# Options API vs Composition API 🥊

Deux façons d'écrire des composants Vue :

<v-clicks>

- **Options API** : L'approche classique (Vue 2)
- **Composition API** : La nouvelle approche (Vue 3)

</v-clicks>

---

# Options API vs Composition API - Suite 🥊

Les deux sont valides en Vue 3 !

Mais la Composition API offre plus de flexibilité.

---

# L'analogie de la Cuisine 🍳

**Options API** = Une cuisine avec des zones fixes :
- Zone "data" (frigo)
- Zone "methods" (plan de travail)
- Zone "computed" (robot culinaire)

---

# L'analogie de la Cuisine - Suite 🍳

**Composition API** = Une cuisine modulaire :
- Tu organises par "recette" (fonctionnalité)
- Tout ce qui concerne le même plat est ensemble
- Plus facile de partager des recettes !

---

# Options API : Rappel 📋

```vue
<script>
export default {
  data() {
    return {
      count: 0,
      name: 'Vue.js'
    }
  },
  computed: {
    doubled() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('Composant monté !')
  }
}
</script>
```

---

# Options API : Le problème 😰

Quand le composant grandit, le code lié à une même fonctionnalité est éparpillé :

<v-clicks>

- Les données dans `data`
- Les calculs dans `computed`
- Les actions dans `methods`
- Les effets dans `mounted`, `watch`...

</v-clicks>

---

# Options API : Le problème - Suite 😰

Tu dois "sauter" constamment entre les sections !

C'est comme chercher les ingrédients d'une recette dans toute la cuisine.

---

# Composition API : La solution 🎯

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

// Tout ce qui concerne le compteur ensemble !
const count = ref(0)
const doubled = computed(() => count.value * 2)
function increment() {
  count.value++
}

// Tout ce qui concerne le nom ensemble !
const name = ref('Vue.js')

onMounted(() => {
  console.log('Composant monté !')
})
</script>
```

---

# `<script setup>` : La syntaxe simplifiée ✨

`<script setup>` est une "compilation sugar" qui simplifie la Composition API :

<v-clicks>

- ✅ Pas besoin de `return` - tout est exposé au template
- ✅ Imports de composants auto-disponibles
- ✅ Props et emits avec `defineProps` et `defineEmits`
- ✅ Moins de boilerplate

</v-clicks>

---

# Sans `<script setup>` (verbose) 📜

```vue
<script>
import { ref, computed } from 'vue'
import MyComponent from './MyComponent.vue'

export default {
  components: { MyComponent },
  setup() {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)
    
    function increment() {
      count.value++
    }
    
    // Doit retourner tout ce qu'on veut utiliser
    return { count, doubled, increment }
  }
}
</script>
```

---

# Avec `<script setup>` (concis) ✨

```vue
<script setup>
import { ref, computed } from 'vue'
import MyComponent from './MyComponent.vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
// Pas de return, tout est automatique !
</script>
```

---

# Lifecycle Hooks 🔄

Les hooks du cycle de vie en Composition API :

```vue
<script setup>
import { 
  onMounted, 
  onUpdated, 
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'

onMounted(() => {
  console.log('Le composant est monté !')
})

onUnmounted(() => {
  console.log('Le composant est détruit !')
})
</script>
```

---

# Correspondance des Hooks 📊

| Options API | Composition API |
|-------------|-----------------|
| `beforeCreate` | Non nécessaire (setup) |
| `created` | Non nécessaire (setup) |
| `beforeMount` | `onBeforeMount` |
| `mounted` | `onMounted` |
| `beforeUpdate` | `onBeforeUpdate` |
| `updated` | `onUpdated` |
| `beforeUnmount` | `onBeforeUnmount` |
| `unmounted` | `onUnmounted` |

---

# Pourquoi pas beforeCreate/created ? 🤔

Le code dans `<script setup>` s'exécute déjà au même moment que `created` !

```vue
<script setup>
// Ce code s'exécute au moment de la création
console.log('Équivalent à created !')

onMounted(() => {
  // Ceci s'exécute après le montage DOM
  console.log('DOM disponible !')
})
</script>
```

---

# Les Composables : Réutiliser la logique 🧩

Un **composable** est une fonction qui utilise la Composition API et retourne de l'état/des méthodes réactifs.

---

# Les Composables : Exemple 🧩

```ts
// composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const doubled = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = initial
  }
  
  return { count, doubled, increment, decrement, reset }
}
```

---

# Les Composables : Utilisation 🧩

```vue
<script setup>
import { useCounter } from '@/composables/useCounter'

const { count, doubled, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <p>Count: {{ count }} (doubled: {{ doubled }})</p>
  <button @click="decrement">-</button>
  <button @click="increment">+</button>
  <button @click="reset">Reset</button>
</template>
```

---

# Composable : useLocalStorage 💾

```ts
// composables/useLocalStorage.ts
import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  // Lire la valeur initiale
  const stored = localStorage.getItem(key)
  const value = ref<T>(
    stored ? JSON.parse(stored) : defaultValue
  )
  
  // Sauvegarder à chaque changement
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })
  
  return value
}
```

---

# Composable : useLocalStorage - Utilisation 💾

```vue
<script setup>
import { useLocalStorage } from '@/composables/useLocalStorage'

const settings = useLocalStorage('settings', {
  theme: 'dark',
  language: 'fr'
})
</script>

<template>
  <select v-model="settings.theme">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</template>
```

---

# Composable : useFetch 🌐

```ts
// composables/useFetch.ts
import { ref } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)
  
  fetch(url)
    .then(res => res.json())
    .then(json => {
      data.value = json
    })
    .catch(err => {
      error.value = err
    })
    .finally(() => {
      loading.value = false
    })
  
  return { data, error, loading }
}
```

---

# Composable : useFetch - Utilisation 🌐

```vue
<script setup>
import { useFetch } from '@/composables/useFetch'

const { data: users, loading, error } = useFetch<User[]>(
  'https://api.example.com/users'
)
</script>

<template>
  <div v-if="loading">Chargement...</div>
  <div v-else-if="error">Erreur: {{ error.message }}</div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>
```

---

# Composable : useMouse 🖱️

```ts
// composables/useMouse.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  
  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  
  return { x, y }
}
```

---

# Composable : useMouse - Utilisation 🖱️

```vue
<script setup>
import { useMouse } from '@/composables/useMouse'

const { x, y } = useMouse()
</script>

<template>
  <p>Position: {{ x }}, {{ y }}</p>
</template>
```

---

# Template Refs en Composition API 🎯

Accéder aux éléments DOM :

```vue
<script setup>
import { ref, onMounted } from 'vue'

// La ref doit avoir le même nom que l'attribut ref
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="inputRef" type="text" />
</template>
```

---

# Component Refs 🧩

Accéder aux composants enfants :

```vue
<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const childRef = ref<InstanceType<typeof ChildComponent> | null>(null)

function callChildMethod() {
  childRef.value?.someMethod()
}
</script>

<template>
  <ChildComponent ref="childRef" />
  <button @click="callChildMethod">Appeler enfant</button>
</template>
```

---

# Bonnes pratiques Composables ✅

<v-clicks>

- 📁 Placer dans `/composables/` avec préfixe `use`
- 🎯 Une responsabilité par composable
- 📤 Toujours retourner un objet (pas un tableau)
- 🧹 Nettoyer les effets dans `onUnmounted`
- 📝 Typer avec TypeScript

</v-clicks>

---

# Organisation des composables 📁

```
src/
└── composables/
    ├── useAuth.ts        # Authentification
    ├── useCounter.ts     # Compteur
    ├── useFetch.ts       # Requêtes HTTP
    ├── useLocalStorage.ts # LocalStorage
    ├── useMouse.ts       # Position souris
    ├── useDebounce.ts    # Debounce
    └── index.ts          # Export centralisé
```

---

# Export centralisé 📤

```ts
// composables/index.ts
export * from './useAuth'
export * from './useCounter'
export * from './useFetch'
export * from './useLocalStorage'
export * from './useMouse'
export * from './useDebounce'
```

---

# Export centralisé - Utilisation 📤

```vue
<script setup>
// Import propre depuis un seul endroit
import { useAuth, useFetch } from '@/composables'
</script>
```

---

# VueUse : La bibliothèque de composables 📚

VueUse offre +200 composables prêts à l'emploi !

```bash
npm install @vueuse/core
```

---

# VueUse : Exemples 📚

```vue
<script setup>
import { 
  useMouse, 
  useLocalStorage, 
  useDark,
  useClipboard,
  useOnline
} from '@vueuse/core'

const { x, y } = useMouse()
const isDark = useDark()
const { copy, copied } = useClipboard()
const isOnline = useOnline()
</script>
```

---

# Résumé du Module 5 📝

<v-clicks>

- ✅ `<script setup>` simplifie la Composition API
- ✅ Le code est organisé par **fonctionnalité**, pas par type
- ✅ Les **composables** (`use*`) encapsulent la logique réutilisable
- ✅ Les **lifecycle hooks** deviennent des fonctions (`onMounted`, etc.)
- ✅ **VueUse** offre des centaines de composables prêts à l'emploi

</v-clicks>

---
layout: intro
---

# Prêt pour le QCM ? 🎯

Vérifions que tu maîtrises la Composition API !

