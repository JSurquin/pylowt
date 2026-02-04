---
layout: new-section
routeAlias: 'bonus-typescript'
---

<a name="bonus-typescript" id="bonus-typescript"></a>

# MODULE BONUS
## TypeScript avec Vue.js 3 - 2026

---

### 📊 TypeScript + Vue.js en 2026

**TypeScript** est devenu l'**incontournable** pour les projets Vue.js professionnels

### 🎯 Pourquoi TypeScript avec Vue.js ?

- **Sécurité du typage** : détection d'erreurs à la compilation
- **IntelliSense amélioré** : autocomplétion intelligente dans votre IDE
- **Refactoring sûr** : modifications sans peur de tout casser
- **Documentation vivante** : les types documentent votre code
- **Meilleure maintenabilité** : projets plus stables sur le long terme

### 📈 L'écosystème Vue.js 2026

En 2026, TypeScript est **natif** dans l'écosystème Vue :
- Vite prend en charge TS par défaut
- Composition API optimisée pour TS
- Vue 3.5+ avec de nouvelles fonctionnalités TS
- Types génériques améliorés

---

### 🆚 JavaScript vs TypeScript

| Aspect | JavaScript | TypeScript |
|--------|-----------|------------|
| **Typage** | Dynamique | Statique |
| **Erreurs** | Runtime | Compile-time |
| **IDE Support** | Basique | Excellent |
| **Courbe apprentissage** | Facile | Moyenne |
| **Maintenance** | Difficile (gros projets) | Excellente |
| **Performance** | Identique | Identique |

---

### 🎯 Quand utiliser TypeScript ?

**✅ TypeScript recommandé pour :**
- Projets professionnels
- Équipes multiples
- Applications complexes
- Code réutilisable (librairies)

**❌ JavaScript peut suffire pour :**
- Prototypes rapides
- Petits projets personnels
- Scripts simples

---

# Installation et Configuration

### 📦 Créer un projet Vue.js + TypeScript (2026)

```bash
npm create vue@latest mon-projet-vue-ts
```

---

### ⚙️ Options de configuration recommandées

```text
✔ Project name: mon-projet-vue-ts
✔ Add TypeScript? … Yes
✔ Add JSX Support? … No
✔ Add Vue Router? … Yes
✔ Add Pinia? … Yes
✔ Add Vitest? … Yes
✔ Add ESLint? … Yes
✔ Add Prettier? … Yes
```

---

### 📁 Structure d'un projet TypeScript Vue.js

```text
mon-projet-vue-ts/
├── src/
│   ├── components/
│   │   └── HelloWorld.vue
│   ├── views/
│   │   └── HomeView.vue
│   ├── stores/
│   │   └── counter.ts
│   ├── router/
│   │   └── index.ts
│   ├── types/           ← Nouveauté : nos types
│   │   └── index.ts
│   ├── App.vue
│   └── main.ts          ← .ts au lieu de .js
├── tsconfig.json        ← Configuration TypeScript
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts       ← Vite en TypeScript
```

---

# Configuration TypeScript

### 📄 tsconfig.json (2026)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "allowImportingTsExtensions": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### 🔧 Options importantes expliquées

- **`strict: true`** : Active tous les checks stricts (recommandé!)
- **`noUnusedLocals`** : Détecte les variables non utilisées
- **`noUnusedParameters`** : Détecte les paramètres non utilisés
- **`moduleResolution: "bundler"`** : Optimisé pour Vite (2026)
- **`target: "ES2022"`** : Cible ECMAScript 2022
- **`allowImportingTsExtensions`** : Permet d'importer `.ts`

---

# Types de base en TypeScript

### 🔤 Typage primitif

```typescript
// Types de base
const name: string = 'Vue.js'
const age: number = 5
const isActive: boolean = true
const nothing: null = null
const undef: undefined = undefined

// Arrays
const numbers: number[] = [1, 2, 3]
const names: Array<string> = ['Alice', 'Bob']

// Tuples (nouveau en TS)
const coordinate: [number, number] = [10, 20]
```

---

### 🎯 Types avancés

```typescript
// Union types
type Status = 'pending' | 'success' | 'error'
const taskStatus: Status = 'pending'

// Intersection types
type User = { name: string }
type Admin = { role: string }
type AdminUser = User & Admin

// Type assertion
const input = document.querySelector('input') as HTMLInputElement
```

---

### 📦 Interfaces

```typescript
// Interface pour un objet
interface User {
  id: number
  name: string
  email: string
  age?: number  // propriété optionnelle
  readonly createdAt: Date  // lecture seule
}

// Utilisation
const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  createdAt: new Date()
}
```

---

### 🔄 Type vs Interface

```typescript
// Type
type Point = {
  x: number
  y: number
}

// Interface
interface IPoint {
  x: number
  y: number
}
```

---

**Différences clés en 2026 :**

| Feature | Type | Interface |
|---------|------|-----------|
| Extension | Intersection `&` | `extends` |
| Union types | ✅ Oui | ❌ Non |
| Computed properties | ✅ Oui | ❌ Non |
| Declaration merging | ❌ Non | ✅ Oui |
| Performance | Identique | Identique |

**Recommandation 2026 :** Utilisez `type` par défaut, `interface` pour l'extensibilité

---

# TypeScript dans les composants Vue

### 🎨 Composant avec Options API

```vue
<script lang="ts">
import { defineComponent } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export default defineComponent({
  name: 'UserCard',
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      user: null as User | null,
      loading: false
    }
  }
})
</script>
```

---

### Continuation du composant

```vue
<script lang="ts">
export default defineComponent({
  // ... suite
  computed: {
    userName(): string {
      return this.user?.name ?? 'Anonymous'
    }
  },
  methods: {
    async fetchUser(): Promise<void> {
      this.loading = true
      try {
        const response = await fetch(`/api/users/${this.userId}`)
        this.user = await response.json()
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
```

---

### 🎨 Composant avec Composition API (Recommandé 2026)

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

const props = defineProps<{
  userId: number
}>()

const user = ref<User | null>(null)
const loading = ref(false)
```

---

### Continuation avec Composition API

```vue
<script setup lang="ts">
// ... suite

const userName = computed(() => user.value?.name ?? 'Anonymous')

