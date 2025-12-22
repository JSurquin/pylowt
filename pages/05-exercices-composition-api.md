---
layout: new-section
---

# Exercices Pratiques - Module 4 🎯

Pratiquons la Composition API et les composables !

---
layout: exercices
---

# Exercice 1 : Composable useToggle 🔄

### Objectif : Créer un composable simple

**Instructions :**

Crée un composable `useToggle.ts` qui :
- Accepte une valeur initiale (default: false)
- Retourne l'état et des fonctions toggle/on/off

---
layout: exercices
---

# Solution Exercice 1 ✅

```ts
// composables/useToggle.ts
import { ref } from 'vue'

export function useToggle(initial = false) {
  const value = ref(initial)
  
  function toggle() {
    value.value = !value.value
  }
  
  function on() {
    value.value = true
  }
  
  function off() {
    value.value = false
  }
  
  return { value, toggle, on, off }
}
```

---
layout: exercices
---

# Solution Exercice 1 - Utilisation ✅

```js
<script setup>
import { useToggle } from '@/composables/useToggle'

const { value: isOpen, toggle, on, off } = useToggle()
</script>

<template>
  <div>
    <p>Menu: {{ isOpen ? 'Ouvert' : 'Fermé' }}</p>
    <button @click="toggle">Toggle</button>
    <button @click="on">Ouvrir</button>
    <button @click="off">Fermer</button>
  </div>
</template>
```

---
layout: exercices
---

# Exercice 2 : Composable useDebounce ⏳

### Objectif : Créer un composable avec debounce

**Instructions :**

Crée un composable `useDebounce.ts` qui :
- Accepte une ref et un délai (default: 300ms)
- Retourne une valeur "debounced"

---
layout: exercices
---

# Solution Exercice 2 ✅

```ts
// composables/useDebounce.ts
import { ref, watch, Ref } from 'vue'

export function useDebounce<T>(
  source: Ref<T>, 
  delay = 300
) {
  const debounced = ref(source.value) as Ref<T>
  let timeout: number | null = null
  
  watch(source, (newValue) => {
    if (timeout) clearTimeout(timeout)
    
    timeout = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  })
  
  return debounced
}
```

---
layout: exercices
---

# Solution Exercice 2 - Utilisation ✅

```js
<script setup>
import { ref } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 500)

// Utiliser debouncedQuery pour les appels API
</script>

<template>
  <input v-model="searchQuery" placeholder="Rechercher..." />
  <p>Recherche: {{ searchQuery }}</p>
  <p>Debounced: {{ debouncedQuery }}</p>
</template>
```

---
layout: exercices
---

# Exercice 3 : Composable useAsync 🌐

### Objectif : Créer un composable pour les requêtes async

**Instructions :**

Crée un composable `useAsync.ts` qui :
- Accepte une fonction async
- Gère loading, error, data
- Fournit une méthode execute()

---
layout: exercices
---

# Solution Exercice 3 - Partie 1 ✅

```ts
// composables/useAsync.ts
import { ref, Ref } from 'vue'

interface UseAsyncReturn<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
  execute: (...args: unknown[]) => Promise<void>
}

export function useAsync<T>(
  asyncFn: (...args: unknown[]) => Promise<T>
): UseAsyncReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<Error | null>(null)
  // ... suite
}
```

---
layout: exercices
---

# Solution Exercice 3 - Partie 2 ✅

```ts
// composables/useAsync.ts (suite)
export function useAsync<T>(
  asyncFn: (...args: unknown[]) => Promise<T>
): UseAsyncReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<Error | null>(null)
  
  async function execute(...args: unknown[]) {
    loading.value = true
    error.value = null
    
    try {
      data.value = await asyncFn(...args)
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }
  
  return { data, loading, error, execute }
}
```

---
layout: exercices
---

# Solution Exercice 3 - Utilisation ✅

```js
<script setup>
import { useAsync } from '@/composables/useAsync'

interface User {
  id: number
  name: string
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
}

const { data: user, loading, error, execute } = useAsync(fetchUser)

// Charger l'utilisateur au montage
execute(1)
</script>

<template>
  <div v-if="loading">Chargement...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else-if="user">{{ user.name }}</div>
</template>
```

---
layout: exercices
---

# Exercice 4 : Composable useWindowSize 📐

### Objectif : Créer un composable pour la taille de fenêtre

**Instructions :**

Crée un composable `useWindowSize.ts` qui :
- Retourne la largeur et hauteur de la fenêtre
- Se met à jour au resize
- Nettoie le listener au unmount

