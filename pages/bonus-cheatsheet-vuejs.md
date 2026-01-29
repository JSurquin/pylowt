---
layout: section
routeAlias: 'bonus-cheatsheet'
---

# 📋 Cheatsheet Vue.js 3

Guide de référence rapide 2025

---
layout: two-cols
---

# 🎯 Création et installation

### Créer un projet

```bash
npm create vite@latest mon-app -- --template vue
cd mon-app
npm install
npm run dev
```

### Packages essentiels

```bash
npm install vue-router@4
npm install pinia
npm install axios
npm install -D vitest @vue/test-utils
```

::right::

# 🧩 Composant de base

```vue
<template>
  <div>
    <h1>{{ titre }}</h1>
    <button @click="count++">
      {{ count }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const titre = ref('Hello')
const count = ref(0)
</script>

<style scoped>
div { padding: 20px; }
</style>
```

---
layout: two-cols
---

# 📝 Directives essentielles

```vue
<template>
  <!-- Conditions -->
  <div v-if="show">Visible</div>
  <div v-else>Caché</div>
  <div v-show="toggle">Toggle CSS</div>
  
  <!-- Boucles -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  
  <!-- Binding -->
  <img :src="url" :alt="desc">
  <div :class="{ active: isActive }">
  <div :style="{ color: myColor }">
```

::right::

```vue
  <!-- Événements -->
  <button @click="doSomething">
  <input @input="handleInput">
  <form @submit.prevent="onSubmit">
  
  <!-- Modificateurs -->
  <button @click.stop="...">
  <button @click.once="...">
  <input @keyup.enter="...">
  
  <!-- v-model -->
  <input v-model="text">
  <input v-model.number="age">
  <input v-model.trim="name">
  <input v-model.lazy="msg">
</template>
```

---

# 🔧 Props et Events

```vue
<!-- Composant Enfant -->
<script setup>
const props = defineProps({
  titre: { type: String, required: true },
  count: { type: Number, default: 0 }
})

const emit = defineEmits(['update', 'delete'])

const handleClick = () => {
  emit('update', props.count + 1)
}
</script>

<!-- Composant Parent -->
<template>
  <EnfantComponent 
    :titre="monTitre" 
    :count="25"
    @update="handleUpdate"
    @delete="handleDelete"
  />
</template>
```

---

# 🎰 Slots

```vue
<!-- Composant avec slots -->
<template>
  <div class="card">
    <header><slot name="header">Titre par défaut</slot></header>
    <main><slot>Contenu par défaut</slot></main>
    <footer><slot name="footer" /></footer>
  </div>
</template>

<!-- Utilisation -->
<template>
  <Card>
    <template #header><h1>Mon titre</h1></template>
    <p>Mon contenu</p>
    <template #footer><p>Pied de page</p></template>
  </Card>
</template>
```

---

# 🧮 Computed et Watch

```vue
<script setup>
import { ref, computed, watch } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// Computed (cache automatique)
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// Watch
watch(firstName, (newVal, oldVal) => {
  console.log(`Changement: ${oldVal} -> ${newVal}`)
})

// Watch multiple
watch([firstName, lastName], ([newFirst, newLast]) => {
  console.log('Nom complet changé')
})
</script>
```

---

# 🔄 Lifecycle Hooks

```vue
<script setup>
import { 
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

onMounted(() => {
  console.log('Composant monté - Idéal pour les appels API')
})

onUnmounted(() => {
  console.log('Composant détruit - Nettoyer les événements')
})
</script>
```

---

# 🍍 Pinia - Store

```javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  
  // Getters
  const doubleCount = computed(() => count.value * 2)
  
  // Actions
  function increment() {
    count.value++
  }
  
  return { count, doubleCount, increment }
})
```

---

# 🍍 Pinia - Utilisation

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()

// Destructurer avec réactivité
const { count, doubleCount } = storeToRefs(store)
const { increment } = store
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

---

# 🛤️ Vue Router - Configuration

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  { path: '/user/:id', name: 'User', component: () => import('@/views/User.vue'), props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

---

# 🛤️ Vue Router - Navigation

```vue
<template>
  <!-- Liens -->
  <router-link to="/">Home</router-link>
  <router-link :to="{ name: 'User', params: { id: 123 } }">User</router-link>
  
  <!-- Vue de rendu -->
  <router-view />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Navigation programmatique
const goToUser = (id) => router.push({ name: 'User', params: { id } })

// Accès aux paramètres
const userId = route.params.id
</script>
```

---

# 🧪 Tests avec Vitest

```javascript
// MonComposant.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonComposant from './MonComposant.vue'

describe('MonComposant', () => {
  it('affiche le bon titre', () => {
    const wrapper = mount(MonComposant, {
      props: { titre: 'Test' }
    })
    expect(wrapper.text()).toContain('Test')
  })
  
  it('incrémente au clic', async () => {
    const wrapper = mount(MonComposant)
    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })
})
```

---

# 🔧 Composables (Custom Hooks)

```javascript
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}

// Utilisation
const { x, y } = useMouse()
```

---

# 🎨 CSS et Styles

```vue
<template>
  <div class="container" :class="{ active: isActive }">
    <p :style="{ color: textColor }">Texte</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const textColor = ref('red')
const isActive = ref(true)
</script>

<style scoped>
.container {
  padding: 20px;
  color: v-bind(textColor); /* CSS réactive */
}

/* Deep selector */
:deep(.child-class) { color: blue; }
</style>
```

---

# 🎯 Bonnes pratiques 2025

### Organisation des fichiers

```
src/
├── components/     # Composants réutilisables
├── composables/    # Hooks personnalisés
├── stores/         # Stores Pinia
├── router/         # Configuration du router
├── views/          # Pages/vues
└── main.ts
```

### Nommage

- **Composants**: PascalCase (`UserProfile.vue`)
- **Props**: camelCase (`userId`)
- **Events**: kebab-case (`@update-user`)
- **Composables**: `useCamelCase` (`useMouse`)

---

# ⚡ Astuces et raccourcis

```vue
<script setup>
import { ref, computed, watch } from 'vue'

// Lazy loading
const HeavyComp = defineAsyncComponent(() => import('./Heavy.vue'))

// v-memo (cache conditionnel)
<div v-memo="[valueA, valueB]">...</div>

// v-once (render une seule fois)
<div v-once>{{ staticContent }}</div>

// Provide / Inject
provide('theme', 'dark')
const theme = inject('theme')

// Template refs
const inputRef = ref(null)
onMounted(() => inputRef.value.focus())
</script>

<template>
  <input ref="inputRef" type="text">
</template>
```

---

# 📚 Ressources utiles

### Documentation officielle

- **Vue.js**: https://vuejs.org/
- **Vue Router**: https://router.vuejs.org/
- **Pinia**: https://pinia.vuejs.org/
- **Vitest**: https://vitest.dev/
- **Vite**: https://vitejs.dev/

### Outils recommandés

- **VS Code Extensions**: Volar, ESLint, Prettier
- **DevTools**: Vue DevTools (Chrome/Firefox)
- **UI Libraries**: Vuetify, PrimeVue, Quasar

### Communauté

- **GitHub**: https://github.com/vuejs
- **Discord**: https://discord.com/invite/vue
- **Forum**: https://forum.vuejs.org/

---
layout: center
class: text-center
---

# 🎉 Fin de la Cheatsheet Vue.js 3

Merci d'avoir suivi cette formation !

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer">
    Bonne pratique avec Vue.js 3 ! 💚
  </span>
</div>