const fetchUser = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await fetch(`/api/users/${props.userId}`)
    user.value = await response.json()
  } finally {
    loading.value = false
  }
}

// Appel au montage
fetchUser()
</script>

<template>
  <div v-if="loading">Chargement...</div>
  <div v-else-if="user">
    <h2>{{ userName }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>
```

---

# Props avec TypeScript

### 📦 Méthode 1 : defineProps avec typage runtime

```vue
<script setup lang="ts">
import { PropType } from 'vue'

interface Task {
  id: number
  title: string
  completed: boolean
}

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true
  },
  priority: {
    type: String as PropType<'low' | 'medium' | 'high'>,
    default: 'medium'
  }
})
</script>
```

---

### 📦 Méthode 2 : defineProps avec typage pur (Recommandé 2026)

```vue
<script setup lang="ts">
interface Task {
  id: number
  title: string
  completed: boolean
}

interface Props {
  task: Task
  priority?: 'low' | 'medium' | 'high'
}

const props = withDefaults(defineProps<Props>(), {
  priority: 'medium'
})
</script>
```

---

**✨ Avantage méthode 2 (2026) :**
- Plus concis
- Typage pur TypeScript
- Meilleur support IDE
- Pas de runtime overhead

---

### 📦 Props avec valeurs par défaut avancées

```vue
<script setup lang="ts">
interface User {
  name: string
  avatar?: string
}

interface Props {
  user: User
  maxLength?: number
  tags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  maxLength: 50,
  tags: () => []  // Fonction pour types complexes
})
</script>
```

---

# Emits avec TypeScript

### 📤 Définir les événements typés

```vue
<script setup lang="ts">
interface Task {
  id: number
  title: string
}

// Méthode 1 : Array (simple)
const emit = defineEmits<{
  'task-created': [task: Task]
  'task-deleted': [id: number]
  'update:modelValue': [value: string]
}>()

// Utilisation
const handleCreate = (task: Task) => {
  emit('task-created', task)
}
</script>
```

---

### 📤 Emits avec validation

```vue
<script setup lang="ts">
// Méthode 2 : Avec validation runtime
const emit = defineEmits({
  'task-created': (task: Task) => {
    return task.id > 0 && task.title.length > 0
  },
  'task-deleted': (id: number) => {
    return id > 0
  }
})
</script>
```

---

### 📤 Exemple complet avec Props + Emits

```vue
<script setup lang="ts">
interface Task {
  id: number
  title: string
  completed: boolean
}

interface Props {
  task: Task
}

interface Emits {
  'update:task': [task: Task]
  'delete': [id: number]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
```

---

### Continuation exemple complet

```vue
<script setup lang="ts">
// ... suite

const toggleComplete = () => {
  emit('update:task', {
    ...props.task,
    completed: !props.task.completed
  })
}

const handleDelete = () => {
  emit('delete', props.task.id)
}
</script>

<template>
  <div class="task-item">
    <input 
      type="checkbox" 
      :checked="task.completed"
      @change="toggleComplete"
    >
    <span>{{ task.title }}</span>
    <button @click="handleDelete">Supprimer</button>
  </div>
</template>
```

---

# Refs et Reactive avec TypeScript

### 🔄 Ref typées

```typescript
import { ref, Ref } from 'vue'

// TypeScript infère automatiquement
const count = ref(0)  // Ref<number>
const name = ref('Vue')  // Ref<string>

// Type explicite
const user = ref<User | null>(null)

// Array typé
const tasks = ref<Task[]>([])

// Ref avec union type
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
```

---

### 🔄 Reactive typées

```typescript
import { reactive } from 'vue'

interface FormData {
  username: string
  email: string
  age: number
}

// Reactive avec interface
const form = reactive<FormData>({
  username: '',
  email: '',
  age: 0
})

// TypeScript vérifie les propriétés
form.username = 'Alice'  // ✅ OK
form.password = 'secret'  // ❌ Erreur : propriété inexistante
```

---

### 🎯 Ref vs Reactive - Quand utiliser quoi ? (2026)

**Utilisez `ref` pour :**
- Types primitifs (string, number, boolean)
- Arrays
- Valeurs nullables
- Valeurs uniques

**Utilisez `reactive` pour :**
- Objets complexes
- Formulaires
- États multiples groupés

**⚠️ Attention avec reactive :**
```typescript
// ❌ Perd la réactivité
let state = reactive({ count: 0 })
state = { count: 1 }  // Perd la réactivité!

// ✅ Bon
const state = reactive({ count: 0 })
state.count = 1  // Garde la réactivité
```

---

# Computed et Watchers typés

### 🧮 Computed avec TypeScript

```typescript
import { ref, computed, ComputedRef } from 'vue'

interface Task {
  id: number
  title: string
  completed: boolean
}

const tasks = ref<Task[]>([
  { id: 1, title: 'Apprendre Vue', completed: true },
  { id: 2, title: 'Apprendre TS', completed: false }
])
```

---

### Continuation Computed

```typescript
// TypeScript infère le type automatiquement
const completedTasks = computed(() => {
  return tasks.value.filter(task => task.completed)
})  // ComputedRef<Task[]>

// Type explicite si besoin
const completedCount: ComputedRef<number> = computed(() => {
  return tasks.value.filter(task => task.completed).length
})

// Computed avec getter et setter
const firstTaskTitle = computed({
  get: (): string => tasks.value[0]?.title ?? '',
  set: (value: string): void => {
    if (tasks.value[0]) {
      tasks.value[0].title = value
    }
  }
})
```

---

### 👁️ Watch avec TypeScript

```typescript
import { ref, watch, WatchStopHandle } from 'vue'

const count = ref(0)
const name = ref('Vue')

// Watch simple
watch(count, (newValue: number, oldValue: number) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// Watch multiple sources
watch(
  [count, name],
  ([newCount, newName], [oldCount, oldName]) => {
    console.log('Multiple values changed')
  }
)
```

---

### 👁️ Watch avancé

```typescript
interface User {
  id: number
  name: string
}

const user = ref<User | null>(null)

// Watch avec deep et immediate
watch(
  user,
  (newUser: User | null, oldUser: User | null) => {
    if (newUser) {
      console.log('User changed:', newUser.name)
    }
  },
  { deep: true, immediate: true }
)

// Stopper un watcher
const stop: WatchStopHandle = watch(count, () => {
  console.log('Counting...')
})

// Plus tard...
stop()
```

---

# Composables avec TypeScript

### 🔧 Créer un composable typé

```typescript
// composables/useCounter.ts
import { ref, computed, Ref, ComputedRef } from 'vue'

interface UseCounterReturn {
  count: Ref<number>
  double: ComputedRef<number>
  increment: () => void
  decrement: () => void
  reset: () => void
}

export function useCounter(initialValue: number = 0): UseCounterReturn {
  const count = ref(initialValue)
  
  const double = computed(() => count.value * 2)
  
  const increment = (): void => {
    count.value++
  }
```

---

### Continuation composable

```typescript
// composables/useCounter.ts suite
  
  const decrement = (): void => {
    count.value--
  }
  
  const reset = (): void => {
    count.value = initialValue
  }
  
  return {
    count,
    double,
    increment,
    decrement,
    reset
  }
}
```

---

### 🔧 Utilisation du composable

```vue
<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'

const { count, double, increment, decrement, reset } = useCounter(10)

// TypeScript connaît tous les types!
// count est Ref<number>
// double est ComputedRef<number>
// increment, decrement, reset sont des fonctions
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

---

# Composable Fetch typé (Exemple avancé)

### 🌐 useFetch générique

```typescript
// composables/useFetch.ts
import { ref, Ref } from 'vue'

interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
  execute: () => Promise<void>
}

export function useFetch<T>(url: string): UseFetchReturn<T> {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
```

---

### Continuation useFetch

```typescript
// composables/useFetch.ts suite

  const execute = async (): Promise<void> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      data.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error')
    } finally {
      loading.value = false
    }
  }
```

---

### Fin useFetch

```typescript
// composables/useFetch.ts fin
  
  return {
    data,
    error,
    loading,
    execute
  }
}
```

---

### 🌐 Utilisation de useFetch

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useFetch } from '@/composables/useFetch'

interface User {
  id: number
  name: string
  email: string
}

const { data: user, error, loading, execute } = useFetch<User>(
  'https://api.example.com/users/1'
)

onMounted(() => {
  execute()
})
</script>
```

---

### Template correspondant

```vue
<template>
  <div>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur: {{ error.message }}</div>
    <div v-else-if="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>
```

---

# Pinia avec TypeScript

### 🍍 Store Pinia typé (Composition API style)

```typescript
// stores/taskStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

export const useTaskStore = defineStore('task', () => {
  // State
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
```

---

### Continuation store Pinia

```typescript
  // Getters
  const completedTasks = computed(() => 
    tasks.value.filter(task => task.completed)
  )
  
  const incompleteTasks = computed(() =>
    tasks.value.filter(task => !task.completed)
  )
  
  const taskCount = computed(() => tasks.value.length)
  
  const completedCount = computed(() => completedTasks.value.length)
```

---

### Actions du store

```typescript
  // Actions
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>): void => {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
      createdAt: new Date()
    }
    tasks.value.push(newTask)
  }
  