---
layout: exercices
---

# Solution Exercice 4 ✅

```ts
// composables/useWindowSize.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  
  function update() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
  
  onMounted(() => {
    window.addEventListener('resize', update)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })
  
  return { width, height }
}
```

---
layout: exercices
---

# Solution Exercice 4 - Utilisation ✅

```js
<script setup>
import { computed } from 'vue'
import { useWindowSize } from '@/composables/useWindowSize'

const { width, height } = useWindowSize()

const isMobile = computed(() => width.value < 768)
const isTablet = computed(() => width.value >= 768 && width.value < 1024)
const isDesktop = computed(() => width.value >= 1024)
</script>

<template>
  <p>Fenêtre: {{ width }} x {{ height }}</p>
  <p v-if="isMobile">📱 Vue mobile</p>
  <p v-else-if="isTablet">📱 Vue tablette</p>
  <p v-else>🖥️ Vue desktop</p>
</template>
```

---
layout: exercices
---

# Exercice 5 : Composable useInterval ⏰

### Objectif : Créer un composable pour les intervalles

**Instructions :**

Crée un composable `useInterval.ts` qui :
- Exécute une fonction à intervalle régulier
- Permet de start/stop/reset
- Nettoie automatiquement au unmount

---
layout: exercices
---

# Solution Exercice 5 - Partie 1 ✅

```ts
// composables/useInterval.ts
import { ref, onUnmounted } from 'vue'

export function useInterval(
  callback: () => void,
  interval = 1000,
  immediate = false
) {
  const isActive = ref(false)
  let intervalId: number | null = null
  
  function start() {
    if (!isActive.value) {
      isActive.value = true
      if (immediate) callback()
      intervalId = setInterval(callback, interval)
    }
  }
  // ... suite
}
```

---
layout: exercices
---

# Solution Exercice 5 - Partie 2 ✅

```ts
// composables/useInterval.ts (suite)
export function useInterval(
  callback: () => void,
  interval = 1000,
  immediate = false
) {
  // ... code précédent
  
  function stop() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    isActive.value = false
  }
  
  function toggle() {
    isActive.value ? stop() : start()
  }
  
  onUnmounted(stop)
  
  return { isActive, start, stop, toggle }
}
```

---
layout: exercices
---

# Solution Exercice 5 - Utilisation ✅

```js
<script setup>
import { ref } from 'vue'
import { useInterval } from '@/composables/useInterval'

const count = ref(0)

const { isActive, start, stop, toggle } = useInterval(
  () => count.value++,
  1000,
  false
)
</script>

<template>
  <p>Compteur: {{ count }}</p>
  <p>Status: {{ isActive ? 'Running' : 'Stopped' }}</p>
  <button @click="toggle">
    {{ isActive ? 'Stop' : 'Start' }}
  </button>
</template>
```

---
layout: exercices
---

# Exercice Bonus : Composable useClipboard 📋

### Objectif : Créer un composable pour le presse-papiers

**Instructions :**

Crée un composable `useClipboard.ts` qui :
- Permet de copier du texte
- Indique si la copie a réussi
- Réinitialise l'état après un délai

---
layout: exercices
---

# Solution Bonus ✅

```ts
// composables/useClipboard.ts
import { ref } from 'vue'

export function useClipboard(resetDelay = 2000) {
  const copied = ref(false)
  const text = ref('')
  
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      text.value = value
      copied.value = true
      
      setTimeout(() => {
        copied.value = false
      }, resetDelay)
    } catch (error) {
      console.error('Erreur copie:', error)
    }
  }
  
  return { copied, text, copy }
}
```

---
layout: exercices
---

# Solution Bonus - Utilisation ✅

```js
<script setup>
import { useClipboard } from '@/composables/useClipboard'

const { copied, copy } = useClipboard()

const code = 'npm install vue'
</script>

<template>
  <div class="code-block">
    <code>{{ code }}</code>
    <button @click="copy(code)">
      {{ copied ? '✅ Copié !' : '📋 Copier' }}
    </button>
  </div>
</template>
```

---
layout: intro
---

# Bravo ! 🎉

Tu as terminé les exercices du Module 5 !

Tu maîtrises maintenant :
- ✅ Créer des composables personnalisés
- ✅ Gérer le debounce et les requêtes async
- ✅ Écouter les événements window/resize
- ✅ Gérer les intervalles proprement
- ✅ Utiliser le presse-papiers

**Prochaine étape : La Réactivité en profondeur ! ⚡**