  const removeTask = (id: number): void => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }
```

---

### Actions async du store

```typescript
  const toggleTask = (id: number): void => {
    const task = tasks.value.find(task => task.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }
  
  const fetchTasks = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/api/tasks')
      tasks.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }
```

---

### Retour du store

```typescript
  return {
    // State
    tasks,
    loading,
    error,
    // Getters
    completedTasks,
    incompleteTasks,
    taskCount,
    completedCount,
    // Actions
    addTask,
    removeTask,
    toggleTask,
    fetchTasks
  }
})
```

---

### 🍍 Utilisation du store dans un composant

```vue
<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { onMounted } from 'vue'

const taskStore = useTaskStore()

// TypeScript connaît tous les types!
// taskStore.tasks est Ref<Task[]>
// taskStore.completedTasks est ComputedRef<Task[]>
// taskStore.addTask accepte Omit<Task, 'id' | 'createdAt'>

onMounted(() => {
  taskStore.fetchTasks()
})

const handleAddTask = () => {
  taskStore.addTask({
    title: 'Nouvelle tâche',
    description: 'Description',
    completed: false
  })
}
</script>
```

---

### Template du composant

```vue
<template>
  <div>
    <div v-if="taskStore.loading">Chargement...</div>
    <div v-else-if="taskStore.error">{{ taskStore.error }}</div>
    <div v-else>
      <p>Tâches: {{ taskStore.taskCount }}</p>
      <p>Complétées: {{ taskStore.completedCount }}</p>
      
      <button @click="handleAddTask">Ajouter</button>
      
      <div v-for="task in taskStore.tasks" :key="task.id">
        <h3>{{ task.title }}</h3>
        <button @click="taskStore.toggleTask(task.id)">
          {{ task.completed ? 'Marquer incomplète' : 'Marquer complète' }}
        </button>
        <button @click="taskStore.removeTask(task.id)">Supprimer</button>
      </div>
    </div>
  </div>
</template>
```

---

# Vue Router avec TypeScript

### 🛤️ Configuration Router typée

```typescript
// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TaskView from '@/views/TaskView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TaskView
  },
  {
    path: '/tasks/:id',
    name: 'task-detail',
    component: () => import('@/views/TaskDetailView.vue'),
    props: true
  }
]
```

---

### Continuation configuration router

```typescript
// router/index.ts suite

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard typée
router.beforeEach((to, from, next) => {
  // to et from sont typés!
  console.log('Navigating to:', to.name)
  next()
})

export default router
```

---

### 🛤️ Route params typées

```typescript
// types/router.ts
export interface TaskRouteParams {
  id: string
}

export interface TaskQueryParams {
  filter?: 'all' | 'completed' | 'incomplete'
  sort?: 'date' | 'title'
}
```

---

### Utilisation des params typés

```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import type { TaskRouteParams, TaskQueryParams } from '@/types/router'

const route = useRoute()
const router = useRouter()

// Typage des params
const taskId = computed(() => {
  const params = route.params as TaskRouteParams
  return parseInt(params.id)
})

// Typage des query params
const filter = computed(() => {
  const query = route.query as TaskQueryParams
  return query.filter ?? 'all'
})
```

---

### Navigation programmatique typée

```vue
<script setup lang="ts">
// ... suite

const navigateToTask = (id: number) => {
  router.push({
    name: 'task-detail',
    params: { id: id.toString() }
  })
}

const navigateWithQuery = () => {
  router.push({
    name: 'tasks',
    query: {
      filter: 'completed',
      sort: 'date'
    }
  })
}
</script>
```

---

# Types utilitaires TypeScript (2026)

### 🛠️ Utility Types essentiels

```typescript
interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

// Partial - toutes les propriétés optionnelles
type PartialTask = Partial<Task>
// { id?: number; title?: string; ... }

// Required - toutes les propriétés requises
type RequiredTask = Required<PartialTask>

// Pick - sélectionner certaines propriétés
type TaskPreview = Pick<Task, 'id' | 'title'>
// { id: number; title: string }
```

---

### Continuation Utility Types

```typescript
// Omit - exclure certaines propriétés
type TaskInput = Omit<Task, 'id' | 'createdAt'>
// { title: string; description: string; completed: boolean }

// Record - créer un type objet
type TaskRecord = Record<number, Task>
// { [key: number]: Task }

// Readonly - toutes les propriétés en lecture seule
type ReadonlyTask = Readonly<Task>

// ReadonlyArray
const tasks: ReadonlyArray<Task> = []
// tasks.push(...) // ❌ Erreur!
```

---

### 🛠️ Utility Types avancés (2026)

```typescript
// Awaited - obtenir le type d'une Promise
type TaskPromise = Promise<Task>
type UnwrappedTask = Awaited<TaskPromise>  // Task

// ReturnType - obtenir le type de retour d'une fonction
function getTask(): Task {
  return { id: 1, title: 'Task', description: '', completed: false, createdAt: new Date() }
}
type TaskReturnType = ReturnType<typeof getTask>  // Task

// Parameters - obtenir les types des paramètres
function createTask(title: string, description: string): Task {
  return { id: 1, title, description, completed: false, createdAt: new Date() }
}
type CreateTaskParams = Parameters<typeof createTask>  // [string, string]
```

---

### 🛠️ Types conditionnels

```typescript
// Type conditionnel simple
type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number>  // false

// Extract - extraire les types assignables
type Status = 'pending' | 'success' | 'error' | 'idle'
type LoadingStatus = Extract<Status, 'pending' | 'idle'>  // 'pending' | 'idle'

// Exclude - exclure les types assignables
type ActionStatus = Exclude<Status, 'idle'>  // 'pending' | 'success' | 'error'

// NonNullable - retirer null et undefined
type MaybeString = string | null | undefined
type DefiniteString = NonNullable<MaybeString>  // string
```

---

# Génériques avec Vue.js

### 🎯 Composant générique (Nouveauté 2026)

```vue
<script setup lang="ts" generic="T">
interface Props {
  items: T[]
  keyExtractor: (item: T) => string | number
}

const props = defineProps<Props>()

defineEmits<{
  'item-click': [item: T]
}>()
</script>

<template>
  <div>
    <div 
      v-for="item in items" 
      :key="keyExtractor(item)"
      @click="$emit('item-click', item)"
    >
      <slot :item="item" />
    </div>
  </div>
</template>
```

---

### 🎯 Utilisation du composant générique

```vue
<script setup lang="ts">
import GenericList from '@/components/GenericList.vue'

interface Task {
  id: number
  title: string
}

interface User {
  id: number
  name: string
}

const tasks: Task[] = [
  { id: 1, title: 'Task 1' },
  { id: 2, title: 'Task 2' }
]

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]
</script>
```

---

### Template avec génériques

```vue
<template>
  <div>
    <!-- Liste de Tasks -->
    <GenericList 
      :items="tasks" 
      :key-extractor="(task) => task.id"
      @item-click="(task) => console.log(task.title)"
    >
      <template #default="{ item }">
        <p>{{ item.title }}</p>
      </template>
    </GenericList>
    
    <!-- Liste de Users -->
    <GenericList 
      :items="users" 
      :key-extractor="(user) => user.id"
      @item-click="(user) => console.log(user.name)"
    >
      <template #default="{ item }">
        <p>{{ item.name }}</p>
      </template>
    </GenericList>
  </div>
</template>
```

---

# Template Refs avec TypeScript

### 🎯 Référence d'élément HTML

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Ref vers un élément HTML
const inputRef = ref<HTMLInputElement | null>(null)
const divRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  // TypeScript connaît les méthodes disponibles!
  inputRef.value?.focus()
  
  if (divRef.value) {
    console.log('Largeur:', divRef.value.offsetWidth)
  }
})
</script>

<template>
  <input ref="inputRef" type="text" />
  <div ref="divRef">Contenu</div>
</template>
```

---

### 🎯 Référence de composant

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ChildComponent from './ChildComponent.vue'

// Ref vers un composant
const childRef = ref<InstanceType<typeof ChildComponent> | null>(null)

onMounted(() => {
  // Accès aux méthodes exposées par le composant enfant
  childRef.value?.someMethod()
})
</script>

<template>
  <ChildComponent ref="childRef" />
</template>
```

---

### 🎯 Composant enfant avec defineExpose

```vue
<!-- ChildComponent.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

const increment = (): void => {
  count.value++
}

const getCount = (): number => {
  return count.value
}

// Exposer des méthodes au parent
defineExpose({
  increment,
  getCount,
  count  // Exposer aussi le state si besoin
})
</script>

<template>
  <div>Count: {{ count }}</div>
</template>
```

---

# Déclarations de modules (Module Augmentation)

### 📦 Étendre les types Vue

```typescript
// types/vue.d.ts
import { ComponentCustomProperties } from 'vue'
import { Router } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomProperties {
    $myGlobalMethod: (msg: string) => void
    $router: Router
  }
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MyGlobalComponent: typeof import('@/components/MyComponent.vue')['default']
  }
}
```

---

### 📦 Typage des métadonnées de routes

```typescript
// types/router.d.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: string[]
    title?: string
    icon?: string
  }
}
```

---

### Utilisation des métadonnées typées

```typescript
// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
    meta: {
      requiresAuth: true,  // ✅ TypeScript connaît ce champ
      roles: ['admin'],
      title: 'Administration',
      icon: 'admin-icon'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
```

---

### Navigation guard avec meta typées

```typescript
router.beforeEach((to, from, next) => {
  // TypeScript connaît to.meta.requiresAuth!
  if (to.meta.requiresAuth) {
    const isAuthenticated = checkAuth()
    
    if (!isAuthenticated) {
      next({ name: 'login' })
      return
    }
    
    // TypeScript connaît to.meta.roles!
    if (to.meta.roles) {
      const userRoles = getUserRoles()
      const hasRole = to.meta.roles.some(role => userRoles.includes(role))
      
      if (!hasRole) {
        next({ name: 'forbidden' })
        return
      }
    }
  }
  
  next()
})
```

---

# Tests avec TypeScript

### 🧪 Configuration Vitest pour TypeScript

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
```

---

### 🧪 Test d'un composable typé

```typescript
// composables/__tests__/useCounter.spec.ts
import { describe, it, expect } from 'vitest'
import { useCounter } from '../useCounter'

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })
  
  it('should initialize with custom value', () => {
    const { count } = useCounter(10)
    expect(count.value).toBe(10)
  })
  
  it('should increment count', () => {
    const { count, increment } = useCounter(0)
    increment()
    expect(count.value).toBe(1)
  })
})
```

---

### 🧪 Test d'un composant typé

```typescript
// components/__tests__/TaskItem.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '../TaskItem.vue'
import type { Task } from '@/types'

describe('TaskItem', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test task',
    description: 'Description',
    completed: false,
    createdAt: new Date()
  }
  
  it('renders task title', () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask }
    })
    expect(wrapper.text()).toContain('Test task')
  })
})
```

---

### Continuation test composant

```typescript
  it('emits delete event when button clicked', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask }
    })
    
    await wrapper.find('button.delete').trigger('click')
    
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')?.[0]).toEqual([mockTask.id])
  })
  
  it('emits update event when toggled', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask }
    })
    
    await wrapper.find('input[type="checkbox"]').setValue(true)
    
    expect(wrapper.emitted('update:task')).toBeTruthy()
  })
})
```

---

# Patterns avancés TypeScript + Vue (2026)

### 🎨 Pattern Factory pour composants

```typescript
// factories/componentFactory.ts
import { Component, defineAsyncComponent } from 'vue'

export function createAsyncComponent<T extends Component>(
  loader: () => Promise<T>,
  options?: {
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
  }
) {
  return defineAsyncComponent({
    loader,
    loadingComponent: options?.loadingComponent,
    errorComponent: options?.errorComponent,
    delay: options?.delay ?? 200,
    timeout: options?.timeout ?? 3000
  })
}
```

---

### Utilisation du factory

```typescript
// router/index.ts
import { createAsyncComponent } from '@/factories/componentFactory'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorDisplay from '@/components/ErrorDisplay.vue'

const routes = [
  {
    path: '/dashboard',
    component: createAsyncComponent(
      () => import('@/views/DashboardView.vue'),
      {
        loadingComponent: LoadingSpinner,
        errorComponent: ErrorDisplay,
        delay: 200,
        timeout: 5000
      }
    )
  }
]
```

---

### 🎨 Pattern Repository

```typescript
// repositories/BaseRepository.ts
export abstract class BaseRepository<T> {
  constructor(protected baseUrl: string) {}
  
  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}`)
    return response.json()
  }
  
  async getById(id: number): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    return response.json()
  }
  
  async create(data: Omit<T, 'id'>): Promise<T> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
```

---

### Continuation BaseRepository

```typescript
  async update(id: number, data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
  
  async delete(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })
  }
}
```

---

### Repository spécifique

```typescript
// repositories/TaskRepository.ts
import { BaseRepository } from './BaseRepository'
import type { Task } from '@/types'

export class TaskRepository extends BaseRepository<Task> {
  constructor() {
    super('/api/tasks')
  }
  
  // Méthodes spécifiques aux tâches
  async getCompleted(): Promise<Task[]> {
    const response = await fetch(`${this.baseUrl}?completed=true`)
    return response.json()
  }
  
  async toggleComplete(id: number): Promise<Task> {
    const task = await this.getById(id)
    return this.update(id, { completed: !task.completed })
  }
}
```

---

### Utilisation du repository

```typescript
// composables/useTasks.ts
import { ref } from 'vue'
import { TaskRepository } from '@/repositories/TaskRepository'
import type { Task } from '@/types'

const taskRepo = new TaskRepository()

export function useTasks() {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const fetchTasks = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      tasks.value = await taskRepo.getAll()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }
```

---

### Continuation useTasks

```typescript
  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt'>): Promise<void> => {
    try {
      const newTask = await taskRepo.create(taskData)
      tasks.value.push(newTask)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    }
  }
  
  const toggleTask = async (id: number): Promise<void> => {
    try {
      const updatedTask = await taskRepo.toggleComplete(id)
      const index = tasks.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tasks.value[index] = updatedTask
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    }
  }
  
  return { tasks, loading, error, fetchTasks, addTask, toggleTask }
}
```

---

# Types avancés pour formulaires

### 📝 Type-safe form handling

```typescript
// types/forms.ts
export type FormField<T> = {
  value: T
  error: string | null
  touched: boolean
  dirty: boolean
}

export type FormState<T extends Record<string, any>> = {
  [K in keyof T]: FormField<T[K]>
}

export type ValidationRule<T> = {
  validate: (value: T) => boolean
  message: string
}

export type FormValidation<T extends Record<string, any>> = {
  [K in keyof T]?: ValidationRule<T[K]>[]
}
```

---

### 📝 Composable useForm

```typescript
// composables/useForm.ts
import { reactive, computed } from 'vue'
import type { FormState, FormValidation } from '@/types/forms'

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validations?: FormValidation<T>
) {
  const formState = reactive<FormState<T>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = {
        value: initialValues[key],
        error: null,
        touched: false,
        dirty: false
      }
      return acc
    }, {} as FormState<T>)
  )
```

---

### Continuation useForm

```typescript
  const validateField = (fieldName: keyof T): boolean => {
    const field = formState[fieldName]
    const rules = validations?.[fieldName]
    
    if (!rules) return true
    
    for (const rule of rules) {
      if (!rule.validate(field.value)) {
        field.error = rule.message
        return false
      }
    }
    
    field.error = null
    return true
  }
  
  const validateForm = (): boolean => {
    return Object.keys(formState).every(key => 
      validateField(key as keyof T)
    )
  }
```

---

### Fin useForm

```typescript
  const setFieldValue = <K extends keyof T>(
    fieldName: K, 
    value: T[K]
  ): void => {
    formState[fieldName].value = value
    formState[fieldName].dirty = true
    validateField(fieldName)
  }
  
  const setFieldTouched = (fieldName: keyof T): void => {
    formState[fieldName].touched = true
    validateField(fieldName)
  }
  
  const isValid = computed(() => 
    Object.values(formState).every(field => !field.error)
  )
  
  const getValues = (): T => {
    return Object.keys(formState).reduce((acc, key) => {
      acc[key as keyof T] = formState[key as keyof T].value
      return acc
    }, {} as T)
  }
```

---

### Return useForm

```typescript
  return {
    formState,
    setFieldValue,
    setFieldTouched,
    validateField,
    validateForm,
    isValid,
    getValues
  }
}
```

---

### 📝 Utilisation de useForm

```vue
<script setup lang="ts">
import { useForm } from '@/composables/useForm'

interface LoginForm {
  email: string
  password: string
}

const initialValues: LoginForm = {
  email: '',
  password: ''
}

const { formState, setFieldValue, setFieldTouched, validateForm, isValid, getValues } = useForm(
  initialValues,
  {
    email: [
      { validate: (v) => v.length > 0, message: 'Email requis' },
      { validate: (v) => v.includes('@'), message: 'Email invalide' }
    ],
    password: [
      { validate: (v) => v.length >= 8, message: 'Au moins 8 caractères' }
    ]
  }
)
```

---

### Template du formulaire

```vue
<script setup lang="ts">
// ... suite

const handleSubmit = () => {
  if (validateForm()) {
    const values = getValues()
    console.log('Form submitted:', values)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input
        type="email"
        :value="formState.email.value"
        @input="setFieldValue('email', ($event.target as HTMLInputElement).value)"
        @blur="setFieldTouched('email')"
      />
      <span v-if="formState.email.error">{{ formState.email.error }}</span>
    </div>
```

---

### Continuation template

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- ... suite -->
    
    <div>
      <input
        type="password"
        :value="formState.password.value"
        @input="setFieldValue('password', ($event.target as HTMLInputElement).value)"
        @blur="setFieldTouched('password')"
      />
      <span v-if="formState.password.error">{{ formState.password.error }}</span>
    </div>
    
    <button type="submit" :disabled="!isValid">Connexion</button>
  </form>
</template>
```

---

# Performances et optimisations TypeScript

### ⚡ Lazy loading typé

```typescript
// router/index.ts
import { RouteRecordRaw } from 'vue-router'

// Import avec type pour le lazy loading
const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  }
]
```

---

### ⚡ Composables avec cache

```typescript
// composables/useCache.ts
import { ref, Ref } from 'vue'

interface CacheEntry<T> {
  data: T
  timestamp: number
}

export function useCache<T>(ttl: number = 5000) {
  const cache = new Map<string, CacheEntry<T>>()
  
  const get = (key: string): T | null => {
    const entry = cache.get(key)
    
    if (!entry) return null
    
    const now = Date.now()
    if (now - entry.timestamp > ttl) {
      cache.delete(key)
      return null
    }
    
    return entry.data
  }
```

---

### Continuation useCache

```typescript
  const set = (key: string, data: T): void => {
    cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }
  
  const clear = (): void => {
    cache.clear()
  }
  
  const remove = (key: string): void => {
    cache.delete(key)
  }
  
  return {
    get,
    set,
    clear,
    remove
  }
}
```

---

### Utilisation du cache

```typescript
// composables/useTasksWithCache.ts
import { ref } from 'vue'
import { useCache } from './useCache'
import type { Task } from '@/types'

export function useTasksWithCache() {
  const { get, set } = useCache<Task[]>(60000) // 1 minute
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  
  const fetchTasks = async (): Promise<void> => {
    // Vérifier le cache d'abord
    const cached = get('tasks')
    if (cached) {
      tasks.value = cached
      return
    }
    
    loading.value = true
    try {
      const response = await fetch('/api/tasks')
      const data = await response.json()
      tasks.value = data
      set('tasks', data)  // Mettre en cache
    } finally {
      loading.value = false
    }
  }
  
  return { tasks, loading, fetchTasks }
}
```

---

# Debugging TypeScript dans Vue.js

### 🐛 Configuration pour debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Vue App",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

---

### 🐛 Type Guards pour debugging

```typescript
// utils/typeGuards.ts
export function isTask(obj: any): obj is Task {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.completed === 'boolean'
  )
}

export function isTaskArray(arr: any): arr is Task[] {
  return Array.isArray(arr) && arr.every(isTask)
}

// Utilisation
const data = await fetch('/api/tasks').then(r => r.json())

if (isTaskArray(data)) {
  // TypeScript sait que data est Task[]
  console.log('Tasks:', data)
} else {
  console.error('Invalid data format')
}
```

---

### 🐛 Assertions avec messages d'erreur

```typescript
// utils/assert.ts
export function assert(
  condition: boolean, 
  message: string
): asserts condition {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`)
  }
}

export function assertDefined<T>(
  value: T | null | undefined,
  message: string = 'Value must be defined'
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message)
  }
}

// Utilisation
function processTask(task: Task | null) {
  assertDefined(task, 'Task must not be null')
  // TypeScript sait maintenant que task est Task (pas null)
  console.log(task.title)
}
```

---

# Best Practices TypeScript + Vue.js (2026)

### ✅ Recommandations générales

1. **Toujours activer `strict: true`** dans `tsconfig.json`
2. **Préférer `type` à `interface`** sauf pour l'extensibilité
3. **Utiliser Composition API** plutôt qu'Options API
4. **Typer explicitement les fonctions publiques**
5. **Créer des types réutilisables** dans `/types`
6. **Utiliser les génériques** pour les composants réutilisables
7. **Éviter `any`** - préférer `unknown` si nécessaire
8. **Documenter avec JSDoc** les types complexes

---

### ✅ Organisation des types

```text
src/
├── types/
│   ├── index.ts           ← Export central
│   ├── models.ts          ← Types de données
│   ├── api.ts             ← Types API
│   ├── forms.ts           ← Types formulaires
│   ├── router.ts          ← Types router
│   └── utils.ts           ← Types utilitaires
```

---

### ✅ Exemple de fichier types/index.ts

```typescript
// types/index.ts
export * from './models'
export * from './api'
export * from './forms'
export * from './router'
export * from './utils'

// Types globaux
export type ID = string | number

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type AsyncData<T> = {
  data: T | null
  loading: boolean
  error: Error | null
}
```

---

### ✅ Naming conventions

```typescript
// ✅ Bon
interface User {}
type UserStatus = 'active' | 'inactive'
const user: User = { ... }

// ❌ Éviter
interface IUser {}  // 'I' prefix démodé
type TUserStatus = 'active' | 'inactive'  // 'T' prefix inutile

// ✅ Bon pour les génériques
function map<T, U>(items: T[], fn: (item: T) => U): U[]

// ✅ Bon pour les constantes
const API_URL = 'https://api.example.com'
const MAX_RETRIES = 3

// ✅ Bon pour les enums (mais préférer les types union)
enum UserRole {
  Admin = 'admin',
  User = 'user'
}

// ✅ Préférer
type UserRole = 'admin' | 'user'
```

---

# Erreurs courantes à éviter

### ❌ Erreur 1 : Utiliser `any`

```typescript
// ❌ Mauvais
const data: any = await fetchData()
data.anything.works  // Pas de sécurité de type!

// ✅ Bon
interface ApiResponse {
  data: Task[]
  total: number
}

const response: ApiResponse = await fetchData()
response.data.forEach(task => console.log(task.title))
```

---

### ❌ Erreur 2 : Oublier les types dans les événements

```vue
<script setup lang="ts">
// ❌ Mauvais
const emit = defineEmits(['update', 'delete'])

// ✅ Bon
const emit = defineEmits<{
  'update': [task: Task]
  'delete': [id: number]
}>()
</script>
```

---

### ❌ Erreur 3 : Muter des props

```vue
<script setup lang="ts">
interface Props {
  task: Task
}

const props = defineProps<Props>()

// ❌ Mauvais
const handleClick = () => {
  props.task.completed = true  // Ne marche pas!
}

// ✅ Bon
const emit = defineEmits<{
  'update:task': [task: Task]
}>()

const handleClick = () => {
  emit('update:task', { ...props.task, completed: true })
}
</script>
```

---

### ❌ Erreur 4 : Type assertion dangereux

```typescript
// ❌ Dangereux
const user = data as User  // Peut crasher au runtime!

// ✅ Bon - avec type guard
function isUser(obj: any): obj is User {
  return typeof obj?.name === 'string' && typeof obj?.email === 'string'
}

if (isUser(data)) {
  console.log(data.name)  // Sûr!
}
```

---

### ❌ Erreur 5 : Oublier de typer les refs

```typescript
// ❌ Mauvais
const user = ref(null)  // Ref<null>

// Plus tard...
user.value = { name: 'Alice' }  // ❌ Erreur!

// ✅ Bon
const user = ref<User | null>(null)

// Plus tard...
user.value = { name: 'Alice', email: 'alice@example.com' }  // ✅ OK
```

---

# Migration JavaScript → TypeScript

### 🔄 Stratégie de migration

1. **Renommer `.js` → `.ts`** et `.vue` script tags
2. **Activer `strict: false`** initialement
3. **Fixer les erreurs évidentes**
4. **Ajouter progressivement les types**
5. **Activer `strict: true`** à la fin

---

### 🔄 Exemple de migration

**Avant (JavaScript) :**

```vue
<script setup>
import { ref, computed } from 'vue'

const tasks = ref([])
const filter = ref('all')

const filteredTasks = computed(() => {
  if (filter.value === 'completed') {
    return tasks.value.filter(task => task.completed)
  }
  return tasks.value
})

const addTask = (title) => {
  tasks.value.push({
    id: Date.now(),
    title,
    completed: false
  })
}
</script>
```

---

**Après (TypeScript) :**

```vue
<script setup lang="ts">
import { ref, computed, Ref, ComputedRef } from 'vue'

interface Task {
  id: number
  title: string
  completed: boolean
}

type FilterType = 'all' | 'completed' | 'incomplete'

const tasks: Ref<Task[]> = ref([])
const filter: Ref<FilterType> = ref('all')

const filteredTasks: ComputedRef<Task[]> = computed(() => {
  if (filter.value === 'completed') {
    return tasks.value.filter(task => task.completed)
  }
  return tasks.value
})
```

---

```vue
<script setup lang="ts">
// ... suite

const addTask = (title: string): void => {
  tasks.value.push({
    id: Date.now(),
    title,
    completed: false
  })
}
</script>
```

---

# Nouveautés TypeScript 5.x (2026)

### 🆕 Decorators Stage 3

```typescript
// Nouveau système de décorateurs
function logged(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args)
    return original.apply(this, args)
  }
  
  return descriptor
}

class TaskService {
  @logged
  async fetchTasks(): Promise<Task[]> {
    const response = await fetch('/api/tasks')
    return response.json()
  }
}
```

---

### 🆕 `using` declarations (Explicit Resource Management)

```typescript
import { ref } from 'vue'

class DatabaseConnection {
  constructor(private url: string) {
    console.log('Connecting to', url)
  }
  
  [Symbol.dispose]() {
    console.log('Closing connection')
  }
  
  query(sql: string) {
    console.log('Executing:', sql)
  }
}

function fetchData() {
  using db = new DatabaseConnection('localhost:5432')
  db.query('SELECT * FROM tasks')
  // db.close() appelé automatiquement
}
```

---

### 🆕 `const` Type Parameters

```typescript
// Préserve les valeurs littérales
function makeConfig<const T extends Record<string, any>>(config: T): T {
  return config
}

// Avant
const config1 = makeConfig({ name: 'test', port: 3000 })
// Type: { name: string, port: number }

// Avec const
const config2 = makeConfig({ name: 'test', port: 3000 })
// Type: { name: 'test', port: 3000 }
```

---

# Ressources et outils (2026)

### 🛠️ Outils essentiels

- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Dernière version
- **[Vue 3.5+](https://vuejs.org/)** - Framework avec support TS natif
- **[Vite 6+](https://vitejs.dev/)** - Build tool optimisé
- **[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)** - Extension VS Code (remplace Vetur)
- **[TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)** - Support TS dans les SFC

---

### 📚 Documentation et guides

- **[Vue TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)** - Guide officiel
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)** - Documentation complète
- **[Vue 3 + TypeScript Cheatsheet](https://vue-typescript-cheatsheet.vercel.app/)** - Référence rapide
- **[Type Challenges](https://github.com/type-challenges/type-challenges)** - Exercices TypeScript

---

### 🎓 Bonnes pratiques 2026

1. **Toujours utiliser Composition API** avec TypeScript
2. **Activer tous les checks stricts** dès le début
3. **Créer des types réutilisables** pour votre domaine
4. **Documenter les types complexes** avec JSDoc
5. **Tester les types** avec des tests unitaires
6. **Utiliser les génériques** pour les composants réutilisables
7. **Préférer l'inférence** au typage explicite quand c'est clair
8. **Créer des type guards** pour les données externes

---

# Exercice pratique : TaskFlow avec TypeScript

### 🎯 Objectif

Reprendre notre application TaskFlow et la **migrer vers TypeScript** avec tous les concepts vus !

---

### 📋 Étapes de l'exercice

1. **Créer un nouveau projet Vue + TS**
   ```bash
   npm create vue@latest taskflow-ts
   ```

2. **Définir les types** dans `types/index.ts`

3. **Créer un store Pinia typé** pour les tâches

4. **Créer des composants typés** avec Composition API

5. **Ajouter le routing typé**

6. **Créer des composables typés**

7. **Ajouter des tests typés**

---

### 📝 Types à définir

```typescript
// types/index.ts
export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  createdAt: Date
  updatedAt: Date
}

export type TaskStatus = 'todo' | 'in-progress' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high'

export interface TaskList {
  id: number
  name: string
  tasks: Task[]
}
```

---

### 📝 Types avancés

```typescript
// types/index.ts suite

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

export type TaskUpdate = Partial<TaskInput>

export interface TaskFilters {
  status?: TaskStatus
  priority?: TaskPriority
  search?: string
}

export interface TaskStatistics {
  total: number
  todo: number
  inProgress: number
  done: number
}
```

---

### 🍍 Store Pinia typé

```typescript
// stores/taskStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task, TaskInput, TaskFilters, TaskStatistics } from '@/types'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const filters = ref<TaskFilters>({})
  
  const statistics = computed<TaskStatistics>(() => ({
    total: tasks.value.length,
    todo: tasks.value.filter(t => t.status === 'todo').length,
    inProgress: tasks.value.filter(t => t.status === 'in-progress').length,
    done: tasks.value.filter(t => t.status === 'done').length
  }))
```

---

### Suite du store

```typescript
  const filteredTasks = computed<Task[]>(() => {
    return tasks.value.filter(task => {
      if (filters.value.status && task.status !== filters.value.status) {
        return false
      }
      if (filters.value.priority && task.priority !== filters.value.priority) {
        return false
      }
      if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        return task.title.toLowerCase().includes(search) ||
               task.description.toLowerCase().includes(search)
      }
      return true
    })
  })
  
  const addTask = (taskInput: TaskInput): void => {
    const newTask: Task = {
      ...taskInput,
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    tasks.value.push(newTask)
  }
```

---

### Fin du store

```typescript
  const updateTask = (id: number, updates: TaskUpdate): void => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      Object.assign(task, updates, { updatedAt: new Date() })
    }
  }
  
  const deleteTask = (id: number): void => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }
  
  return {
    tasks,
    filters,
    statistics,
    filteredTasks,
    addTask,
    updateTask,
    deleteTask
  }
})
```

---

### ✅ Points à implémenter

- [ ] Définir tous les types nécessaires
- [ ] Créer le store Pinia avec TypeScript
- [ ] Créer les composants avec `<script setup lang="ts">`
- [ ] Typer les props et emits
- [ ] Créer des composables typés (useTasks, useFilters)
- [ ] Ajouter le routing avec types
- [ ] Créer des tests avec Vitest
- [ ] Documenter avec JSDoc les parties complexes

---

# Conclusion : TypeScript + Vue.js en 2026

### 🎉 Félicitations !

Vous maîtrisez maintenant **TypeScript avec Vue.js 3** !

### 🚀 Ce que vous avez appris

✅ Configuration TypeScript moderne  
✅ Typage des composants (Options & Composition API)  
✅ Props, Emits, Refs typés  
✅ Pinia et Router avec TypeScript  
✅ Composables génériques  
✅ Patterns avancés (Repository, Factory)  
✅ Tests avec types  
✅ Best practices 2026

---

### 💡 Points clés à retenir

1. **TypeScript n'est pas un obstacle**, c'est un **atout**
2. **Composition API** + TypeScript = combo parfait
3. **Les types aident à la maintenance** sur le long terme
4. **L'IDE devient votre meilleur ami** avec l'autocomplétion
5. **Commencez simple**, ajoutez de la complexité progressivement

---

### 🎯 La suite ?

- **Pratiquez** sur vos projets personnels
- **Explorez** les types avancés (Mapped Types, Conditional Types)
- **Contribuez** à des projets open-source Vue.js
- **Restez à jour** avec TypeScript 5.x et Vue.js 3.5+
- **Partagez** vos connaissances avec la communauté

---

### 📚 Ressources finales

- [Vue.js Documentation](https://vuejs.org)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)
- [Pinia Documentation](https://pinia.vuejs.org)
- [Vue Router Documentation](https://router.vuejs.org)

---

### 🙏 Merci !

Des questions sur **TypeScript avec Vue.js** ?

**Bon code ! 💚🔷**
